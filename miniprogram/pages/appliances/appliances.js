const knowledge = require('../../data/knowledge');

Page({
  data: {
    groups: []
  },

  onLoad() {
    const groups = knowledge.applianceGroups.map(g => Object.assign({}, g, {
      items: g.items.map(i => Object.assign({}, i, { open: false }))
    }));
    this.setData({ groups });
  },

  toggleItem(e) {
    const gi = e.currentTarget.dataset.gi;
    const ii = e.currentTarget.dataset.ii;
    const groups = this.data.groups.map((g, i) => (i === gi
      ? Object.assign({}, g, {
        items: g.items.map((it, j) => Object.assign({}, it, { open: i === gi && j === ii ? !it.open : false }))
      })
      : g));
    this.setData({ groups });
  },

  goArticle() {
    wx.navigateTo({ url: '/pages/article/article?id=jiadian-1' });
  }
});
