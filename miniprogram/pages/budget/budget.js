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
    filteredFlow: [],
    flowTags: ['全部', '材料', '人工', '家具', '家电'],
    activeFlowTag: '全部',
    flowEmpty: true
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const b = store.getBudget();
    const pct = b.total > 0 ? Math.min(100, Math.round(b.spent / b.total * 100)) : 0;
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
      const cpct = limit > 0 ? Math.min(100, Math.round(spent / limit * 100)) : 0;
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
    const tag = this.data.activeFlowTag;
    const filteredFlow = tag === '全部' ? flow : flow.filter(f => f.typeLabel === tag);
    this.setData({
      spent: util.formatMoney(b.spent),
      total: util.formatMoney(b.total),
      remain: util.formatMoney(b.total - b.spent),
      pct,
      cats,
      flow,
      filteredFlow,
      flowEmpty: filteredFlow.length === 0
    });
  },

  filterFlow(e) {
    this.setData({ activeFlowTag: e.currentTarget.dataset.tag });
    this.refresh();
  },

  goQuickNote() {
    wx.navigateTo({ url: '/pages/quick-note/quick-note' });
  },

  showAll() {
    this.setData({ activeFlowTag: '全部' });
    this.refresh();
  }
});
