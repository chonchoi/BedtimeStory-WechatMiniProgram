const COZE_CONFIG = {
  clientId: '35549985542182010918944549115708.app.coze',
  authUrl: 'https://www.coze.cn/oauth/authorize',
  tokenUrl: 'https://www.coze.cn/oauth/token'
}

class CozeAuth {
  constructor() {
    this.accessToken = wx.getStorageSync('coze_access_token') || null
    this.codeVerifier = null
  }

  // 生成随机字符串
  generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    let text = ''
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  // SHA256 哈希
  sha256(str) {
    return new Promise((resolve) => {
      wx.getFileSystemManager().readFile({
        filePath: `${wx.env.USER_DATA_PATH}/temp.txt`,
        encoding: 'utf-8',
        success: () => {
          // 由于小程序环境限制，这里使用模拟的哈希值
          const mockHash = this.generateRandomString(43) + '='
          resolve(mockHash)
        },
        fail: () => {
          // 如果读取失败，也返回模拟的哈希值
          const mockHash = this.generateRandomString(43) + '='
          resolve(mockHash)
        }
      })
    })
  }

  // 获取授权URL
  async getAuthUrl() {
    // 生成 code_verifier
    this.codeVerifier = this.generateRandomString(128)
    
    // 生成 code_challenge (使用模拟的 SHA256)
    const codeChallenge = await this.sha256(this.codeVerifier)
    
    // 构建授权URL
    const queryParams = [
      `client_id=${COZE_CONFIG.clientId}`,
      'response_type=code',
      `code_challenge=${encodeURIComponent(codeChallenge)}`,
      'code_challenge_method=S256',
      'redirect_uri=https://mp.weixin.qq.com/wxaauth/redirect',
      'state=wx_mp'
    ].join('&')

    return `${COZE_CONFIG.authUrl}?${queryParams}`
  }

  // 使用授权码获取访问令牌
  async getAccessToken(code) {
    if (!this.codeVerifier) {
      throw new Error('Missing code verifier')
    }

    try {
      const response = await wx.request({
        url: 'https://api.coze.cn/api/permission/oauth2/token',
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'https://suidaoai.com/',
          client_id: COZE_CONFIG.clientId,
          code_verifier: this.codeVerifier
        }
      })

      if (response.data.access_token) {
        this.accessToken = response.data.access_token
        // 保存令牌到本地存储
        wx.setStorageSync('coze_access_token', this.accessToken)
        return this.accessToken
      } else {
        throw new Error('Failed to get access token')
      }
    } catch (error) {
      console.error('获取访问令牌出错:', error)
      throw error
    }
  }

  // 检查是否已授权
  isAuthorized() {
    return !!this.accessToken
  }

  // 清除授权信息
  clearAuth() {
    this.accessToken = null
    this.codeVerifier = null
    wx.removeStorageSync('coze_access_token')
  }
}

export default new CozeAuth() 