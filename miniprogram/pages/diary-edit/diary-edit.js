const store = require('../../utils/store');
const util = require('../../utils/util');

Page({
  data: {
    todayStr: '',
    spaces: ['客厅', '主卧', '次卧', '厨房', '主卫', '次卫', '书房', '餐厅', '玄关', '阳台', '全屋'],
    types: ['拆除改造', '水电改造', '防水', '泥瓦工', '木工', '油漆', '安装', '验收', '其他'],
    selectedSpace: '',
    selectedType: '',
    photos: [],
    content: '',
    tags: [],
    tagInput: ''
  },

  onLoad() {
    this.setData({ todayStr: util.formatToday() });
  },

  selectSpace(e) {
    this.setData({ selectedSpace: e.currentTarget.dataset.space });
  },

  selectType(e) {
    this.setData({ selectedType: e.currentTarget.dataset.type });
  },

  chooseImages() {
    const remain = 9 - this.data.photos.length;
    if (remain <= 0) {
      wx.showToast({ title: '最多上传 9 张', icon: 'none' });
      return;
    }
    wx.chooseImage({
      count: remain,
      sizeType: ['compressed'],
      sourceType: ['camera', 'album'],
      success: res => {
        const photos = this.data.photos.concat(res.tempFilePaths);
        this.setData({ photos });
      }
    });
  },

  removePhoto(e) {
    const idx = e.currentTarget.dataset.index;
    const photos = this.data.photos.slice();
    photos.splice(idx, 1);
    this.setData({ photos });
  },

  previewPhoto(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({ current: url, urls: this.data.photos });
  },

  onContent(e) {
    this.setData({ content: e.detail.value });
  },

  onTagInput(e) {
    this.setData({ tagInput: e.detail.value });
  },

  addTag() {
    const v = this.data.tagInput.trim();
    if (!v) return;
    if (this.data.tags.indexOf(v) !== -1) {
      wx.showToast({ title: '标签已存在', icon: 'none' });
      return;
    }
    this.setData({
      tags: this.data.tags.concat([v]),
      tagInput: ''
    });
  },

  removeTag(e) {
    const idx = e.currentTarget.dataset.index;
    const tags = this.data.tags.slice();
    tags.splice(idx, 1);
    this.setData({ tags });
  },

  save() {
    const content = this.data.content.trim();
    if (!this.data.selectedSpace) {
      wx.showToast({ title: '请选择所属空间', icon: 'none' });
      return;
    }
    if (!content) {
      wx.showToast({ title: '请填写今天做了什么', icon: 'none' });
      return;
    }
    const type = this.data.selectedType || '其他';
    store.addRecord({
      icon: '📝',
      title: (this.data.selectedSpace + ' · ' + content.slice(0, 12)) + (content.length > 12 ? '…' : ''),
      space: this.data.selectedSpace,
      meta: this.data.selectedSpace + ' · ' + type + ' · ' + util.formatShort(new Date()),
      desc: content,
      tags: this.data.tags.length ? this.data.tags : [type],
      images: this.data.photos
    });
    wx.showToast({ title: '日记已保存！', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 900);
  }
});
