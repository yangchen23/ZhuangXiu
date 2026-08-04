const store = require('../../utils/store');

Page({
  data: {
    stages: []
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const stages = store.getAcceptance().map(s => {
      const done = s.items.filter(i => i.done).length;
      return Object.assign({}, s, {
        done,
        total: s.items.length,
        pct: Math.round(done / s.items.length * 100),
        open: done === 0
      });
    });
    this.setData({ stages });
  },

  toggleStage(e) {
    const idx = e.currentTarget.dataset.index;
    const stages = this.data.stages.map((s, i) => (i === idx ? Object.assign({}, s, { open: !s.open }) : s));
    this.setData({ stages });
  },

  toggleItem(e) {
    const stageIdx = e.currentTarget.dataset.stage;
    const itemIdx = e.currentTarget.dataset.item;
    store.toggleAcceptance(stageIdx, itemIdx);
    this.refresh();
  },

  resetAll() {
    wx.showModal({
      title: '重置验收清单',
      content: '所有勾选状态将清空，确定吗？',
      success: res => {
        if (res.confirm) {
          store.resetAcceptance();
          this.refresh();
          wx.showToast({ title: '已重置', icon: 'success' });
        }
      }
    });
  }
});
