export function format2ShortDate(date){
  console.log(date);
  return date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDay() + ' ' + date.getFullYear();
}