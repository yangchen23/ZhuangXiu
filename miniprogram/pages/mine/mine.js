const store = require('../../utils/store');
const knowledge = require('../../data/knowledge');

Page({
  data: {
    knowledgeCount: 5,
    group1: [
      { icon: '📚', text: '我的知识库', extra: '5条', action: 'knowledge' },
      { icon: '💰', text: '预算与流水', extra: '', action: 'budget' },
      { icon: '🏗️', text: '空间管理', extra: '', action: 'spaces' },
      { icon: '👨‍👩‍👧', text: '家庭成员', extra: '你 · 老婆', action: 'family' }
    ],
    group2: [
      { icon: '✅', text: '验收清单', extra: '', action: 'acceptance' },
      { icon: '🔌', text: '家电选购指南', extra: '', action: 'appliances' },
      { icon: '⚙️', text: '设置', extra: '', action: 'settings' }
    ]
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
    const records = store.getRecords();
    this.setData({ knowledgeCount: knowledge.articles.length, recordCount: records.length });
  },

  onMenu(e) {
    const action = e.currentTarget.dataset.action;
    const map = {
      knowledge: '/pages/article-list/article-list?category=all',
      budget: '/pages/budget/budget',
      spaces: '/pages/spaces/spaces',
      family: '/pages/family/family',
      acceptance: '/pages/acceptance/acceptance',
      appliances: '/pages/appliances/appliances',
      settings: '/pages/settings/settings'
    };
    const url = map[action];
    if (url) wx.navigateTo({ url });
  }
});
