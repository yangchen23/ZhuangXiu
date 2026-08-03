Component({
  data: {
    selected: 0,
    fabOpen: false,
    list: [
      { pagePath: '/pages/home/home', icon: '🏠', text: '首页' },
      { pagePath: '/pages/ref/ref', icon: '📖', text: '参考' },
      { pagePath: '/pages/diary/diary', icon: '📓', text: '日记' },
      { pagePath: '/pages/mine/mine', icon: '👤', text: '我的' }
    ]
  },
  methods: {
    switchTab(e) {
      const path = e.currentTarget.dataset.path;
      this.setData({ fabOpen: false });
      wx.switchTab({ url: path });
    },
    toggleFab() {
      this.setData({ fabOpen: !this.data.fabOpen });
    },
    goAction(e) {
      const url = e.currentTarget.dataset.url;
      this.setData({ fabOpen: false });
      wx.navigateTo({ url });
    }
  }
});
