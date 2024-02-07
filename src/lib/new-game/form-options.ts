// ripped from OGS
export const mainTimeOptions = [
  // [key, display]
  ['0', 'None'],
  ['30', '30 seconds'],
  ['35', '35 seconds'],
  ['40', '40 seconds'],
  ['45', '45 seconds'],
  ['50', '50 seconds'],
  ['55', '55 seconds'],
  ['60', '1 minute'],
  ['70', '1 minute 10 seconds'],
  ['80', '1 minute 20 seconds'],
  ['90', '1 minute 30 seconds'],
  ['105', '1 minute 45 seconds'],
  ['120', '2 minutes'],
  ['150', '2 minutes 30 seconds'],
  ['180', '3 minutes'],
  ['210', '3 minutes 30 seconds'],
  ['240', '4 minutes'],
  ['270', '4 minutes 30 seconds'],
  ['300', '5 minutes'],
  ['360', '6 minutes'],
  ['420', '7 minutes'],
  ['480', '8 minutes'],
  ['540', '9 minutes'],
  ['600', '10 minutes'],
  ['720', '12 minutes'],
  ['900', '15 minutes'],
  ['1200', '20 minutes'],
  ['1500', '25 minutes'],
  ['1800', '30 minutes'],
  ['2100', '35 minutes'],
  ['2400', '40 minutes'],
  ['2700', '45 minutes'],
  ['3000', '50 minutes'],
  ['3300', '55 minutes'],
  ['3600', '1 hour'],
  ['4200', '1 hour 10 minutes'],
  ['4800', '1 hour 20 minutes'],
  ['5400', '1 hour 30 minutes'],
  ['6000', '1 hour 40 minutes'],
  ['6600', '1 hour 50 minutes'],
  ['7200', '2 hours'],
  ['8100', '2 hours 15 minutes'],
  ['9000', '2 hours 30 minutes'],
  ['9900', '2 hours 45 minutes'],
  ['10800', '3 hours'],
  ['12600', '3 hours 30 minutes'],
  ['14400', '4 hours']
];

export function mainTimeLabel(seconds: number) {
  const option = mainTimeOptions.find(([key]) => key === String(seconds));
  return option ? option[1] : null;
}

// ripped from OGS
export const timePerPeriodOptions = [
  // [key, display]
  ['10', '10 seconds'],
  ['12', '12 seconds'],
  ['15', '15 seconds'],
  ['20', '20 seconds'],
  ['25', '25 seconds'],
  ['30', '30 seconds'],
  ['35', '35 seconds'],
  ['40', '40 seconds'],
  ['45', '45 seconds'],
  ['50', '50 seconds'],
  ['55', '55 seconds'],
  ['60', '1 minute'],
  ['70', '1 minute 10 seconds'],
  ['80', '1 minute 20 seconds'],
  ['90', '1 minute 30 seconds'],
  ['105', '1 minute 45 seconds'],
  ['120', '2 minutes'],
  ['150', '2 minutes 30 seconds'],
  ['180', '3 minutes'],
  ['210', '3 minutes 30 seconds'],
  ['240', '4 minutes'],
  ['270', '4 minutes 30 seconds'],
  ['300', '5 minutes'],
  ['360', '6 minutes'],
  ['420', '7 minutes'],
  ['480', '8 minutes'],
  ['540', '9 minutes'],
  ['600', '10 minutes'],
  ['720', '12 minutes'],
  ['900', '15 minutes'],
  ['1200', '20 minutes'],
  ['1500', '25 minutes'],
  ['1800', '30 minutes'],
  ['2100', '35 minutes'],
  ['2400', '40 minutes'],
  ['2700', '45 minutes'],
  ['3000', '50 minutes'],
  ['3300', '55 minutes'],
  ['3600', '1 hour']
];

export function timePerPeriodLabel(seconds: number) {
  const option = timePerPeriodOptions.find(([key]) => key === String(seconds));
  return option ? option[1] : null;
}

export function isValidMainTime(key: string) {
  return mainTimeOptions.some((opt) => opt[0] === key);
}

export function isValidTimePerPeriod(key: string) {
  return timePerPeriodOptions.some((opt) => opt[0] === key);
}