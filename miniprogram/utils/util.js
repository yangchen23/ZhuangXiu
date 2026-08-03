const WEEK = ['日', '一', '二', '三', '四', '五', '六'];

function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

// 2026-08-03 -> 2026年8月3日 周一
function formatToday(date) {
  const d = date || new Date();
  return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 周' + WEEK[d.getDay()];
}

// Date -> 8.3
function formatShort(date) {
  return (date.getMonth() + 1) + '.' + date.getDate();
}

// 数字 -> 千分位
function formatMoney(n) {
  return Number(n || 0).toLocaleString('zh-CN');
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

module.exports = {
  WEEK,
  pad,
  formatToday,
  formatShort,
  formatMoney,
  uid
};
