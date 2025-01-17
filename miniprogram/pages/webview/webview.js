import cozeAuth from '../../utils/auth'

Page({
  data: {
    url: ''
  },

  onLoad(options) {
    if (options.url) {
      this.setData({
        url: decodeURIComponent(options.url)
      })
    }
  },

  // 监听 WebView 加载事件
  handleLoad(e) {
    const url = e.detail.src
    
    // 检查URL是否包含授权码
    if (url.includes('code=')) {
      const code = this.getCodeFromUrl(url)
      if (code) {
        this.handleAuthCode(code)
      }
    }
  },

  // 从URL中提取授权码
  getCodeFromUrl(url) {
    const match = url.match(/[?&]code=([^&]+)/)
    return match ? match[1] : null
  },

  // 处理授权码
  async handleAuthCode(code) {
    try {
      // 保存 code 供后续使用
      wx.setStorageSync('coze_auth_code', code)
      
      wx.showToast({
        title: '授权成功',
        icon: 'success'
      })

      // 延迟跳转，让用户看到成功提示
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }, 1500)
    } catch (error) {
      wx.showToast({
        title: '授权失败',
        icon: 'none'
      })
    }
  }
}) 