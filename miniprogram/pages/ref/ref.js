const store = require('../../utils/store');
const seed = require('../../data/seed');
const ai = require('../../utils/ai');

Page({
  data: {
    refTab: 'insp',
    bookmarks: [],
    styles: seed.styles,
    categories: seed.categories,
    faqs: seed.faqs.map(f => Object.assign({}, f, { open: false })),
    keyword: '',
    importOpen: false,
    importTab: 'link',
    importText: '',
    analyzing: false
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
    this.setData({ bookmarks: store.getBookmarks() });
    // 首页点「知识库」时自动切到知识子Tab
    const app = getApp();
    if (app.globalData.refTab === 'know') {
      app.globalData.refTab = 'insp';
      this.setData({ refTab: 'know' });
    }
  },

  switchTab(e) {
    this.setData({ refTab: e.currentTarget.dataset.tab });
  },

  goStyleTest() {
    wx.navigateTo({ url: '/pages/style-test/style-test' });
  },

  // ===== 收藏外部内容 =====
  openImport() {
    this.setData({ importOpen: true, importText: '' });
  },

  closeImport() {
    this.setData({ importOpen: false });
  },

  noop() {},

  switchImportTab(e) {
    this.setData({ importTab: e.currentTarget.dataset.tab });
  },

  onImportInput(e) {
    this.setData({ importText: e.detail.value });
  },

  aiAnalyze() {
    const text = (this.data.importText || '').trim();
    if (!text) {
      wx.showToast({ title: '请先粘贴链接/文本', icon: 'none' });
      return;
    }
    this.setData({ analyzing: true });
    ai.summarize(text)
      .then(obj => {
        const title = (obj && obj.title) || (text.length > 16 ? text.slice(0, 16) + '…' : text);
        const points = (obj && Number(obj.points)) || 3;
        const bms = store.addBookmark({
          title,
          source: 'AI 已提炼 ' + points + ' 个要点 · 刚刚收藏' + (obj && obj.tip ? ' · 💡' + obj.tip : '')
        });
        this.setData({ importOpen: false, importText: '', bookmarks: bms });
        wx.showToast({ title: 'AI 分析完成，已收藏', icon: 'success' });
      })
      .catch(() => {
        const title = text.length > 16 ? text.slice(0, 16) + '…' : text;
        const bms = store.addBookmark({
          title,
          source: 'AI 已提炼 3 个要点 · 刚刚收藏'
        });
        this.setData({ importOpen: false, importText: '', bookmarks: bms });
        wx.showToast({ title: 'AI 服务不可用，已本地收藏', icon: 'none' });
      })
      .then(() => {
        this.setData({ analyzing: false });
      });
  },

  showBookmark() {
    wx.showToast({ title: '展开收藏详情（开发中）', icon: 'none' });
  },

  showStyle(e) {
    wx.showToast({ title: e.currentTarget.dataset.name + ' 风格图库（开发中）', icon: 'none' });
  },

  showTool(e) {
    wx.showToast({ title: e.currentTarget.dataset.tip, icon: 'none' });
  },

  // ===== 知识库 =====
  onSearch(e) {
    const keyword = e.detail.value;
    const faqs = seed.faqs
      .filter(f => !keyword || f.q.indexOf(keyword) !== -1)
      .map(f => Object.assign({}, f, { open: false }));
    this.setData({ keyword, faqs });
  },

  toggleFaq(e) {
    const idx = e.currentTarget.dataset.index;
    const faqs = this.data.faqs.map((f, i) => Object.assign({}, f, { open: i === idx ? !f.open : false }));
    this.setData({ faqs });
  },

  showCat(e) {
    wx.showToast({ title: e.currentTarget.dataset.name + ' 选购指南（开发中）', icon: 'none' });
  }
});
