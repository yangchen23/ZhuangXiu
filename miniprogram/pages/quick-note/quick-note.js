const store = require('../../utils/store');
const util = require('../../utils/util');
const ai = require('../../utils/ai');

const CATEGORIES = [
  { key: 'material', label: '材料', icon: '🔨' },
  { key: 'labor', label: '人工', icon: '👷' },
  { key: 'furniture', label: '家具', icon: '🪑' },
  { key: 'appliance', label: '家电', icon: '🛁' }
];

const SPACES = ['客厅', '主卧', '次卧', '厨房', '主卫', '次卫', '书房', '餐厅', '玄关', '阳台', '全屋'];

function parseText(text) {
  // 金额：68元/片 × 52片 -> 3536；否则取第一个数字金额
  let amount = 0;
  const unit = text.match(/(\d+(?:\.\d+)?)\s*元\s*\/\s*片\s*[×x*]\s*(\d+(?:\.\d+)?)\s*片/);
  if (unit) {
    amount = Math.round(parseFloat(unit[1]) * parseFloat(unit[2]));
  } else {
    const m = text.match(/[¥￥]?\s*(\d+(?:\.\d+)?)\s*(?:元|块|块钱)?/);
    if (m) amount = parseFloat(m[1]);
  }

  // 品类
  let category = 'material';
  let typeLabel = '材料';
  if (/人工|工钱|工费|师傅|泥瓦|木工|油漆|拆除|水电|瓦工/.test(text)) {
    category = 'labor';
    typeLabel = '人工';
  } else if (/沙发|床|柜|餐桌|茶几|椅子|书桌/.test(text)) {
    category = 'furniture';
    typeLabel = '家具';
  } else if (/空调|冰箱|洗衣机|烟机|灶具|热水器|洗碗机|电视/.test(text)) {
    category = 'appliance';
    typeLabel = '家电';
  }

  // 空间
  let space = '全屋';
  for (let i = 0; i < SPACES.length; i++) {
    if (text.indexOf(SPACES[i]) !== -1) {
      space = SPACES[i];
      break;
    }
  }

  // 规格与标题
  const specM = text.match(/(\d+\s*[×x*]\s*\d+|\d+(?:\.\d+)?\s*[㎡平米]|通体|抛光|釉面)/);
  const spec = specM ? specM[0] : '';
  const nounM = text.match(/(瓷砖|地板|涂料|油漆|筒灯|射灯|沙发|床|柜子|餐桌|空调|冰箱|洗衣机|热水器|洗碗机|烟机|灶具|马桶|花洒)/);
  let title = nounM ? nounM[1] + (spec ? ' ' + spec : '') : '一笔支出';
  if (!nounM) title = text.slice(0, 12) + (text.length > 12 ? '…' : '');

  return {
    amount: Math.round(amount),
    category,
    typeLabel,
    space,
    spec,
    title
  };
}

Page({
  data: {
    noteTab: 'text',
    text: '',
    categories: CATEGORIES,
    spaces: SPACES,
    parsedShown: false,
    parsed: null,
    category: 'material',
    categoryLabel: '材料',
    space: '全屋',
    amount: '',
    voiceRecording: false,
    voiceText: '',
    voiceShown: false,
    photoPath: '',
    parsing: false
  },

  switchNoteTab(e) {
    this.setData({ noteTab: e.currentTarget.dataset.tab });
  },

  onTextInput(e) {
    this.setData({ text: e.detail.value });
  },

  // ===== 智能识别 =====
  parseNote() {
    const text = this.data.text.trim();
    if (!text) {
      wx.showToast({ title: '请输入内容', icon: 'none' });
      return;
    }
    this.setData({ parsing: true });
    ai.parseExpense(text)
      .then(parsed => {
        this.applyParsed(parsed);
        if (!parsed.amount) {
          wx.showToast({ title: '没识别到金额，可手动填写', icon: 'none' });
        }
      })
      .catch(() => {
        const parsed = parseText(text);
        this.applyParsed(parsed);
        if (parsed.amount) {
          wx.showToast({ title: 'AI 服务不可用，已用本地识别', icon: 'none' });
        } else {
          wx.showToast({ title: '没识别到金额，可手动填写', icon: 'none' });
        }
      })
      .then(() => {
        this.setData({ parsing: false });
      });
  },

  applyParsed(parsed) {
    this.setData({
      parsed,
      parsedShown: true,
      category: parsed.category,
      categoryLabel: parsed.typeLabel,
      space: parsed.space,
      amount: parsed.amount ? String(parsed.amount) : ''
    });
  },

  selectCategory(e) {
    const key = e.currentTarget.dataset.key;
    const cat = CATEGORIES.find(c => c.key === key);
    this.setData({ category: key, categoryLabel: cat.label });
  },

  selectSpace(e) {
    this.setData({ space: e.currentTarget.dataset.space });
  },

  onAmountInput(e) {
    this.setData({ amount: e.detail.value });
  },

  // ===== 语音 =====
  toggleVoice() {
    if (this.data.voiceRecording) return;
    this.setData({ voiceRecording: true });
    setTimeout(() => {
      const voiceText = '在建材市场买了3个筒灯，欧普7瓦4000K，一共126块钱';
      const parsed = parseText(voiceText);
      this.setData({
        voiceRecording: false,
        voiceShown: true,
        voiceText,
        text: voiceText,
        parsed,
        parsedShown: true,
        category: parsed.category,
        categoryLabel: parsed.typeLabel,
        space: parsed.space,
        amount: String(parsed.amount)
      });
    }, 1800);
  },

  // ===== 拍照 =====
  choosePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera', 'album'],
      success: res => {
        this.setData({ photoPath: res.tempFilePaths[0] });
      }
    });
  },

  mockAIPhoto() {
    if (!this.data.photoPath) {
      wx.showToast({ title: '请先拍照或选择照片', icon: 'none' });
      return;
    }
    const sample = '瓷砖 800×800通体 68元/片 × 52片，在居然之家买的';
    const parsed = parseText(sample);
    this.setData({
      text: sample,
      parsed,
      parsedShown: true,
      category: parsed.category,
      categoryLabel: parsed.typeLabel,
      space: parsed.space,
      amount: String(parsed.amount)
    });
    wx.showToast({ title: 'AI 识别：瓷砖 ¥3,536', icon: 'none' });
  },

  // ===== 保存 =====
  saveExpense() {
    const amount = Number(this.data.amount);
    if (!amount || amount <= 0) {
      wx.showToast({ title: '请先智能识别，确认金额', icon: 'none' });
      return;
    }
    const parsed = this.data.parsed || {};
    const cat = CATEGORIES.find(c => c.key === this.data.category);
    store.addExpense({
      amount,
      category: this.data.category,
      typeLabel: cat.label,
      icon: cat.icon,
      title: parsed.title || '一笔支出',
      meta: this.data.space + ' · 刚刚',
      space: this.data.space
    });
    wx.showToast({ title: '已保存！已自动计入预算', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 900);
  },

  noop() {}
});
