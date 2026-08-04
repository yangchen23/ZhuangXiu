const store = require('../../utils/store');

Page({
  data: {
    members: [],
    modalOpen: false,
    name: '',
    role: '',
    emoji: '👤',
    emojiList: ['👤', '👩', '👨', '👧', '👦', '👵', '👴', '🐻']
  },

  onShow() {
    this.setData({ members: store.getMembers() });
  },

  openModal() {
    this.setData({ modalOpen: true, name: '', role: '', emoji: '👤' });
  },

  closeModal() {
    this.setData({ modalOpen: false });
  },

  onName(e) {
    this.setData({ name: e.detail.value });
  },

  onRole(e) {
    this.setData({ role: e.detail.value });
  },

  selectEmoji(e) {
    this.setData({ emoji: e.currentTarget.dataset.emoji });
  },

  confirmAdd() {
    const name = this.data.name.trim();
    if (!name) {
      wx.showToast({ title: '请输入称呼', icon: 'none' });
      return;
    }
    const members = store.addMember(name, this.data.role.trim() || '家庭成员', this.data.emoji);
    this.setData({ modalOpen: false, members });
  },

  deleteMember(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '移除成员',
      content: '确定移除该成员吗？',
      success: res => {
        if (res.confirm) {
          const members = store.removeMember(id);
          this.setData({ members });
        }
      }
    });
  },

  noop() {}
});
