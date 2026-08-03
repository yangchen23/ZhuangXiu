// ===== 真实天气服务 =====
// 天气：Open-Meteo（免费、无需 key）
// 空气质量：Open-Meteo Air Quality API（免费、无需 key）
// 地址：可选配腾讯位置服务 WebService key（config.WEATHER.TENCENT_MAP_KEY）
const config = require('../config');
const CITIES = require('../data/cities');

let local = {};
try {
  local = require('../config.local');
} catch (e) {
  // 未配置本地私有文件时忽略
}

// 球面距离（km）
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = Math.PI / 180;
  const dLat = (lat2 - lat1) * toRad;
  const dLon = (lon2 - lon1) * toRad;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// 就近匹配城市（免 key，全国主要城市）
function nearestCity(lat, lon) {
  let best = null;
  let bestD = Infinity;
  for (let i = 0; i < CITIES.length; i++) {
    const d = haversine(lat, lon, CITIES[i].lat, CITIES[i].lon);
    if (d < bestD) {
      bestD = d;
      best = CITIES[i];
    }
  }
  if (!best || bestD > 250) return '';
  return best.name;
}

function requestJson(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      timeout: 8000,
      success(res) {
        if (res.statusCode === 200 && res.data) resolve(res.data);
        else reject(new Error('HTTP ' + res.statusCode));
      },
      fail(e) {
        reject(new Error(e.errMsg || '网络错误'));
      }
    });
  });
}

// WMO 天气代码 -> 条件
function mapCode(code) {
  if (code === 0 || code === 1) return 'sunny';
  if (code === 2 || code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'rain'; // 毛毛雨/冻毛毛雨
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'rain';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 95 && code <= 99) return 'rain'; // 雷阵雨
  return 'cloudy';
}

const COND = {
  sunny: {
    cls: 'sunny', emoji: '☀️', icon: '☀️', desc: '晴',
    title: '早安，准备中的家',
    quote: '每个家都是独一无二的\n你今天挑选的每一样，都在让家更近一点',
    tip: '☀️ 适合出门选材', rain: false
  },
  cloudy: {
    cls: 'cloudy', emoji: '⛅', icon: '⛅', desc: '多云',
    title: '阴天，柔和的灵感',
    quote: '不急不躁的日子\n才是看清自己真实想要的时刻',
    tip: '🌥️ 出门记得带件外套', rain: false
  },
  fog: {
    cls: 'cloudy', emoji: '🌫️', icon: '🌫️', desc: '雾',
    title: '雾天，慢慢来',
    quote: '看得清方向就好\n剩下的交给时间',
    tip: '🌫️ 能见度低，出行注意安全', rain: false
  },
  rain: {
    cls: 'rainy', emoji: '🌧️', icon: '🌧️', desc: '雨',
    title: '雨天，在家做功课',
    quote: '下雨天更适合规划\n把想要的家，一笔一笔画出来',
    tip: '⛈️ 今天别去建材市场', rain: true
  },
  snow: {
    cls: 'cloudy', emoji: '❄️', icon: '❄️', desc: '雪',
    title: '下雪了，注意保暖',
    quote: '天冷路滑\n看材料的事缓一缓',
    tip: '❄️ 天冷路滑，注意保暖', rain: false
  }
};

// 美国 EPA AQI -> 中文等级
function aqiLabel(aqi) {
  if (aqi === null || aqi === undefined) return '';
  if (aqi <= 50) return '优';
  if (aqi <= 100) return '良';
  if (aqi <= 150) return '轻度污染';
  if (aqi <= 200) return '中度污染';
  return '重度污染';
}

function build(forecast, air) {
  const cur = forecast.current || {};
  const condKey = mapCode(cur.weather_code);
  const cond = COND[condKey];
  const aqi = air && air.current ? air.current.us_aqi : null;
  const humidity = cur.relative_humidity_2m !== undefined ? Math.round(cur.relative_humidity_2m) : null;
  const airText = aqi === null
    ? (humidity === null ? '空气质量暂缺' : '空气数据暂缺 · 湿度 ' + humidity + '%')
    : '空气质量' + aqiLabel(aqi) + ' · 湿度 ' + humidity + '%';
  return Object.assign({}, cond, {
    temp: Math.round(cur.temperature_2m) + '°C',
    air: airText,
    humidity,
    aqi,
    label: '',
    fetchedAt: Date.now()
  });
}

// 获取真实天气（含空气质量）
function fetch(lat, lon) {
  const base = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude=' + lat
    + '&longitude=' + lon
    + '&current=temperature_2m,relative_humidity_2m,weather_code,is_day'
    + '&timezone=Asia%2FShanghai&forecast_days=1';
  const air = 'https://air-quality-api.open-meteo.com/v1/air-quality'
    + '?latitude=' + lat
    + '&longitude=' + lon
    + '&current=us_aqi';
  const forecastP = requestJson(base);
  const airP = requestJson(air).catch(() => null);
  return Promise.all([forecastP, airP]).then(([f, a]) => build(f, a));
}

// 逆地理编码：配置腾讯 key 返回街道级地址；否则就近匹配城市名
function geocode(lat, lon) {
  const key = (config.WEATHER && config.WEATHER.TENCENT_MAP_KEY) || local.TENCENT_MAP_KEY || '';
  if (!key) return Promise.resolve(nearestCity(lat, lon));
  const url = 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + lat + ',' + lon + '&key=' + key;
  return requestJson(url)
    .then(d => {
      if (!d || d.status !== 0 || !d.result) return nearestCity(lat, lon);
      const comp = d.result.address_component || {};
      const city = comp.city || '';
      const district = comp.district || '';
      const brief = (d.result.address || '').slice(0, 10);
      return (city + ' · ' + district + ' ' + brief).trim() || nearestCity(lat, lon);
    })
    .catch(() => nearestCity(lat, lon));
}

module.exports = {
  fetch,
  geocode,
  aqiLabel
};
