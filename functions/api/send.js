// Cloudflare Pages Functions - QQ Bot 推送服务
// 文件: functions/api/send.js

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // 获取消息内容参数
  const message = url.searchParams.get('msg') || url.searchParams.get('message') || 'Hello';
  
  // QQ Bot 配置
  const APP_ID = '1903783693';
  const APP_SECRET = 'rfIjy1rVxCE5jAPR';
  const USER_ID = '10165976'; // 改成你的QQ号
  
  try {
    // 1. 获取 access_token
    const tokenResp = await fetch('https://api.q.qq.com/cgi-bin/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credential',
        client_id: APP_ID,
        client_secret: APP_SECRET
      })
    });
    
    const tokenData = await tokenResp.json();
    
    if (!tokenData.access_token) {
      return new Response(JSON.stringify({ error: '获取token失败', detail: tokenData }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 2. 发送私聊消息
    const sendResp = await fetch('https://api.q.qq.com/cgi-bin/message/send', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`
      },
      body: JSON.stringify({
        userid: USER_ID,
        content: message
      })
    });
    
    const sendData = await sendResp.json();
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: '消息已发送',
      detail: sendData 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}