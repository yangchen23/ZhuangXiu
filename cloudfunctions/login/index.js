// 云函数：登录（获取用户 openid）
// 部署后在 miniprogram 中调用：
//   wx.cloud.callFunction({ name: 'login' }).then(res => res.result.openid)
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();
  return {
    openid: OPENID,
    appid: APPID,
    unionid: UNIONID
  };
};
