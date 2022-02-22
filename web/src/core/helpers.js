export function format2ShortDate(date){
  return date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDay() + ' ' + date.getFullYear();
}

export function format2InputDate(date) {
  return date.toISOString().split('T')[0]
}