import cozeAuth from '../../utils/auth'

Page({
  data: {
    isAuthorizing: false
  },

  onLoad() {
    this.checkAuthStatus()
  },

  async checkAuthStatus() {
    if (cozeAuth.isAuthorized()) {
      this.redirectToIndex()
    }
  },

  async handleAuth() {
    this.setData({ isAuthorizing: true })
    
    try {
      // 获取授权URL
      const authUrl = cozeAuth.getAuthUrl()
      
      // 跳转到 WebView 页面进行授权
      wx.navigateTo({
        url: `/pages/webview/webview?url=${encodeURIComponent(authUrl)}`
      })
    } catch (error) {
      wx.showToast({
        title: '授权失败',
        icon: 'none'
      })
    } finally {
      this.setData({ isAuthorizing: false })
    }
  },

  redirectToIndex() {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
}) 