Page({
  data: {
    photo: '',
    analyzing: false,
    result: null,
    resultItems: [
      { name: '北欧', pct: 60, desc: '浅色原木 + 棉麻质感', color: '#f59e0b' },
      { name: '日式', pct: 25, desc: '收纳有序 + 暖光氛围', color: '#3b82f6' },
      { name: '侘寂', pct: 15, desc: '素色微水泥 + 留白', color: '#8b5cf6' }
    ],
    tips: ['建议：客厅以北欧为主基调，卧室点缀日式暖光', '推荐先看「北欧风格图库」收藏 3-5 张参考图']
  },

  choosePhoto() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera', 'album'],
      success: res => {
        this.setData({ photo: res.tempFiles[0].tempFilePath, result: null });
      }
    });
  },

  analyze() {
    if (!this.data.photo || this.data.analyzing) return;
    this.setData({ analyzing: true });
    setTimeout(() => {
      this.setData({ analyzing: false, result: true });
    }, 1200);
  },

  goGallery(e) {
    wx.navigateTo({ url: '/pages/gallery/gallery?style=' + e.currentTarget.dataset.style });
  }
});
