const crypto = require('crypto');

// 生成 code_verifier
function generateCodeVerifier() {
  return crypto.randomBytes(32)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// 生成 code_challenge
function generateCodeChallenge(verifier) {
  const hash = crypto.createHash('sha256')
    .update(verifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return hash;
}

// 云函数入口函数
exports.main = async (event, context) => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  
  const clientId = '41074634095722780507411602908121.app.coze';
  const redirectUri = encodeURIComponent('YOUR_REDIRECT_URI');
  
  const authUrl = `https://kozi.example.com/oauth/authorize?` +
    `client_id=${clientId}&` +
    `redirect_uri=${redirectUri}&` +
    `response_type=code&` +
    `code_challenge=${codeChallenge}&` +
    `code_challenge_method=S256`;
    
  return {
    url: authUrl,
    codeVerifier // 需要保存用于后续交换 token
  }
} 