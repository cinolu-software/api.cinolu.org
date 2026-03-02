import { BadRequestException } from '@nestjs/common';
import { parseUsersCsv } from '@/core/helpers/user-csv.helper';
import { ProjectParticipationService } from '@/modules/projects/services/project-participations.service';

jest.mock('@/core/helpers/user-csv.helper', () => ({
  parseUsersCsv: jest.fn()
}));

describe('ProjectParticipationService', () => {
  const setup = () => {
    const participationRepository = {
      find: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn()
    } as any;
    const upvoteRepository = {
      save: jest.fn(),
      findOneOrFail: jest.fn(),
      remove: jest.fn()
    } as any;
    const usersService = { findOrCreate: jest.fn() } as any;
    const phasesService = { findOne: jest.fn() } as any;
    const venturesService = { findOne: jest.fn() } as any;
    const projectsService = {
      findOne: jest.fn(),
      findOneWithParticipations: jest.fn()
    } as any;

    const service = new ProjectParticipationService(
      participationRepository,
      upvoteRepository,
      usersService,
      phasesService,
      venturesService,
      projectsService
    );
    return {
      service,
      participationRepository,
      upvoteRepository,
      usersService,
      phasesService,
      venturesService,
      projectsService
    };
  };

  it('finds user participations', async () => {
    const { service, participationRepository } = setup();
    participationRepository.find.mockResolvedValue([{ id: 'pp1' }]);
    await expect(service.findUserParticipations('u1')).resolves.toEqual([{ id: 'pp1' }]);
  });

  it('throws on findUserParticipations failure', async () => {
    const { service, participationRepository } = setup();
    participationRepository.find.mockRejectedValue(new Error('bad'));
    await expect(service.findUserParticipations('u1')).rejects.toBeInstanceOf(BadRequestException);
  });

  it('moves participants to a phase and skips already assigned', async () => {
    const { service, phasesService, participationRepository } = setup();
    phasesService.findOne.mockResolvedValue({ id: 'phase-1' });
    participationRepository.find.mockResolvedValue([
      { id: 'pp1', phases: [] },
      { id: 'pp2', phases: [{ id: 'phase-1' }] }
    ]);
    participationRepository.save.mockResolvedValue(undefined);

    await expect(service.moveParticipants({ ids: ['pp1', 'pp2'], phaseId: 'phase-1' } as any)).resolves.toBeUndefined();
    expect(participationRepository.save).toHaveBeenCalledTimes(1);
    expect(participationRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'pp1', phases: [{ id: 'phase-1' }] })
    );
  });

  it('removes participants from a phase', async () => {
    const { service, participationRepository } = setup();
    participationRepository.find.mockResolvedValue([{ id: 'pp1', phases: [{ id: 'phase-1' }, { id: 'phase-2' }] }]);
    participationRepository.save.mockResolvedValue(undefined);

    await expect(service.removeParticipantsFromPhase({ ids: ['pp1'], phaseId: 'phase-1' } as any)).resolves.toBeUndefined();
    expect(participationRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ phases: [{ id: 'phase-2' }] })
    );
  });

  it('finds participations by project', async () => {
    const { service, participationRepository } = setup();
    participationRepository.find.mockResolvedValue([{ id: 'pp1' }]);
    await expect(service.findParticipations('project-1')).resolves.toEqual([{ id: 'pp1' }]);
  });

  it('finds unique users by project', async () => {
    const { service, projectsService, participationRepository } = setup();
    projectsService.findOne.mockResolvedValue({ id: 'project-1' });
    participationRepository.find.mockResolvedValue([
      { user: { id: 'u1' } },
      { user: { id: 'u1' } },
      { user: { id: 'u2' } }
    ]);

    await expect(service.findByProject('project-1')).resolves.toEqual([{ id: 'u1' }, { id: 'u2' }]);
  });

  it('finds unique users by phase', async () => {
    const { service, participationRepository } = setup();
    participationRepository.find.mockResolvedValue([
      { user: { id: 'u1' } },
      { user: { id: 'u1' } },
      { user: { id: 'u3' } }
    ]);
    await expect(service.findByPhase('phase-1')).resolves.toEqual([{ id: 'u1' }, { id: 'u3' }]);
  });

  it('imports participants from csv and saves only new users', async () => {
    const { service, projectsService, usersService, participationRepository } = setup();
    projectsService.findOneWithParticipations.mockResolvedValue({
      id: 'project-1',
      started_at: new Date('2026-01-01'),
      participations: [{ user: { id: 'u-existing' } }]
    });
    (parseUsersCsv as jest.Mock).mockResolvedValue([{ email: 'a@x.com' }, { email: 'b@x.com' }]);
    usersService.findOrCreate
      .mockResolvedValueOnce({ id: 'u-existing' })
      .mockResolvedValueOnce({ id: 'u-new' });
    participationRepository.save.mockResolvedValue(undefined);

    await expect(service.importParticipants('project-1', { buffer: Buffer.from('csv') } as any)).resolves.toBeUndefined();
    expect(participationRepository.save).toHaveBeenCalledWith([
      expect.objectContaining({
        user: { id: 'u-new' },
        project: { id: 'project-1' }
      })
    ]);
  });

  it('does not save when imported users are all existing', async () => {
    const { service, projectsService, usersService, participationRepository } = setup();
    projectsService.findOneWithParticipations.mockResolvedValue({
      id: 'project-1',
      started_at: new Date('2026-01-01'),
      participations: [{ user: { id: 'u1' } }]
    });
    (parseUsersCsv as jest.Mock).mockResolvedValue([{ email: 'a@x.com' }]);
    usersService.findOrCreate.mockResolvedValue({ id: 'u1' });

    await expect(service.importParticipants('project-1', { buffer: Buffer.from('csv') } as any)).resolves.toBeUndefined();
    expect(participationRepository.save).not.toHaveBeenCalled();
  });

  it('participates in a project', async () => {
    const { service, projectsService, venturesService, participationRepository } = setup();
    projectsService.findOne.mockResolvedValue({ id: 'project-1' });
    venturesService.findOne.mockResolvedValue({ id: 'venture-1' });
    participationRepository.save.mockResolvedValue(undefined);

    await expect(service.participate('project-1', { id: 'u1' } as any, { ventureId: 'venture-1' } as any)).resolves.toBeUndefined();
    expect(participationRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        user: { id: 'u1' },
        project: { id: 'project-1' },
        venture: { id: 'venture-1' }
      })
    );
  });

  it('upvotes a participation', async () => {
    const { service, upvoteRepository } = setup();
    upvoteRepository.save.mockResolvedValue(undefined);
    await expect(service.upvote('pp1', 'u1')).resolves.toBeUndefined();
    expect(upvoteRepository.save).toHaveBeenCalledWith({ participation: { id: 'pp1' }, user: { id: 'u1' } });
  });

  it('unvotes a participation', async () => {
    const { service, upvoteRepository } = setup();
    upvoteRepository.findOneOrFail.mockResolvedValue({ id: 'vote-1' });
    upvoteRepository.remove.mockResolvedValue(undefined);
    await expect(service.unvote('pp1', 'u1')).resolves.toBeUndefined();
    expect(upvoteRepository.remove).toHaveBeenCalledWith({ id: 'vote-1' });
  });

  it('throws on internal failures', async () => {
    const { service, participationRepository, upvoteRepository } = setup();
    participationRepository.find.mockRejectedValue(new Error('bad'));
    await expect(service.findParticipations('project-1')).rejects.toThrow('bad');

    upvoteRepository.findOneOrFail.mockRejectedValue(new Error('bad'));
    await expect(service.unvote('pp1', 'u1')).rejects.toBeInstanceOf(BadRequestException);
  });
});
