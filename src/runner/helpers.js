import days from '../days/index.js';

export const getFilteredDays = (yearDayFilter = null) => {
  return Object.keys(days)
    .filter(yearDay => !yearDayFilter || yearDay === yearDayFilter)
    .map(yearDay => days[yearDay](yearDay));
};
