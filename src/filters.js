import Vue from 'vue';

Vue.filter('tofixed', (value) => {
  if(value === undefined) return ""
  if(typeof value === 'string') value = parseFloat(value);
  let sign = Math.sign(value), abs = Math.abs(value);
  if(abs < 1000) return value.toFixed(2);
  else if(abs >= 1000 && abs < 1000000) return sign * (abs/1000).toFixed(1) + ' K';
  else if(abs >= 1000000) return sign * (abs/1000000).toFixed(1) + ' M';
})

Vue.filter('prettyNumber', (value) => {
  if(value === undefined) return ''
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})
Vue.filter('prettyDate', (val) => {
  let str = new Date(val).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  if(new Date().setHours(0,0,0,0) === new Date(val).setHours(0,0,0,0) ) str += ' Today';
  else str += " " + new Date(val).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })
  return str;
})