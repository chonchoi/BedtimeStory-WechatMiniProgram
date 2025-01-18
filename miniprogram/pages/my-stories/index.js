const app = getApp()

Page({
  data: {
    stories: [],
    loading: true
  },

  onLoad() {
    this.loadStories()
  },

  onShow() {
    this.loadStories()
  },

  async loadStories() {
    this.setData({ loading: true })
    console.log('开始加载故事列表...')

    try {
      // 确保获取到 openid
      if (!app.globalData.openid) {
        console.log('等待获取 openid...')
        const { result } = await wx.cloud.callFunction({
          name: 'getOpenId'
        })
        app.globalData.openid = result.openid
      }
      
      console.log('当前 openid:', app.globalData.openid)
      
      const db = wx.cloud.database()
      const { data } = await db.collection('story_list')
        .where({
          _openid: app.globalData.openid
        })
        .orderBy('create_time', 'desc')
        .get()

      console.log('原始数据:', data)

      // 格式化日期为北京时间
      const stories = data.map(story => {
        console.log('处理故事:', story)
        
        // 检查必要的字段
        if (!story.animal) {
          console.warn('故事缺少动物字段:', story)
          return null
        }

        // 处理时间戳（转换秒级为毫秒级）
        const timestamp = story.create_time * 1000
        if (!timestamp) {
          console.warn('故事缺少创建时间:', story)
          return null
        }

        // 转换时间戳为日期对象
        const date = new Date(timestamp)
        console.log('转换后的时间:', date.toISOString())
        
        const formattedStory = {
          ...story,
          created_at: date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Shanghai'
          }).replace(/\//g, '-')
        }

        console.log('格式化后的故事:', formattedStory)
        return formattedStory
      }).filter(story => story !== null) // 过滤掉无效的故事

      console.log('最终数据:', stories)

      this.setData({
        stories,
        loading: false
      })
    } catch (err) {
      console.error('获取故事列表失败：', err)
      wx.showToast({
        title: '获取故事列表失败',
        icon: 'error'
      })
      this.setData({ loading: false })
    }
  },

  onStoryTap(e) {
    const story = e.currentTarget.dataset.story
    wx.navigateTo({
      url: `/pages/story/index?id=${story._id}`
    })
  },

  onPullDownRefresh() {
    this.loadStories().then(() => {
      wx.stopPullDownRefresh()
    })
  }
}) 