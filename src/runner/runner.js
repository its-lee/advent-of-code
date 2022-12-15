import days from '../days/index.js';

export const getFilteredDays = (yearDayFilter = null) => {
  return Object.keys(days)
    .filter(yearDay => !yearDayFilter || yearDay === yearDayFilter)
    .map(yearDay => {
      const [year, day] = yearDay.split('/');

      return {
        year,
        day,
        id: yearDay,
        runner: days[yearDay](yearDay)
      };
    });
};
