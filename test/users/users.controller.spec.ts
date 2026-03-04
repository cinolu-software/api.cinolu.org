import { UsersController } from '@/modules/users/users.controller';

jest.mock('@/core/helpers/upload.helper', () => ({
  createDiskUploadOptions: jest.fn().mockReturnValue({})
}));

jest.mock('@/core/helpers/csv-upload.helper', () => ({
  createCsvUploadOptions: jest.fn().mockReturnValue({})
}));

describe('UsersController', () => {
  const setup = () => {
    const usersService = {
      clear: jest.fn(),
      remove: jest.fn()
    } as any;
    const usersReferralService = {} as any;
    const usersExportService = {} as any;
    const userMediaService = {} as any;

    const controller = new UsersController(usersService, usersReferralService, usersExportService, userMediaService);
    return { controller, usersService };
  };

  it('clear delegates to usersService.clear', async () => {
    const { controller, usersService } = setup();
    usersService.clear.mockResolvedValue(4);

    await expect(controller.clear()).resolves.toBe(4);
    expect(usersService.clear).toHaveBeenCalledTimes(1);
  });

  it('remove delegates to usersService.remove', async () => {
    const { controller, usersService } = setup();
    usersService.remove.mockResolvedValue(undefined);

    await expect(controller.remove('u1')).resolves.toBeUndefined();
    expect(usersService.remove).toHaveBeenCalledWith('u1');
  });
});
