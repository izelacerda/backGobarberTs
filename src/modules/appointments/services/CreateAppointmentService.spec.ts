import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakesNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5 - 1, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 5 - 1, 10, 13),
      user_id: 2,
      provider_id: 1,
    });
    await expect(appointment).toHaveProperty('id');
    await expect(appointment.provider_id).toBe(1);
  });
  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5 - 1, 10, 10).getTime();
    });
    const appointmentDate = new Date(2020, 5 - 1, 10, 11);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: 2,
      provider_id: 1,
    });
    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 2,
        provider_id: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5 - 1, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 5 - 1, 10, 11),
        user_id: 110,
        provider_id: 22,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5 - 1, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 5 - 1, 10, 13),
        user_id: 110,
        provider_id: 110,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5 - 1, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 5 - 1, 11, 7),
        user_id: 110,
        provider_id: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointment.execute({
        date: new Date(2020, 5 - 1, 10, 18),
        user_id: 110,
        provider_id: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
