"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakesNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakesNotificationsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentRepository;
let createAppointment;
let fakeNotificationsRepository;
let fakeCacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentRepository.default();
    fakeNotificationsRepository = new _FakesNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5 - 1, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 5 - 1, 10, 13),
      user_id: 2,
      provider_id: 1
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
      provider_id: 1
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 2,
      provider_id: 1
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5 - 1, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 5 - 1, 10, 11),
      user_id: 110,
      provider_id: 22
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5 - 1, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 5 - 1, 10, 13),
      user_id: 110,
      provider_id: 110
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5 - 1, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 5 - 1, 11, 7),
      user_id: 110,
      provider_id: 2
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 5 - 1, 10, 18),
      user_id: 110,
      provider_id: 2
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});