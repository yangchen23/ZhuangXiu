// 云函数：DeepSeek AI 代理
// 部署后在云函数配置里设置环境变量 DEEPSEEK_API_KEY，密钥不落客户端。
// 调用：wx.cloud.callFunction({ name: 'aiChat', data: { messages, response_format } })
const https = require('https');

const BASE_URL = 'https://api.deepseek.com';
const DEFAULT_MODEL = 'deepseek-v4-flash';
const FALLBACK_MODEL = 'deepseek-chat';

function post(path, payload, key) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = https.request(
      {
        hostname: 'api.deepseek.com',
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + key,
          'Content-Length': Buffer.byteLength(data)
        }
      },
      res => {
        let body = '';
        res.on('data', chunk => {
          body += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error('响应解析失败: ' + body.slice(0, 200)));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function complete(key, model, payload) {
  const data = await post('/chat/completions', Object.assign({ model, temperature: 0.7, stream: false }, payload), key);
  if (data.error) {
    const err = new Error(String((data.error && data.error.message) || JSON.stringify(data.error)));
    err.isModelError = /model/i.test(err.message) && /not|invalid|不存在|不支持|unavailable/i.test(err.message);
    throw err;
  }
  if (!data.choices || !data.choices[0]) {
    throw new Error('DeepSeek 返回为空');
  }
  return data.choices[0].message.content;
}

exports.main = async (event) => {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) {
    return { ok: false, msg: '云函数未配置 DEEPSEEK_API_KEY 环境变量' };
  }
  const model = event.model || DEFAULT_MODEL;
  const payload = {
    messages: event.messages || [],
    ...(event.response_format ? { response_format: event.response_format } : {})
  };
  try {
    let content;
    try {
      content = await complete(key, model, payload);
    } catch (e) {
      if (e.isModelError) {
        content = await complete(key, FALLBACK_MODEL, payload);
      } else {
        throw e;
      }
    }
    return { ok: true, content, model };
  } catch (e) {
    return { ok: false, msg: String((e && e.message) || e) };
  }
};
