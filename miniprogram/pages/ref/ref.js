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
    importImage: '',
    importStep: 'input', // input | result
    importResult: null,
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
    this.setData({
      importOpen: true,
      importText: '',
      importImage: '',
      importStep: 'input',
      importResult: null,
      importTab: 'link'
    });
    // 自动读取剪贴板：只读取像链接的内容，避免误填
    wx.getClipboardData({
      success: res => {
        const t = (res.data || '').trim();
        if (t && /^(https?:\/\/|www\.)/i.test(t)) {
          this.setData({ importText: t });
          wx.showToast({ title: '已自动读取剪贴板链接', icon: 'none' });
        }
      },
      fail: () => {}
    });
  },

  closeImport() {
    this.setData({
      importOpen: false,
      importStep: 'input',
      importResult: null,
      importText: '',
      importImage: ''
    });
  },

  noop() {},

  switchImportTab(e) {
    this.setData({
      importTab: e.currentTarget.dataset.tab,
      importStep: 'input',
      importResult: null
    });
  },

  onImportInput(e) {
    this.setData({ importText: e.detail.value });
  },

  readClipboard() {
    wx.getClipboardData({
      success: res => {
        const t = (res.data || '').trim();
        if (!t) {
          wx.showToast({ title: '剪贴板是空的', icon: 'none' });
          return;
        }
        this.setData({ importText: t, importStep: 'input' });
        wx.showToast({ title: '已读取剪贴板', icon: 'success' });
      },
      fail: () => {
        wx.showToast({ title: '读取失败，请长按输入框粘贴', icon: 'none' });
      }
    });
  },

  clearImport() {
    this.setData({ importText: '' });
  },

  chooseImportImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setData({ importImage: res.tempFiles[0].tempFilePath });
      },
      fail: () => {}
    });
  },

  fillSample() {
    this.setData({
      importTab: 'text',
      importText: '日式厨房必装这5个神器：推拉式调味篮、转角拉篮、下拉式吊柜、抽屉分隔、壁挂调料架',
      importStep: 'input'
    });
  },

  aiAnalyze() {
    if (this.data.analyzing) return;

    // 截图：当前先按图片收藏（内容识别待接视觉模型）
    if (this.data.importTab === 'photo') {
      if (!this.data.importImage) {
        wx.showToast({ title: '请先选一张截图/照片', icon: 'none' });
        return;
      }
      const bms = store.addBookmark({
        thumb: '📸',
        title: '现场截图收藏',
        source: '图片收藏 · 内容识别待接视觉模型'
      });
      this.setData({
        bookmarks: bms,
        importResult: {
          title: '现场截图收藏',
          source: '图片收藏 · 内容识别待接视觉模型',
          tip: '后续接入视觉模型后，可识别图片里的风格、材料与避坑点'
        },
        importStep: 'result'
      });
      return;
    }

    const text = (this.data.importText || '').trim();
    if (!text) {
      wx.showToast({ title: '请先粘贴内容或点「读取剪贴板」', icon: 'none' });
      return;
    }
    this.setData({ analyzing: true });
    ai.summarize(text)
      .then(obj => {
        const title = (obj && obj.title) || (text.length > 16 ? text.slice(0, 16) + '…' : text);
        const points = (obj && Number(obj.points)) || 3;
        const bms = store.addBookmark({
          title,
          source: 'AI 已提炼 ' + points + ' 个要点 · 刚刚收藏'
        });
        this.setData({
          bookmarks: bms,
          importResult: {
            title,
            source: 'AI 已提炼 ' + points + ' 个要点 · 刚刚收藏',
            tip: (obj && obj.tip) || ''
          },
          importStep: 'result'
        });
      })
      .catch(() => {
        const title = text.length > 16 ? text.slice(0, 16) + '…' : text;
        const bms = store.addBookmark({
          title,
          source: 'AI 已提炼 3 个要点 · 刚刚收藏'
        });
        this.setData({
          bookmarks: bms,
          importResult: {
            title,
            source: 'AI 已提炼 3 个要点 · 刚刚收藏',
            tip: 'AI 服务暂时不可用，已按本地规则收藏'
          },
          importStep: 'result'
        });
      })
      .then(() => {
        this.setData({ analyzing: false });
      });
  },

  continueCollect() {
    this.setData({
      importStep: 'input',
      importResult: null,
      importText: '',
      importImage: ''
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
