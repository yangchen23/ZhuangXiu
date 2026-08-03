// ===== 筑家记 V4.5 默认演示数据 =====

const spaces = [
  { name: '客厅', emoji: '🛋️', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)' },
  { name: '主卧', emoji: '🛏️', bg: 'linear-gradient(135deg,#dbeafe,#bfdbfe)' },
  { name: '次卧', emoji: '🛏️', bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)' },
  { name: '厨房', emoji: '🍳', bg: 'linear-gradient(135deg,#fce7f3,#fbcfe8)' },
  { name: '主卫', emoji: '🚿', bg: 'linear-gradient(135deg,#dcfce7,#bbf7d0)' },
  { name: '书房', emoji: '📚', bg: 'linear-gradient(135deg,#f3e8ff,#e9d5ff)' },
  { name: '阳台', emoji: '🌳', bg: 'linear-gradient(135deg,#fef9c3,#fde68a)' },
  { name: '全屋', emoji: '🏠', bg: 'linear-gradient(135deg,#dbeafe,#bfdbfe)' },
  { name: '餐厅', emoji: '🍽️', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)' }
];

const records = [
  {
    id: 'r1', icon: '🧱', title: '客厅地砖铺完第3天', space: '客厅',
    meta: '客厅 · 泥瓦 · 7.30', date: '2026-07-30',
    desc: '800×800浅灰色通体大理石瓷砖，留缝2mm。师傅手艺不错，平整度目测OK。',
    tags: ['客厅', '泥瓦', '验收']
  },
  {
    id: 'r2', icon: '💧', title: '卫生间闭水试验通过', space: '主卫',
    meta: '主卫 · 防水 · 7.30', date: '2026-07-30',
    desc: '蓄水48小时，楼下无渗漏。防水涂料刷到1.8米高，门槛石位置做了挡水坎。',
    tags: ['防水', '验收']
  },
  {
    id: 'r3', icon: '✅', title: '水电验收通过', space: '全屋',
    meta: '全屋 · 水电 · 7.28', date: '2026-07-28',
    desc: '水管打压0.8MPa保持30分钟不掉压，电路通断测试正常。',
    tags: ['水电', '验收']
  },
  {
    id: 'r4', icon: '🍳', title: '厨房水电走完', space: '厨房',
    meta: '厨房 · 水电 · 7.25', date: '2026-07-25',
    desc: '橱柜下方预留4个插座（洗碗机/净水器/垃圾处理器/备用）。',
    tags: ['水电', '厨房']
  },
  {
    id: 'r5', icon: '🎉', title: '开工大吉', space: '全屋',
    meta: '全屋 · 开工 · 7.22', date: '2026-07-22',
    desc: '砸墙完成，垃圾清运完毕。明天开始开槽布线。',
    tags: ['开工']
  }
];

const budget = {
  total: 200000,
  spent: 0,
  byCategory: { material: 0, labor: 0, furniture: 0, appliance: 0 },
  categoryBudget: { material: 80000, labor: 60000, furniture: 40000, appliance: 20000 },
  flow: []
};

const prep = [
  { name: '选定风格', done: true, next: false },
  { name: '预算规划', done: true, next: false },
  { name: '找施工方', done: false, next: true },
  { name: '签合同', done: false, next: false },
  { name: '办手续', done: false, next: false }
];

const tasks = [
  { text: '客厅地砖铺完检查', done: true },
  { text: '厨房墙砖贴完', done: true },
  { text: '卫生间闭水试验', done: true },
  { text: '主卫贴砖（剩3㎡）', done: false },
  { text: '预约木工师傅（明早9点）', done: false },
  { text: '选购筒灯8个（客厅）', done: false },
  { text: '确认吊顶方案图', done: false },
  { text: '瓷砖空鼓复查', done: false }
];

const checks = [
  { text: '表面平整度（2m靠尺≤3mm）', done: true },
  { text: '阴阳角方正', done: true },
  { text: '留缝宽度一致（2mm）', done: true },
  { text: '卫生间坡度', done: true },
  { text: '闭水试验48h', done: true },
  { text: '空鼓率检查', done: false },
  { text: '接缝高低差', done: false },
  { text: '门口挡水坎', done: false }
];

const bookmarks = [
  {
    id: 'b1', thumb: '📱', bg: 'linear-gradient(135deg,#fce7f3,#fbcfe8)',
    title: '日式厨房必装这 5 个神器', source: '来自小红书 · 已提炼 5 个要点'
  },
  {
    id: 'b2', thumb: '🎵', bg: 'linear-gradient(135deg,#dbeafe,#bfdbfe)',
    title: '水电改造避坑指南', source: '来自抖音 · 已提炼 7 个检查项'
  }
];

