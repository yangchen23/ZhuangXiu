const seed = require('../../data/seed');

function mockReply(text) {
  if (text.indexOf('瓷砖') !== -1) {
    return '800×800 性价比高、损耗小；750×1500 缝隙少更大气，适合大客厅，但单片价和铺贴工费都更高。\n\n你家 90㎡ 套内，建议：客厅地面 750×1500，厨卫用小砖，主卧用木纹砖过渡。';
  }
  if (text.indexOf('防水') !== -1) {
    return '淋浴区防水至少刷到 1.8 米，其他墙面 30cm 起步，建议整面墙刷到顶更稳妥。门槛石位置必须做挡水坎，闭水试验 48 小时不能少。';
  }
  if (text.indexOf('水电') !== -1) {
    return '水管走顶：漏了容易发现、维修方便，但费材料、造价高；走地：省钱，但漏水难排查。\n\n预算允许建议厨卫走顶，客厅卧室走地。';
  }
  if (text.indexOf('半包') !== -1 || text.indexOf('预算') !== -1) {
    return '90㎡ 套内三室两厅，深圳半包行情大约 ¥6-9 万（不含主材），全包 ¥15-22 万。\n\n建议你先定好风格和预算分配（材料40% 人工30% 家具20% 家电10%），再找 2-3 家对比报价。';
  }
  if (text.indexOf('门') !== -1 && text.indexOf('地板') !== -1) {
    return '先铺地板再装门：地板收口好、门套不压地板；但门安装需要地面高度确定。\n\n稳妥顺序：先贴砖/找平 → 装门 → 铺地板 → 装踢脚线。';
  }
  return '好问题！这个问题建议先查知识库（参考 → 知识），里面已经有 50+ 常见问答。\n\n如果还没找到答案，可以更具体地描述你的场景（面积、阶段、预算），我再帮你分析。';
}

Page({
  data: {
    messages: [
      {
        role: 'ai',
        text: '你好呀！我是筑家记的装修小管家 🤖\n\n可以问我：材料怎么选、工序怎么排、预算怎么分。也可以拍照让我看现场。'
      }
    ],
    input: '',
    quick: seed.aiChatQuick,
    sending: false
  },

  onInput(e) {
    this.setData({ input: e.detail.value });
  },

  send() {
    const text = this.data.input.trim();
    if (!text || this.data.sending) return;
    this.pushMessage('user', text);
    this.setData({ input: '', sending: true });
    setTimeout(() => {
      this.pushMessage('ai', mockReply(text));
      this.setData({ sending: false });
    }, 700);
  },

  tapQuick(e) {
    const q = e.currentTarget.dataset.q;
    this.pushMessage('user', q);
    this.setData({ sending: true });
    setTimeout(() => {
      this.pushMessage('ai', mockReply(q));
      this.setData({ sending: false });
    }, 700);
  },

  choosePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera', 'album'],
      success: res => {
        this.pushMessage('user', '📷 [发了一张现场照片]');
        this.setData({ sending: true });
        setTimeout(() => {
          this.pushMessage('ai', '我看到照片了（当前为本地演示，未接入视觉模型）。\n\n从画面判断，这应该是施工阶段。建议对照「泥瓦验收清单」检查：平整度、留缝宽度、空鼓率、阴阳角方正。拍照存到「拍照留档」里方便后期对比。');
          this.setData({ sending: false });
        }, 900);
      }
    });
  },

  pushMessage(role, text) {
    const messages = this.data.messages.concat([{ role, text }]);
    this.setData({ messages });
    wx.pageScrollTo({ scrollTop: 99999, duration: 300 });
  },

  scrollToBottom() {
    wx.pageScrollTo({ scrollTop: 99999, duration: 300 });
  }
});
