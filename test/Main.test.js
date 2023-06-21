import { updateTimes, initializeTimes } from './Main';

test('initializeTimes returns correct initial times', () => {
  const initialTimes = initializeTimes();
  expect(initialTimes).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
});

test('updateTimes returns same times for any date', () => {
  const selectedDate = '2023-06-17';
  const updatedTimes = updateTimes(selectedDate);
  const expectedTimes = initializeTimes();
  expect(updatedTimes).toEqual(expectedTimes);
});
