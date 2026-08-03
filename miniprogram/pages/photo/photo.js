const store = require('../../utils/store');

Page({
  data: {
    photos: []
  },

  onShow() {
    this.setData({ photos: store.getPhotos() });
  },

  takePhoto() {
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['camera', 'album'],
      success: res => {
        const photos = store.addPhotos(res.tempFilePaths);
        this.setData({ photos });
        wx.showToast({ title: '已存档 ' + res.tempFilePaths.length + ' 张', icon: 'success' });
      }
    });
  },

  preview(e) {
    const url = e.currentTarget.dataset.url;
    const urls = this.data.photos.map(p => p.path);
    wx.previewImage({ current: url, urls });
  },

  remove(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除照片',
      content: '删除后无法恢复，确定吗？',
      success: res => {
        if (res.confirm) {
          const photos = store.removePhoto(id);
          this.setData({ photos });
        }
      }
    });
  }
});
