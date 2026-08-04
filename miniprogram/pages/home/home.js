const store = require('../../utils/store');
const seed = require('../../data/seed');
const util = require('../../utils/util');
const config = require('../../config');
const weatherApi = require('../../utils/weather');

Page({
  data: {
    weather: Object.assign({}, seed.weatherConfigs[1], { label: '定位中…' }),
    weatherLoading: false,
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
    knowledgeCount: 5,
    nextStep: '找施工方',
    daysToStart: 31
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
    this.refresh();
  },

  refresh() {
    const prep = store.getPrep();
    const prog = store.prepProgress(prep);
    const budget = store.getBudget();
    const next = prep.find(p => !p.done);
    this.setData({
      todayStr: util.formatToday(),
      prep,
      prepDone: prog.done,
      prepTotal: prog.total,
      prepPct: prog.pct,
      spent: budget.spent,
      spentText: util.formatMoney(budget.spent),
      nextStep: next ? next.name : '全部完成 🎉',
      daysToStart: util.daysUntil(new Date(2026, 8, 1))
    });
    this.refreshWeather();
  },

  // ===== 真实天气 =====
  refreshWeather() {
    if (this.data.weatherLoading) return;
    const cached = store.getRealWeather();
    if (cached) {
      this.applyWeather(cached);
      return;
    }
    this.setData({ weatherLoading: true });
    this.locateAndFetch()
      .then(w => {
        store.setRealWeather(w);
        this.applyWeather(w);
      })
      .catch(() => {
        // 离线兜底：使用内置演示天气
        const mock = seed.weatherConfigs[1];
        this.applyWeather(Object.assign({}, mock, {
          label: (config.WEATHER && config.WEATHER.DEFAULT_LOCATION.label) || '当前定位'
        }));
        wx.showToast({ title: '天气获取失败，使用离线数据', icon: 'none' });
      })
      .then(() => {
        this.setData({ weatherLoading: false });
      });
  },

  locateAndFetch() {
    return new Promise(resolve => {
      wx.getLocation({
        type: 'gcj02',
        success: loc => {
          const p = weatherApi.fetch(loc.latitude, loc.longitude)
            .then(w => {
              w.label = '当前定位';
              return weatherApi.geocode(loc.latitude, loc.longitude)
                .then(addr => {
                  if (addr) w.label = addr;
                  return w;
                })
                .catch(() => w);
            });
          resolve(p);
        },
        fail: () => {
          const d = (config.WEATHER && config.WEATHER.DEFAULT_LOCATION) || { latitude: 22.5415, longitude: 114.0596, label: '深圳' };
          resolve(
            weatherApi.fetch(d.latitude, d.longitude).then(w => {
              w.label = d.label;
              return w;
            })
          );
        }
      });
    });
  },

  applyWeather(w) {
    this.setData({ weather: w });
  },

  togglePrep(e) {
    const name = e.currentTarget.dataset.name;
    const prep = store.togglePrep(name);
    const prog = store.prepProgress(prep);
    const next = prep.find(p => !p.done);
    this.setData({
      prep,
      prepDone: prog.done,
      prepTotal: prog.total,
      prepPct: prog.pct,
      nextStep: next ? next.name : '全部完成 🎉'
    });
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

  goContractors() {
    wx.navigateTo({ url: '/pages/contractors/contractors' });
  },

  goGuide() {
    wx.navigateTo({ url: '/pages/article/article?id=gonglue-1' });
  },

});
