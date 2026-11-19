import { dateType, compareDates, convertTimestampToDate } from 'src/utils/timeOperator';

export { buildComputeIsDateAvailable };

function buildComputeIsDateAvailable(extremumAvailableDates: { max: number | undefined; min: number | undefined }) {
  return (date: dateType) => {
    if (!extremumAvailableDates.min && !extremumAvailableDates.max) {
      return false;
    }
    let filter = true;
    if (!!extremumAvailableDates.min) {
      const minDate = convertTimestampToDate(extremumAvailableDates.min);
      if (compareDates(minDate, date) > 0) {
        filter = false;
      }
    }
    if (!!extremumAvailableDates.max) {
      const maxDate = convertTimestampToDate(extremumAvailableDates.max);
      if (compareDates(date, maxDate) > 0) {
        filter = false;
      }
    }
    return filter;
  };
}
