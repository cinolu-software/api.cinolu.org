import { ProjectsController } from '@/modules/projects/projects.controller';

jest.mock('@/core/helpers/upload.helper', () => ({
  createDiskUploadOptions: jest.fn().mockReturnValue({})
}));

jest.mock('@/core/helpers/csv-upload.helper', () => ({
  createCsvUploadOptions: jest.fn().mockReturnValue({})
}));

describe('ProjectsController', () => {
  const setup = () => {
    const projectsService = {} as any;
    const participationService = {} as any;
    const notificationService = {
      sendReportToStaff: jest.fn()
    } as any;
    const mediaService = {} as any;
    const controller = new ProjectsController(projectsService, participationService, notificationService, mediaService);
    return { controller, notificationService };
  };

  it('sendReportToStaff delegates and forces notify_staff=true', async () => {
    const { controller, notificationService } = setup();
    notificationService.sendReportToStaff.mockResolvedValue({ id: 'n1', status: 'sent' });

    await expect(
      controller.sendReportToStaff('p1', { id: 'u1' } as any, {
        title: 'Report',
        body: 'Body',
        notify_staff: false
      } as any)
    ).resolves.toEqual({ id: 'n1', status: 'sent' });

    expect(notificationService.sendReportToStaff).toHaveBeenCalledWith('p1', 'u1', {
      title: 'Report',
      body: 'Body',
      notify_staff: true
    });
  });
});
