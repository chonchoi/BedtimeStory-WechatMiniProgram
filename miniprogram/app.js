// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'prod-4gld73wt5d371d02',
        traceUser: true,
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
      throw error;
    }
  },

  // 打印当前用户 openId
  async logOpenId() {
    if (!this.globalData.openId) {
      await this.getOpenId();
    }
    console.log('当前用户 openId:', this.globalData.openId);
  }
});
