const store = require('../../utils/store');
const util = require('../../utils/util');

const CITIES = [
  { name: '深圳', coeff: 1.0 },
  { name: '广州', coeff: 0.95 },
  { name: '北京', coeff: 1.05 },
  { name: '上海', coeff: 1.1 },
  { name: '杭州', coeff: 0.9 },
  { name: '成都', coeff: 0.75 },
  { name: '武汉', coeff: 0.8 },
  { name: '长沙', coeff: 0.72 }
];

const STYLES = ['北欧', '日式', '侘寂', '极简', '新中式', '轻奢', '法式', '美式'];
const LEVELS = [
  { key: 'economy', label: '经济（满足基本使用）', price: 1000 },
  { key: 'comfort', label: '舒适（性价比之选）', price: 1800 },
  { key: 'quality', label: '品质（主材升级）', price: 3000 },
  { key: 'luxury', label: '豪华（全屋定制/进口）', price: 5500 }
];

Page({
  data: {
    cities: CITIES,
    styles: STYLES,
    levels: LEVELS,
    cityIndex: 0,
    styleIndex: 0,
    levelIndex: 1,
    area: '90',
    result: null
  },

  onArea(e) {
    this.setData({ area: e.detail.value });
  },

  onCity(e) {
    this.setData({ cityIndex: Number(e.detail.value) });
  },

  onStyle(e) {
    this.setData({ styleIndex: Number(e.detail.value) });
  },

  onLevel(e) {
    this.setData({ levelIndex: Number(e.detail.value) });
  },

  calculate() {
    const area = Number(this.data.area);
    if (!area || area <= 0) {
      wx.showToast({ title: '请填写建筑面积', icon: 'none' });
      return;
    }
    const city = CITIES[this.data.cityIndex];
    const level = LEVELS[this.data.levelIndex];
    const mid = Math.round(area * level.price * city.coeff);
    const low = Math.round(mid * 0.85);
    const high = Math.round(mid * 1.15);
    const styleFactor = this.data.styleIndex === 5 ? 1.15 : (this.data.styleIndex === 2 || this.data.styleIndex === 6 ? 1.1 : 1);
    const items = [
      { name: '材料', pct: 40, amount: Math.round(mid * styleFactor * 0.4) },
      { name: '人工', pct: 30, amount: Math.round(mid * styleFactor * 0.3) },
      { name: '家具', pct: 20, amount: Math.round(mid * styleFactor * 0.2) },
      { name: '家电', pct: 10, amount: Math.round(mid * styleFactor * 0.1) }
    ];
    const total = items.reduce((s, i) => s + i.amount, 0);
    this.setData({
      result: {
        low: Math.round(low * styleFactor),
        high: Math.round(high * styleFactor),
        total,
        lowText: util.formatMoney(Math.round(low * styleFactor)),
        highText: util.formatMoney(Math.round(high * styleFactor)),
        totalText: util.formatMoney(total),
        items: items.map(i => Object.assign({}, i, { text: util.formatMoney(i.amount) })),
        perSqm: Math.round(total / area)
      }
    });
  },

  saveAsBudget() {
    if (!this.data.result) return;
    store.setBudgetTotal(this.data.result.total);
    wx.showToast({ title: '已设为我的总预算 ¥' + util.formatMoney(this.data.result.total), icon: 'none' });
  }
});
