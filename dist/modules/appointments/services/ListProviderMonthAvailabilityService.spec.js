"use strict";

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("./ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProviderMonthAvailability;
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentRepository.default();
    listProviderMonthAvailability = new _ListProviderMonthAvailabilityService.default(fakeAppointmentsRepository);
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 20, 8, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 20, 9, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 20, 10, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 20, 11, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 20, 12, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 20, 13, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 20, 15, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 20, 16, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 20, 17, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 100,
      user_id: 2,
      date: new Date(2020, 4, 21, 8, 0, 0)
    });
    const availability = await listProviderMonthAvailability.execute({
      provider_id: 100,
      year: 2020,
      month: 5
    });
    expect(availability).toEqual(expect.arrayContaining([{
      day: 19,
      available: true
    }, {
      day: 20,
      available: false
    }, {
      day: 21,
      available: true
    }, {
      day: 22,
      available: true
    }]));
  });
});