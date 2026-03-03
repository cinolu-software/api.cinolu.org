import { BadRequestException } from '@nestjs/common';
import { existsSync, PathLike } from 'fs';
import { ProjectsEmailService } from '@/modules/projects/services/projects-email.service';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn()
}));

describe('ProjectsEmailService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const setup = () => {
    const mailerService = {
      sendMail: jest.fn()
    } as any;
    const service = new ProjectsEmailService(mailerService);
    return { service, mailerService };
  };

  it('sends emails to valid recipients with existing attachments only', async () => {
    const { service, mailerService } = setup();
    const existsSpy = jest.mocked(existsSync).mockImplementation((p: PathLike) => String(p).endsWith('a.pdf'));
    mailerService.sendMail.mockResolvedValue(undefined);

    const recipients = [
      { email: 'a@example.com', name: 'Alice' },
      { email: null, name: 'No Email' },
      { email: 'b@example.com', name: 'Bob' }
    ] as any;
    const notification = {
      title: 'Update',
      body: 'Body',
      sender: { name: 'Sender' },
      project: { name: 'Project X' },
      attachments: [{ filename: 'a.pdf' }, { filename: 'missing.pdf' }]
    } as any;

    await expect(service.notifyParticipants(recipients, notification)).resolves.toBeUndefined();
    expect(existsSpy).toHaveBeenCalled();
    expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
  });

  it('sends emails without attachments when files do not exist', async () => {
    const { service, mailerService } = setup();
    jest.mocked(existsSync).mockReturnValue(false);
    mailerService.sendMail.mockResolvedValue(undefined);
    await service.notifyParticipants(
      [{ email: 'a@example.com', name: 'Alice' }] as any,
      { title: 'T', body: 'B', sender: {}, project: { name: 'P' }, attachments: [{ filename: 'x.pdf' }] } as any
    );
    expect(mailerService.sendMail).toHaveBeenCalledWith(
      expect.not.objectContaining({ attachments: expect.anything() })
    );
  });

  it('wraps mailer failure in bad request', async () => {
    const { service, mailerService } = setup();
    jest.mocked(existsSync).mockReturnValue(true);
    mailerService.sendMail.mockRejectedValue(new Error('smtp'));
    await expect(
      service.notifyParticipants(
        [{ email: 'a@example.com', name: 'Alice' }] as any,
        { title: 'T', body: 'B', sender: {}, project: { name: 'P' }, attachments: [] } as any
      )
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('does not send emails when there are no valid recipients', async () => {
    const { service, mailerService } = setup();
    jest.mocked(existsSync).mockReturnValue(true);

    await expect(
      service.notifyParticipants(
        [{ email: null, name: 'No Email' }] as any,
        { title: 'T', body: 'B', sender: {}, project: { name: 'P' }, attachments: [] } as any
      )
    ).resolves.toBeUndefined();

    expect(mailerService.sendMail).not.toHaveBeenCalled();
  });
});
