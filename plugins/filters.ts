import { format, parse } from 'date-fns';
import Vue from 'vue';

const formatString = 'dd/MM/yyyy HH:mm:ss';

Vue.filter('dateAndTime', (value: string | Date) => {
  if (typeof value === 'string') {
    const parsed = parse(`${value.substr(0, 10)} ${value.substr(11, 8)}`, 'yyyy-MM-dd HH:mm:ss', new Date());
    return format(parsed, formatString);
  }
  return format(value, formatString);
});
