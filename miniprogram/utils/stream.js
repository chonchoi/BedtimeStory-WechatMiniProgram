const request = (url, token, data) => {
  return new Promise((resolve, reject) => {
    // 禁用导航栏 loading
    wx.hideNavigationBarLoading();
    
    wx.request({
      url: 'https://api.coze.cn/v1/workflow/run',
      method: 'POST',
      header: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data,
      success: (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP Error: ${res.statusCode}`));
          return;
        }

        try {
          const { code, data: responseData, msg } = res.data;
          console.log('API响应:', res.data);
          
          if (code === 0) {
            // 尝试解析 responseData
            try {
              // 如果 responseData 是字符串，需要解析
              const parsedData = typeof responseData === 'string' 
                ? JSON.parse(responseData) 
                : responseData;
              
              // 确保有 output 字段
              if (parsedData && parsedData.output) {
                resolve(parsedData.output);
              } else {
                reject(new Error('故事内容不完整'));
              }
            } catch (e) {
              console.error('解析故事内容失败:', e);
              reject(new Error('故事内容格式错误'));
            }
          } else {
            reject(new Error(msg || '请求失败'));
          }
        } catch (error) {
          console.error('解析响应失败:', error);
          reject(error);
        }
      },
      fail: (error) => {
        console.error('请求失败:', error);
        reject(new Error(error.errMsg || '网络请求失败'));
      }
    });
  });
};

module.exports = {
  request
}; 