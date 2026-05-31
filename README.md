# MiniMax API Connector for Operit

一个 Operit 沙盒包（Sandbox Package），提供 MiniMax 语言模型对话、模型查询和文字转语音（TTS）三大功能。

## 功能

| 工具 | 说明 |
|------|------|
| `chat_completion` | 向 MiniMax 语言模型发送对话请求（支持 M2.7/M2.5/M2.1 等系列） |
| `list_models` | 列出当前可用的 MiniMax 模型 |
| `text_to_speech` | 文字转语音，生成 MP3 音频文件（支持自定义 Voice ID） |

## 安装

1. 将 `minimax_api.js` 放入 Operit 的外部沙盒包目录：
   ```
   /storage/emulated/0/Android/data/com.ai.assistance.operit/files/packages/
   ```

2. 在 Operit 中配置环境变量 `MINIMAX_API_KEY`（必填）：
   - 到 [MiniMax 开放平台](https://platform.minimaxi.com) 注册并获取 API Key

3. （可选）如需语音功能，还需配置 `MINIMAX_VOICE_ID`：
   - 在 MiniMax 语音实验室创建音色，获取 Voice ID（形如 `ttv-voice-xxxxxxxx`）

4. 重启 Operit 或重新加载包即可使用。

## 环境变量

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `MINIMAX_API_KEY` | 是 | MiniMax 平台 API Key |
| `MINIMAX_API_BASE_URL` | 否 | API 基础地址，默认 `https://api.minimaxi.com` |
| `MINIMAX_VOICE_ID` | 否 | TTS 默认音色 ID |

## 使用示例

```
// 对话补全
use_package minimax_api
minimax_api:chat_completion
  model=MiniMax-M2.5
  messages=[{"role":"user","content":"你好"}]

// 文字转语音
minimax_api:text_to_speech
  text=你好世界
  voice_id=ttv-voice-xxxxxxxx
  speed=1.0
```

## 文件说明

| 文件 | 用途 |
|------|------|
| `minimax_api.js` | 编译后的沙盒包，直接导入 Operit 使用 |
| `minimax_api.ts` | TypeScript 源文件，供二次开发参考 |
| `README.md` | 本说明文档 |

## 注意事项

- 本包不包含任何 API Key，所有密钥通过环境变量配置
- TTS 音频为 MP3 格式，32000 Hz 采样率
- API 返回的音频数据为十六进制编码，包内已做自动检测解码

## 许可

MIT License
