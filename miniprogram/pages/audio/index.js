Page({
  data: {
    audioUrl: 'https://lf-bot-studio-plugin-resource.coze.cn/obj/bot-studio-platform-plugin-tos/artist/image/a20c176436e74fb4ac4e31f01936fcf3.mp3',
    audioContext: null
  },

  onLoad: function() {
    // 创建音频上下文
    this.audioContext = wx.createInnerAudioContext()
    this.audioContext.src = this.data.audioUrl
    this.audioContext.autoplay = true

    // 监听播放错误
    this.audioContext.onError((res) => {
      console.error('音频播放错误:', res.errMsg)
      wx.showToast({
        title: '音频播放失败',
        icon: 'none'
      })
    })
  },

  onUnload: function() {
    // 页面卸载时释放音频资源
    if (this.audioContext) {
      this.audioContext.destroy()
    }
  }
}) 