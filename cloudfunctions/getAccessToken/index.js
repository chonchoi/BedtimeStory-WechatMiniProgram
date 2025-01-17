const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  const { code, codeVerifier } = event
  
  try {
    const result = await cloud.httpclient.request(
      'https://kozi.example.com/oauth/token',
      {
        method: 'POST',
        data: {
          client_id: '41074634095722780507411602908121.app.coze',
          code: code,
          code_verifier: codeVerifier,
          grant_type: 'authorization_code',
          redirect_uri: 'YOUR_REDIRECT_URI'
        },
        dataType: 'json'
      }
    )
    
    return result.data
  } catch (err) {
    console.error(err)
    return err
  }
} 