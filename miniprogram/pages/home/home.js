const store = require('../../utils/store');
const seed = require('../../data/seed');
const util = require('../../utils/util');

Page({
  data: {
    weatherIndex: 1,
    weather: {},
    rainDrops: [
      { left: '10%', delay: '0s' },
      { left: '25%', delay: '0.3s' },
      { left: '40%', delay: '0.6s' },
      { left: '55%', delay: '0.1s' },
      { left: '70%', delay: '0.4s' },
      { left: '85%', delay: '0.7s' }
    ],
    todayStr: '',
    prep: [],
    prepDone: 0,
    prepTotal: 0,
    prepPct: 0,
    spent: 0,
    knowledgeCount: 5
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
    this.refresh();
  },

  refresh() {
    const weatherIndex = store.getWeatherIndex();
    const prep = store.getPrep();
    const prog = store.prepProgress(prep);
    const budget = store.getBudget();
    this.setData({
      weatherIndex,
      weather: seed.weatherConfigs[weatherIndex],
      todayStr: util.formatToday(),
      prep,
      prepDone: prog.done,
      prepTotal: prog.total,
      prepPct: prog.pct,
      spent: budget.spent,
      spentText: util.formatMoney(budget.spent)
    });
  },

  cycleWeather() {
    const idx = store.cycleWeather();
    this.setData({ weatherIndex: idx, weather: seed.weatherConfigs[idx] });
  },

  togglePrep(e) {
    const name = e.currentTarget.dataset.name;
    const prep = store.togglePrep(name);
    const prog = store.prepProgress(prep);
    this.setData({ prep, prepDone: prog.done, prepTotal: prog.total, prepPct: prog.pct });
  },

  goRef() {
    wx.switchTab({ url: '/pages/ref/ref' });
  },

  goKnowledge() {
    getApp().globalData.refTab = 'know';
    wx.switchTab({ url: '/pages/ref/ref' });
  },

  goBudget() {
    wx.navigateTo({ url: '/pages/budget/budget' });
  },

  showTip(e) {
    wx.showToast({ title: e.currentTarget.dataset.tip || '功能开发中', icon: 'none' });
  }
});
