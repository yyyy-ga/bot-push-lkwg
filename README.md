# QQ Bot 消息推送 - Cloudflare Pages Functions Demo

## 项目结构

```
qq-bot-push/
├── functions/
│   └── api/
│       └── send.js      # GET 请求处理函数
└── README.md
```

## 使用方法

### 1. 修改配置

打开 `functions/api/send.js`，修改以下内容：

```javascript
const USER_ID = '你的QQ号';  // 改成你的QQ号
```

### 2. 部署到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 Pages → 创建项目 → 直接上传
3. 上传整个 `qq-bot-push` 文件夹
4. 部署完成后会得到一个域名，例如：`https://xxx.pages.dev`

### 3. 使用方式

发送 GET 请求即可推送消息：

```
https://你的域名/api/send?msg=Hello World
```

或者：

```
https://你的域名/api/send?message=你好
```

### 4. 响应示例

成功：
```json
{"success": true, "message": "消息已发送"}
```

失败：
```json
{"error": "错误信息"}
```

## 测试命令

```bash
# Linux/Mac
curl "https://你的域名/api/send?msg=测试消息"

# Windows PowerShell
curl.exe "https://你的域名/api/send?msg=测试消息"
```

## 注意事项

- 每次请求都会获取新的 access_token（简单但不高效，生产环境可缓存 token）
- 如果发送失败，请检查 `USER_ID` 是否正确
- QQ bot 需要开通发送消息权限