const styles = [
  { name: '北欧', emoji: '🪵', bg: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)' },
  { name: '日式', emoji: '🎋', bg: 'linear-gradient(135deg,#fefce8,#fef9c3)' },
  { name: '侘寂', emoji: '🏺', bg: 'linear-gradient(135deg,#faf5ff,#f3e8ff)' },
  { name: '极简', emoji: '⬜', bg: 'linear-gradient(135deg,#f8fafc,#f1f5f9)' },
  { name: '新中式', emoji: '🏮', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)' },
  { name: '轻奢', emoji: '✨', bg: 'linear-gradient(135deg,#fdf2f8,#fce7f3)' },
  { name: '法式', emoji: '🥐', bg: 'linear-gradient(135deg,#fef2f2,#fee2e2)' },
  { name: '美式', emoji: '🛋️', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' }
];

const categories = [
  { name: '瓷砖', emoji: '🧱' },
  { name: '地板', emoji: '🪵' },
  { name: '涂料', emoji: '🎨' },
  { name: '卫浴', emoji: '🚿' },
  { name: '灯具', emoji: '💡' },
  { name: '开关', emoji: '🔌' },
  { name: '门窗', emoji: '🪟' },
  { name: '家电', emoji: '🛁' }
];

const faqs = [
  { q: '装修的正确顺序？', hot: true, a: '拆除改造 → 中央空调/新风 → 水电 → 防水 → 泥瓦（贴砖）→ 木工（吊顶/柜体）→ 油漆 → 安装（橱柜/门/灯具）→ 开荒保洁 → 软装 → 入住。' },
  { q: '瓷砖选800×800还是750×1500？', hot: true, a: '800×800性价比高、损耗小；750×1500缝隙少更大气，适合大客厅，但价格和工费更高。90㎡套内建议客厅750×1500、厨卫用小砖。' },
  { q: '卫生间防水要多高？', hot: false, a: '淋浴区防水至少刷到1.8米，其他墙面30cm起步，建议全刷到顶更稳妥；门槛石处必须做挡水坎。' },
  { q: '水管走顶好还是走地？', hot: false, a: '走顶漏水好发现、维修方便，但造价高；走地省材料，但漏水难排查。预算允许建议卫生间/厨房走顶。' },
  { q: '中央空调什么时候装？', hot: false, a: '水电改造前后就要定，吊顶前必须装完（内机+铜管），否则后期只能做明装或风管机替代。' }
];

// 日历事件（按当月日期分布，仅演示）
const calendarEvents = [
  { day: 3, color: 'orange', text: '泥瓦工继续进行', time: '第38天' },
  { day: 4, color: 'green', text: '预约木工师傅', time: '8.4' },
  { day: 5, color: 'green', text: '客厅地砖铺完第9天', time: '8.5' },
  { day: 8, color: 'orange', text: '泥瓦阶段收尾', time: '第43天' },
  { day: 10, color: 'green', text: '木工进场', time: '8.10' }
];

const styleTestQuestions = [
  {
    q: '休息日你更想待在？',
    a: { text: '大横厅，阳光洒满整个空间', style: '北欧' },
    b: { text: '温馨小客厅，随手能拿到茶和书', style: '日式' }
  },
  {
    q: '最喜欢的色系是？',
    a: { text: '原木色 + 米白，温润自然', style: '日式' },
    b: { text: '黑白灰 + 一点点亮色点缀', style: '极简' }
  },
  {
    q: '关于收纳，你更看重？',
    a: { text: '能藏就藏，台面空空最舒服', style: '极简' },
    b: { text: '展示我心爱的小物件', style: '轻奢' }
  },
  {
    q: '家具质感你选？',
    a: { text: '沉稳实木，越用越有味道', style: '侘寂' },
    b: { text: '轻盈金属 + 布艺，现代感强', style: '北欧' }
  },
  {
    q: '家里来客人的频率？',
    a: { text: '经常，客厅要大气好客', style: '轻奢' },
    b: { text: '偶尔，够用舒服就行', style: '日式' }
  }
];

const weatherConfigs = [
  {
    cls: 'sunny', emoji: '☀️', title: '早安，准备中的家',
    quote: '每个家都是独一无二的\n你今天挑选的每一样，都在让家更近一点',
    icon: '☀️', temp: '26-32°C', desc: '晴', air: '优 · 湿度 45%',
    tip: '☀️ 适合出门选材', rain: false
  },
  {
    cls: 'rainy', emoji: '🌧️', title: '雨天，在家做功课',
    quote: '下雨天更适合规划\n把想要的家，一笔一笔画出来',
    icon: '🌧️', temp: '22-28°C', desc: '中雨', air: '良 · 湿度 78%',
    tip: '⛈️ 今天别去建材市场', rain: true
  },
  {
    cls: 'cloudy', emoji: '⛅', title: '阴天，柔和的灵感',
    quote: '不急不躁的日子\n才是看清自己真实想要的时刻',
    icon: '⛅', temp: '24-30°C', desc: '多云', air: '良 · 湿度 60%',
    tip: '🌥️ 出门记得带件外套', rain: false
  }
];

const aiChatQuick = ['瓷砖怎么选？', '水电走顶还是走地？', '先装门还是先铺地板？', '半包大概多少钱？'];

module.exports = {
  spaces,
  records,
  budget,
  prep,
  tasks,
  checks,
  bookmarks,
  styles,
  categories,
  faqs,
  calendarEvents,
  styleTestQuestions,
  weatherConfigs,
  aiChatQuick
};
