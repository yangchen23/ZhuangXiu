const store = require('../../utils/store');

Page({
  data: {
    spaces: [],
    modalOpen: false,
    name: '',
    emoji: '🪑',
    emojiList: ['🪑', '🚪', '🧺', '👕', '📦', '🚗', '🏋️', '🎮', '🎨', '🛋️', '🌸', '🏊']
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const records = store.getRecords();
    const spaces = store.getSpaces().map(s => Object.assign({}, s, {
      count: store.spaceCount(records, s.name)
    }));
    this.setData({ spaces });
  },

  goDiary(e) {
    getApp().globalData.diaryTab = 'record';
    getApp().globalData.spaceFilter = e.currentTarget.dataset.space;
    wx.switchTab({ url: '/pages/diary/diary' });
  },

  deleteSpace(e) {
    const name = e.currentTarget.dataset.space;
    wx.showModal({
      title: '删除空间',
      content: '删除「' + name + '」？已有记录仍保留，只是不再按该空间筛选。',
      success: res => {
        if (res.confirm) {
          store.removeSpace(name);
          this.refresh();
          wx.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  },

  openModal() {
    this.setData({ modalOpen: true, name: '', emoji: '🪑' });
  },

  closeModal() {
    this.setData({ modalOpen: false });
  },

  onName(e) {
    this.setData({ name: e.detail.value });
  },

  selectEmoji(e) {
    this.setData({ emoji: e.currentTarget.dataset.emoji });
  },

  confirmAdd() {
    const name = this.data.name.trim();
    if (!name) {
      wx.showToast({ title: '请输入空间名称', icon: 'none' });
      return;
    }
    const ok = store.addSpace(name, this.data.emoji);
    if (!ok) {
      wx.showToast({ title: '该空间已存在', icon: 'none' });
      return;
    }
    this.setData({ modalOpen: false });
    this.refresh();
  },

  noop() {}
});
