// app.js
App({
  onLaunch: async function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
      wx.showToast({
        title: '请升级微信版本',
        icon: 'none'
      });
      return;
    }
    
    try {
      const { envList } = require('./envList.js');
      
      // 初始化云开发
      wx.cloud.init({
        env: envList[0].envId,
        traceUser: true,
      });
      
      // 预调用一次云函数，提前完成冷启动
      await wx.cloud.callFunction({
        name: 'getOpenId'
      });
      
      console.log('云开发初始化成功');
    } catch (error) {
      console.error('云开发初始化失败：', error);
      wx.showToast({
        title: '初始化失败，请重试',
        icon: 'none'
      });
    }
  },

  globalData: {
    userInfo: null,
    openId: null
  },

  // 获取用户 openId
  async getOpenId() {
    try {
      // 如果全局变量已有值，直接返回
      if (this.globalData.openId) {
        return this.globalData.openId;
      }

      // 尝试从缓存获取
      const cachedOpenId = wx.getStorageSync('openId');
      if (cachedOpenId) {
        this.globalData.openId = cachedOpenId;
        return cachedOpenId;
      }

      // 调用云函数获取
      const { result } = await wx.cloud.callFunction({
        name: 'getOpenId'
      });

      if (result && result.openid) {
        this.globalData.openId = result.openid;
        wx.setStorageSync('openId', result.openid);
        return result.openid;
      }

      throw new Error('获取 openId 失败');
    } catch (error) {
      console.error('获取 openId 失败:', error);
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none'
      });
      throw error;
    }
  },

  // 打印当前用户 openId
  async logOpenId() {
    try {
      if (!this.globalData.openId) {
        await this.getOpenId();
      }
      console.log('当前用户 openId:', this.globalData.openId);
    } catch (error) {
      console.error('打印 openId 失败:', error);
    }
  }
});
