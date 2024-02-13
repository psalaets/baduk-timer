// ripped from OGS
export const mainTimeOptions = [
  { id: '0', display: 'None' },
  { id: '30', display: '30 seconds' },
  { id: '35', display: '35 seconds' },
  { id: '40', display: '40 seconds' },
  { id: '45', display: '45 seconds' },
  { id: '50', display: '50 seconds' },
  { id: '55', display: '55 seconds' },
  { id: '60', display: '1 minute' },
  { id: '70', display: '1 minute 10 seconds' },
  { id: '80', display: '1 minute 20 seconds' },
  { id: '90', display: '1 minute 30 seconds' },
  { id: '105', display: '1 minute 45 seconds' },
  { id: '120', display: '2 minutes' },
  { id: '150', display: '2 minutes 30 seconds' },
  { id: '180', display: '3 minutes' },
  { id: '210', display: '3 minutes 30 seconds' },
  { id: '240', display: '4 minutes' },
  { id: '270', display: '4 minutes 30 seconds' },
  { id: '300', display: '5 minutes' },
  { id: '360', display: '6 minutes' },
  { id: '420', display: '7 minutes' },
  { id: '480', display: '8 minutes' },
  { id: '540', display: '9 minutes' },
  { id: '600', display: '10 minutes', default: true },
  { id: '720', display: '12 minutes' },
  { id: '900', display: '15 minutes' },
  { id: '1200', display: '20 minutes' },
  { id: '1500', display: '25 minutes' },
  { id: '1800', display: '30 minutes' },
  { id: '2100', display: '35 minutes' },
  { id: '2400', display: '40 minutes' },
  { id: '2700', display: '45 minutes' },
  { id: '3000', display: '50 minutes' },
  { id: '3300', display: '55 minutes' },
  { id: '3600', display: '1 hour' },
  { id: '4200', display: '1 hour 10 minutes' },
  { id: '4800', display: '1 hour 20 minutes' },
  { id: '5400', display: '1 hour 30 minutes' },
  { id: '6000', display: '1 hour 40 minutes' },
  { id: '6600', display: '1 hour 50 minutes' },
  { id: '7200', display: '2 hours' },
  { id: '8100', display: '2 hours 15 minutes' },
  { id: '9000', display: '2 hours 30 minutes' },
  { id: '9900', display: '2 hours 45 minutes' },
  { id: '10800', display: '3 hours' },
  { id: '12600', display: '3 hours 30 minutes' },
  { id: '14400', display: '4 hours' }
];

// ripped from OGS
export const timePerPeriodOptions = [
  { id: '10', display: '10 seconds' },
  { id: '12', display: '12 seconds' },
  { id: '15', display: '15 seconds' },
  { id: '20', display: '20 seconds' },
  { id: '25', display: '25 seconds' },
  { id: '30', display: '30 seconds', default: true },
  { id: '35', display: '35 seconds' },
  { id: '40', display: '40 seconds' },
  { id: '45', display: '45 seconds' },
  { id: '50', display: '50 seconds' },
  { id: '55', display: '55 seconds' },
  { id: '60', display: '1 minute' },
  { id: '70', display: '1 minute 10 seconds' },
  { id: '80', display: '1 minute 20 seconds' },
  { id: '90', display: '1 minute 30 seconds' },
  { id: '105', display: '1 minute 45 seconds' },
  { id: '120', display: '2 minutes' },
  { id: '150', display: '2 minutes 30 seconds' },
  { id: '180', display: '3 minutes' },
  { id: '210', display: '3 minutes 30 seconds' },
  { id: '240', display: '4 minutes' },
  { id: '270', display: '4 minutes 30 seconds' },
  { id: '300', display: '5 minutes' },
  { id: '360', display: '6 minutes' },
  { id: '420', display: '7 minutes' },
  { id: '480', display: '8 minutes' },
  { id: '540', display: '9 minutes' },
  { id: '600', display: '10 minutes' },
  { id: '720', display: '12 minutes' },
  { id: '900', display: '15 minutes' },
  { id: '1200', display: '20 minutes' },
  { id: '1500', display: '25 minutes' },
  { id: '1800', display: '30 minutes' },
  { id: '2100', display: '35 minutes' },
  { id: '2400', display: '40 minutes' },
  { id: '2700', display: '45 minutes' },
  { id: '3000', display: '50 minutes' },
  { id: '3300', display: '55 minutes' },
  { id: '3600', display: '1 hour' }
];

export function mainTimeLabel(seconds: number) {
  const option = mainTimeOptions.find((opt) => opt.id === String(seconds));
  return option ? option.display : null;
}

export function timePerPeriodLabel(seconds: number) {
  const option = timePerPeriodOptions.find((opt) => opt.id === String(seconds));
  return option ? option.display : null;
}

export function isValidMainTime(key: string) {
  return mainTimeOptions.some((opt) => opt.id === key);
}

export function isValidTimePerPeriod(key: string) {
  return timePerPeriodOptions.some((opt) => opt.id === key);
}
