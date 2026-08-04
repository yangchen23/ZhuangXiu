// ===== DeepSeek AI 服务层 =====
// 通道一：云函数 aiChat（推荐，密钥在云端）
// 通道二：客户端直连（仅开发调试用，密钥在 config.local.js，勿提交）
const config = require('../config');

let local = {};
try {
  local = require('../config.local');
} catch (e) {
  // 未创建 config.local.js 时忽略
}

const API_KEY = (config.DEEPSEEK && config.DEEPSEEK.API_KEY) || local.DEEPSEEK_API_KEY || '';
const BASE_URL = (config.DEEPSEEK && config.DEEPSEEK.BASE_URL) || 'https://api.deepseek.com';
const MODEL = (config.DEEPSEEK && config.DEEPSEEK.MODEL) || 'deepseek-v4-flash';
const FALLBACK_MODEL = (config.DEEPSEEK && config.DEEPSEEK.FALLBACK_MODEL) || 'deepseek-chat';

const SYSTEM_CHAT = [
  '你是「筑家记」的装修智能管家。用户是装修小白：准备期、套内 90㎡ 三室两厅、北欧风为主日式为辅、预算约 20 万。',
  '回答要求：',
  '1. 使用中文，简洁口语化，分点不超过 5 条；',
  '2. 知识库优先：涉及常见问题先提示去「参考 → 知识」查看已有问答；',
  '3. 涉及价格给出参考区间，并提醒以本地市场报价为准；',
  '4. 不确定的事情明确说不知道，不要编造。'
].join('\n');

const PARSE_PROMPT = [
  '你是筑家记的记账助手。从装修消费文本中提取结构化信息，只返回 JSON（不要任何解释）：',
  '{"amount": 数字(元), "category": "material|labor|furniture|appliance", "typeLabel": "材料|人工|家具|家电", "space": "空间名或全屋", "spec": "规格字符串或空", "title": "简短标题(≤12字)"}',
  '规则：金额单位元；出现"68元/片 × 52片"这类要算出总价；识别不出的字段填空/全屋/material；金额保留整数。',
  '文本："""'
].join('\n');

const SUMMARIZE_PROMPT = [
  '你是装修内容提炼助手。用户收藏了外部装修内容（可能是链接、文字或截图描述），请提炼要点。只返回 JSON：',
  '{"title":"原标题或主题(≤15字)", "points": 要点数量(数字), "tip": "一句最有用的建议"}',
  '内容："""'
].join('\n');

function cloudReady() {
  const app = getApp();
  return !!(wx.cloud && app && app.globalData && app.globalData.cloudReady);
}

function requestAPI(model, payload) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + '/chat/completions',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
      },
      data: Object.assign({ model, temperature: 0.7, stream: false }, payload),
      success(res) {
        if (res.statusCode === 200 && res.data && res.data.choices && res.data.choices[0]) {
          resolve(res.data.choices[0].message.content);
          return;
        }
        const raw = res.data && (res.data.error && (res.data.error.message || JSON.stringify(res.data.error))) || ('HTTP ' + res.statusCode);
        const err = new Error(raw);
        err.isModelError = /model/i.test(raw) && /not|invalid|不存在|不支持|unavailable/i.test(raw);
        reject(err);
      },
      fail(e) {
        reject(new Error(e.errMsg || '网络错误'));
      }
    });
  });
}

function callAPI(payload) {
  if (cloudReady()) {
    // 优先走云函数（密钥在云端），失败自动降级直连（若本地有 key）
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'aiChat',
        data: payload,
        success(r) {
          const result = r.result || {};
          if (result.ok) resolve(result.content);
          else reject(new Error(result.msg || '云函数返回异常'));
        },
        fail(e) {
          reject(new Error(e.errMsg || '云函数调用失败'));
        }
      });
    }).catch(err => {
      if (!API_KEY) throw err;
      return requestAPI(MODEL, payload).catch(e => {
        if (e.isModelError) return requestAPI(FALLBACK_MODEL, payload);
        throw e;
      });
    });
  }
  if (!API_KEY) {
    return Promise.reject(new Error('未配置 DeepSeek API Key（请创建 miniprogram/config.local.js）'));
  }
  return requestAPI(MODEL, payload).catch(e => {
    if (e.isModelError) return requestAPI(FALLBACK_MODEL, payload);
    throw e;
  });
}

function jsonParse(content) {
  const text = content.trim();
  // 兼容模型偶尔输出 ```json 包裹
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return JSON.parse(m ? m[1] : text);
}

const CATEGORY_MAP = {
  material: '材料',
  labor: '人工',
  furniture: '家具',
  appliance: '家电'
};

const LABEL_TO_KEY = {
  '材料': 'material',
  '人工': 'labor',
  '家具': 'furniture',
  '家电': 'appliance'
};

// 对话
function chat(history) {
  const messages = [{ role: 'system', content: SYSTEM_CHAT }].concat(
    history.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
  );
  return callAPI({ messages }).then(content => (content || '').trim());
}

// 随手记智能归类
function parseExpense(text) {
  return callAPI({
    messages: [{ role: 'user', content: PARSE_PROMPT + text + '"""' }],
    response_format: { type: 'json_object' }
  }).then(content => {
    const obj = jsonParse(content);
    // 兼容 AI 返回 key（material）或中文（材料）两种情况
    let category = String(obj.category || '').trim();
    if (!CATEGORY_MAP[category]) {
      category = LABEL_TO_KEY[category] || 'material';
    }
    const typeLabel = CATEGORY_MAP[category] || obj.typeLabel || '材料';
    return {
      amount: Math.round(Number(String(obj.amount || '').replace(/,/g, '')) || 0),
      category,
      typeLabel,
      space: obj.space || '全屋',
      spec: obj.spec || '',
      title: obj.title || '一笔支出'
    };
  });
}

// 外部收藏 AI 提炼
function summarize(text) {
  return callAPI({
    messages: [{ role: 'user', content: SUMMARIZE_PROMPT + text + '"""' }],
    response_format: { type: 'json_object' }
  }).then(content => jsonParse(content));
}

module.exports = {
  chat,
  parseExpense,
  summarize,
  hasKey: !!API_KEY,
  model: MODEL
};
