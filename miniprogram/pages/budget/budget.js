const store = require('../../utils/store');
const util = require('../../utils/util');

Page({
  data: {
    spent: 0,
    total: 0,
    remain: 0,
    pct: 0,
    cats: [],
    flow: [],
    flowEmpty: true
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const b = store.getBudget();
    const pct = Math.min(100, Math.round(b.spent / b.total * 100));
    const cats = [
      {
        key: 'material', icon: '🔨', name: '材料', sub: '瓷砖/地板/涂料/卫浴/灯具',
        color: '#d97706', bar: 'linear-gradient(90deg,#f59e0b,#d97706)'
      },
      {
        key: 'labor', icon: '👷', name: '人工', sub: '拆除/水电/瓦工/木工/油漆',
        color: '#3b82f6', bar: 'linear-gradient(90deg,#3b82f6,#2563eb)'
      },
      {
        key: 'furniture', icon: '🪑', name: '家具', sub: '沙发/床/柜体/餐桌',
        color: '#8b5cf6', bar: 'linear-gradient(90deg,#a78bfa,#8b5cf6)'
      },
      {
        key: 'appliance', icon: '🛁', name: '家电', sub: '厨电/卫浴/空调/洗衣机',
        color: '#10b981', bar: 'linear-gradient(90deg,#34d399,#10b981)'
      }
    ].map(c => {
      const spent = b.byCategory[c.key] || 0;
      const limit = b.categoryBudget[c.key] || 0;
      const cpct = Math.min(100, Math.round(spent / limit * 100));
      return Object.assign({}, c, {
        spent,
        limit,
        pct: cpct,
        spentText: util.formatMoney(spent),
        limitText: util.formatMoney(limit),
        warn: cpct >= 90
      });
    });
    const flow = b.flow.map(f => Object.assign({}, f, { amountText: util.formatMoney(f.amount) }));
    this.setData({
      spent: util.formatMoney(b.spent),
      total: util.formatMoney(b.total),
      remain: util.formatMoney(b.total - b.spent),
      pct,
      cats,
      flow,
      flowEmpty: flow.length === 0
    });
  },

  goQuickNote() {
    wx.navigateTo({ url: '/pages/quick-note/quick-note' });
  },

  showAll() {
    wx.showToast({ title: '查看全部流水（开发中）', icon: 'none' });
  }
});
