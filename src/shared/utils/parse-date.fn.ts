export const parseDate = (value: string) => {
  const [day, month, year] = value.split('/');
  const isoString = `${year}-${month}-${day}`;
  const date = new Date(isoString);
  return isNaN(date.getTime()) ? null : date;
};
