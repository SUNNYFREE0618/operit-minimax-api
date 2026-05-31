/*
METADATA
{
    "name": "minimax_api",
    "display_name": {
        "zh": "MiniMax API 连接器",
        "en": "MiniMax API Connector"
    },
    "description": {
        "zh": "通过 OpenAI 兼容接口连接 MiniMax 语言模型，支持对话补全和模型列表查询。需要配置 MINIMAX_API_KEY 环境变量。",
        "en": "Connect to MiniMax language models via OpenAI-compatible API. Supports chat completion and model listing. Requires MINIMAX_API_KEY."
    },
    "category": "Chat",
    "env": [
        {
            "name": "MINIMAX_API_KEY",
            "description": {
                "zh": "MiniMax 开放平台的 API Key，可在 platform.minimaxi.com 账户管理 > 接口密钥中获取",
                "en": "API Key from MiniMax platform, available at platform.minimaxi.com under Account > API Keys"
            },
            "required": true
        },
        {
            "name": "MINIMAX_API_BASE_URL",
            "description": {
                "zh": "API 基础地址，默认为 https://api.minimaxi.com",
                "en": "Base URL for the API, defaults to https://api.minimaxi.com"
            },
            "required": false
        },
        {
            "name": "MINIMAX_VOICE_ID",
            "description": {
                "zh": "MiniMax 音色设计生成的 Voice ID，用于文字转语音。可在 platform.minimaxi.com 语音实验室中获取",
                "en": "Voice ID generated from MiniMax Voice Design, used for text-to-speech. Available at platform.minimaxi.com under Voice Lab"
            },
            "required": false
        }
    ],
    "tools": [
        {
            "name": "chat_completion",
            "description": {
                "zh": "向 MiniMax 语言模型发送对话请求并获取回复。支持系统提示、多轮对话、角色设定，以及温度、top_p、最大 token 数等参数调节。",
                "en": "Send a chat completion request to MiniMax language models. Supports system prompts, multi-turn conversations, role settings, and parameter tuning like temperature, top_p, and max tokens."
            },
            "parameters": [
                {
                    "name": "model",
                    "description": {
                        "zh": "模型 ID。可选：MiniMax-M2.7（最新旗舰，约60tps）、MiniMax-M2.7-highspeed（M2.7极速版，约100tps）、MiniMax-M2.5（高性价比，约60tps）、MiniMax-M2.1（编程增强，约60tps）",
                        "en": "Model ID. Options: MiniMax-M2.7 (latest flagship, ~60tps), MiniMax-M2.7-highspeed (M2.7 fast, ~100tps), MiniMax-M2.5 (cost-effective, ~60tps), MiniMax-M2.1 (coding enhanced, ~60tps)"
                    },
                    "type": "string",
                    "required": true
                },
                {
                    "name": "messages",
                    "description": {
                        "zh": "对话消息列表，JSON 数组。每条消息含 role（system/user/assistant）和 content。支持 user_system、group、sample_message_user、sample_message_ai 等扩展角色",
                        "en": "List of conversation messages as JSON array. Each message has role (system/user/assistant) and content. Extended roles like user_system, group, sample_message_user, sample_message_ai are also supported"
                    },
                    "type": "string",
                    "required": true
                },
                {
                    "name": "temperature",
                    "description": {
                        "zh": "温度系数，控制输出随机性。取值范围 (0, 1]，默认 1.0。值越高输出越随机，越低越确定",
                        "en": "Temperature for randomness control. Range (0, 1], default 1.0. Higher = more random, lower = more deterministic"
                    },
                    "type": "number",
                    "required": false
                },
                {
                    "name": "top_p",
                    "description": {
                        "zh": "核采样参数，控制输出多样性。取值范围 (0, 1]，默认 0.95",
                        "en": "Nucleus sampling for diversity control. Range (0, 1], default 0.95"
                    },
                    "type": "number",
                    "required": false
                },
                {
                    "name": "max_tokens",
                    "description": {
                        "zh": "生成内容的最大 Token 数，上限 2048。超过会被截断",
                        "en": "Maximum tokens to generate, up to 2048. Exceeding content will be truncated"
                    },
                    "type": "integer",
                    "required": false
                },
                {
                    "name": "system_prompt",
                    "description": {
                        "zh": "系统提示词（快捷方式）。若提供，会自动作为 system 角色消息插入到对话开头。如果 messages 中已有 system 消息则忽略此参数",
                        "en": "System prompt shortcut. If provided, automatically inserted as a system message at the beginning. Ignored if messages already contain a system role message"
                    },
                    "type": "string",
                    "required": false
                }
            ]
        },
        {
            "name": "list_models",
            "description": {
                "zh": "列出当前可用的 MiniMax 语言模型及其基本信息（名称、速度、适用场景）",
                "en": "List available MiniMax language models with basic info (name, speed, use cases)"
            },
            "parameters": []
        },
        {
            "name": "text_to_speech",
            "description": {
                "zh": "使用 MiniMax 语音合成 API 将文字转换为语音。支持自定义 Voice ID（音色设计）、语速、音量和输出格式。生成的音频默认保存为 MP3 文件。",
                "en": "Convert text to speech using MiniMax TTS API. Supports custom Voice ID (voice design), speed, volume, and output format. Generated audio saved as MP3 by default."
            },
            "parameters": [
                {
                    "name": "text",
                    "description": {
                        "zh": "要转换为语音的文本内容。支持中英文混合，建议单次不超过 1000 字",
                        "en": "Text content to convert to speech. Supports mixed Chinese and English, recommended max 1000 characters per request"
                    },
                    "type": "string",
                    "required": true
                },
                {
                    "name": "voice_id",
                    "description": {
                        "zh": "音色 ID。来自 MiniMax 音色设计生成的 Voice ID，如 ttv-voice-xxxxxxxx。若留空则使用环境变量 MINIMAX_VOICE_ID 的值",
                        "en": "Voice ID from MiniMax Voice Design, e.g. ttv-voice-xxxxxxxx. Falls back to MINIMAX_VOICE_ID env var if empty"
                    },
                    "type": "string",
                    "required": false
                },
                {
                    "name": "model",
                    "description": {
                        "zh": "语音合成模型。可选：speech-01-turbo（推荐，速度快）、speech-02-turbo（效果更自然）。默认 speech-01-turbo",
                        "en": "TTS model. Options: speech-01-turbo (recommended, fast), speech-02-turbo (more natural). Default speech-01-turbo"
                    },
                    "type": "string",
                    "required": false
                },
                {
                    "name": "speed",
                    "description": {
                        "zh": "语速。取值范围 0.5～2.0，1.0 为正常语速。默认 1.0",
                        "en": "Speech speed. Range 0.5~2.0, 1.0 is normal. Default 1.0"
                    },
                    "type": "number",
                    "required": false
                },
                {
                    "name": "volume",
                    "description": {
                        "zh": "音量倍数。取值范围 0.1～3.0，1.0 为正常音量。默认 1.0",
                        "en": "Volume multiplier. Range 0.1~3.0, 1.0 is normal. Default 1.0"
                    },
                    "type": "number",
                    "required": false
                },
                {
                    "name": "save_path",
                    "description": {
                        "zh": "保存语音文件的路径。默认为 /sdcard/Download/minimax_tts_output.mp3",
                        "en": "Path to save the audio file. Default /sdcard/Download/minimax_tts_output.mp3"
                    },
                    "type": "string",
                    "required": false
                }
            ]
        }
    ]
}
*/

/// <reference path="../types/index.d.ts" />

const minimaxApi = (function () {
    // ========== 常量 ==========
    const DEFAULT_BASE_URL = "https://api.minimaxi.com";
    const CHAT_ENDPOINT = "/v1/chat/completions";
    const TTS_ENDPOINT = "/v1/t2a_v2";
    const DEFAULT_TTS_MODEL = "speech-01-turbo";
    const DEFAULT_TTS_SAVE_PATH = "/sdcard/Download/minimax_tts_output.mp3";
    const TIMEOUT_MS = 120000; // 2 分钟超时

    // ========== 可用模型信息 ==========
    const AVAILABLE_MODELS: Record<string, { name: string; speed: string; description: string; contextTokens: number }> = {
        "MiniMax-M2.7": {
            name: "MiniMax-M2.7",
            speed: "~60 tps",
            description: "最新旗舰模型，开启自我迭代，强工程与 Coding 能力，复杂 Office 自动化",
            contextTokens: 204800
        },
        "MiniMax-M2.7-highspeed": {
            name: "MiniMax-M2.7-highspeed",
            speed: "~100 tps",
            description: "M2.7 极速版，效果不变，速度大幅提升",
            contextTokens: 204800
        },
        "MiniMax-M2.5": {
            name: "MiniMax-M2.5",
            speed: "~60 tps",
            description: "顶尖性能与极致性价比，轻松驾驭复杂任务",
            contextTokens: 204800
        },
        "MiniMax-M2.5-highspeed": {
            name: "MiniMax-M2.5-highspeed",
            speed: "~100 tps",
            description: "M2.5 极速版，效果不变，更快更敏捷",
            contextTokens: 204800
        },
        "MiniMax-M2.1": {
            name: "MiniMax-M2.1",
            speed: "~60 tps",
            description: "强大多语言编程能力，全面升级编程体验",
            contextTokens: 204800
        },
        "MiniMax-M2.1-highspeed": {
            name: "MiniMax-M2.1-highspeed",
            speed: "~100 tps",
            description: "M2.1 极速版，效果不变，更快更敏捷",
            contextTokens: 204800
        }
    };

    /**
     * 获取 Voice ID，优先级：参数 > 环境变量
     */
    function getVoiceId(): string {
        const envVoiceId = Tools.SoftwareSettings?.getString?.("MINIMAX_VOICE_ID", "");
        if (envVoiceId && envVoiceId.trim()) return envVoiceId.trim();
        return "";
    }

    /**
     * 保存音频数据到文件
     * MiniMax T2A v2 API 返回的 data.audio 是十六进制字符串（非标准 Base64）
     * 本函数自动检测格式并正确解码：
     *   - 如果字符串只含 0-9a-fA-F 且长度为偶数 → 按 hex 解码
     *   - 如果包含 data:audio/...;base64, 前缀 → 去前缀后按 Base64 解码
     *   - 否则 → 按 Base64 解码
     */
    function saveBase64Audio(audioData: string, savePath: string): string {
        let cleaned = audioData;

        // 步骤1: 清洗可能的 Data URL 前缀
        const prefixMatch = cleaned.match(/^data:audio\/[^;]*;base64,/);
        if (prefixMatch) {
            cleaned = cleaned.substring(prefixMatch[0].length);
            console.log("[minimax_api] 检测到 Data URL 前缀，已自动去除");
        }

        // 步骤2: 检测是否为十六进制字符串
        let bytes: number[];
        const isHexString = /^[0-9a-fA-F]+$/.test(cleaned) && cleaned.length % 2 === 0;
        if (isHexString) {
            console.log("[minimax_api] 检测到十六进制字符串，按 hex 解码 (长度=" + cleaned.length + ")");
            bytes = new Array(cleaned.length / 2);
            for (let i = 0; i < cleaned.length; i += 2) {
                bytes[i / 2] = parseInt(cleaned.substring(i, i + 2), 16);
            }
        } else {
            console.log("[minimax_api] 按 Base64 解码 (长度=" + cleaned.length + ")");
            bytes = Java.android.util.Base64.decode(cleaned, Java.android.util.Base64.NO_WRAP);
        }

        const file = new Java.java.io.File(savePath);
        const parentDir = file.getParentFile();
        if (parentDir && !parentDir.exists()) {
            parentDir.mkdirs();
        }
        const fos = new Java.java.io.FileOutputStream(file);
        fos.write(bytes);
        fos.close();
        return savePath;
    }

    // ========== 辅助函数 ==========

    /**
     * 获取 API Key，优先级：参数 > 环境变量
     */
    function getApiKey(): string {
        const envKey = Tools.SoftwareSettings?.getString?.("MINIMAX_API_KEY", "");
        if (envKey && envKey.trim()) return envKey.trim();
        throw new Error("未配置 MINIMAX_API_KEY。请在环境变量中设置您的 MiniMax API Key");
    }

    /**
     * 获取 API Base URL，默认 https://api.minimaxi.com
     */
    function getApiBaseUrl(): string {
        const envUrl = Tools.SoftwareSettings?.getString?.("MINIMAX_API_BASE_URL", "");
        if (envUrl && envUrl.trim()) {
            const url = envUrl.trim();
            return url.endsWith("/") ? url.slice(0, -1) : url;
        }
        return DEFAULT_BASE_URL;
    }

    /**
     * 构建 OkHttp 客户端
     */
    function buildClient(): any {
        const OkHttpClient = Java.okhttp3.OkHttpClient;
        if (!OkHttpClient) {
            throw new Error("OkHttp 不可用，无法发起网络请求");
        }
        const builder = new OkHttpClient.Builder();
        builder.connectTimeout(TIMEOUT_MS, Java.java.util.concurrent.TimeUnit.MILLISECONDS);
        builder.readTimeout(TIMEOUT_MS, Java.java.util.concurrent.TimeUnit.MILLISECONDS);
        builder.writeTimeout(TIMEOUT_MS, Java.java.util.concurrent.TimeUnit.MILLISECONDS);
        return builder.build();
    }

    /**
     * 发送 HTTP POST 请求
     */
    function httpPost(url: string, jsonBody: string, headers: Record<string, string>): string {
        const client = buildClient();
        const MediaType = Java.okhttp3.MediaType.parse("application/json; charset=utf-8");
        const RequestBody = Java.okhttp3.RequestBody.create(MediaType, jsonBody);
        
        const requestBuilder = new Java.okhttp3.Request.Builder();
        requestBuilder.url(url);
        requestBuilder.post(RequestBody);

        for (const key of Object.keys(headers)) {
            requestBuilder.addHeader(key, headers[key]);
        }

        const request = requestBuilder.build();
        const call = client.newCall(request);
        const response = call.execute();

        if (!response.isSuccessful()) {
            const code = response.code();
            const body = response.body() ? response.body().string() : "(empty)";
            throw new Error(`HTTP ${code}: ${body}`);
        }

        const responseBody = response.body();
        if (!responseBody) {
            throw new Error("响应体为空");
        }
        return responseBody.string();
    }

    /**
     * 构建 messages 数组，处理 system_prompt 快捷参数
     */
    function buildMessages(messagesJson: string, systemPrompt?: string): any[] {
        let messages: any[];
        try {
            messages = JSON.parse(messagesJson);
        } catch (e) {
            throw new Error(`messages 参数不是有效的 JSON 数组: ${e.message}`);
        }

        if (!Array.isArray(messages)) {
            throw new Error("messages 参数必须是一个 JSON 数组");
        }

        // 如果有 system_prompt 且 messages 中没有 system 角色，则插入
        if (systemPrompt && systemPrompt.trim()) {
            const hasSystem = messages.some(
                (m: any) => m && m.role === "system"
            );
            if (!hasSystem) {
                messages.unshift({ role: "system", content: systemPrompt.trim() });
            }
        }

        return messages;
    }

    /**
     * 解析 MiniMax API 响应
     */
    function parseResponse(responseText: string): any {
        let resp: any;
        try {
            resp = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`无法解析 API 响应 JSON: ${e.message}\n原始响应: ${responseText.substring(0, 500)}`);
        }

        // 检查 base_resp 状态
        if (resp.base_resp) {
            const statusCode = resp.base_resp.status_code;
            if (statusCode !== 0) {
                const statusMsg = resp.base_resp.status_msg || "未知错误";
                const errorMap: Record<number, string> = {
                    1000: "未知错误",
                    1001: "请求超时",
                    1002: "触发限流",
                    1004: "鉴权失败 - 请检查 API Key 是否正确",
                    1008: "余额不足",
                    1013: "服务内部错误",
                    1027: "输出内容违规",
                    1039: "Token 超出限制",
                    2013: "参数错误"
                };
                const hint = errorMap[statusCode] || `错误码 ${statusCode}`;
                throw new Error(`MiniMax API 返回错误: ${hint} - ${statusMsg}`);
            }
        }

        // 提取回复内容
        const choices = resp.choices;
        if (!choices || !Array.isArray(choices) || choices.length === 0) {
            // 可能是输入敏感违规（无 choices 但有 input_sensitive）
            if (resp.input_sensitive) {
                throw new Error("输入内容触发了 MiniMax 的安全审核，请修改输入后重试");
            }
            throw new Error(`API 响应中没有 choices 数组\n响应: ${responseText.substring(0, 500)}`);
        }

        const firstChoice = choices[0];
        const finishReason = firstChoice.finish_reason || "unknown";
        let content = "";
        if (firstChoice.message && firstChoice.message.content) {
            content = firstChoice.message.content;
        }

        // 构建返回
        const result: any = {
            success: true,
            content: content,
            finish_reason: finishReason,
            model: resp.model || "unknown",
            id: resp.id || ""
        };

        // 附加 token 使用统计
        if (resp.usage) {
            result.usage = {
                prompt_tokens: resp.usage.prompt_tokens || 0,
                completion_tokens: resp.usage.completion_tokens || 0,
                total_tokens: resp.usage.total_tokens || 0
            };
            if (resp.usage.prompt_tokens_details && resp.usage.prompt_tokens_details.cached_tokens > 0) {
                result.usage.cached_tokens = resp.usage.prompt_tokens_details.cached_tokens;
            }
        }

        // 安全审核标记
        if (resp.input_sensitive !== undefined) result.input_sensitive = resp.input_sensitive;
        if (resp.output_sensitive !== undefined) result.output_sensitive = resp.output_sensitive;

        return result;
    }

    // ========== 工具实现 ==========

    /**
     * chat_completion - 对话补全
     */
    async function chat_completion(params: {
        model: string;
        messages: string;
        temperature?: number;
        top_p?: number;
        max_tokens?: number;
        system_prompt?: string;
    }): Promise<any> {
        const { model, messages: messagesJson, temperature, top_p, max_tokens, system_prompt } = params;

        // 校验必填参数
        if (!model || !model.trim()) {
            return { success: false, message: "model 参数是必填的" };
        }
        if (!messagesJson || !messagesJson.trim()) {
            return { success: false, message: "messages 参数是必填的" };
        }

        // 构建 messages
        let messages: any[];
        try {
            messages = buildMessages(messagesJson, system_prompt);
        } catch (e) {
            return { success: false, message: `messages 参数错误: ${e.message}` };
        }

        // 构建请求体
        const requestBody: any = {
            model: model.trim(),
            messages: messages
        };

        if (temperature !== undefined && temperature !== null) {
            if (temperature <= 0 || temperature > 1) {
                return { success: false, message: "temperature 取值范围为 (0, 1]" };
            }
            requestBody.temperature = temperature;
        }

        if (top_p !== undefined && top_p !== null) {
            if (top_p <= 0 || top_p > 1) {
                return { success: false, message: "top_p 取值范围为 (0, 1]" };
            }
            requestBody.top_p = top_p;
        }

        if (max_tokens !== undefined && max_tokens !== null) {
            if (max_tokens < 1 || max_tokens > 2048) {
                return { success: false, message: "max_tokens 取值范围为 [1, 2048]" };
            }
            requestBody.max_completion_tokens = max_tokens;
        }

        const apiKey = getApiKey();
        const baseUrl = getApiBaseUrl();
        const url = baseUrl + CHAT_ENDPOINT;

        console.log(`[minimax_api] 请求模型: ${model}`);
        console.log(`[minimax_api] 消息数: ${messages.length}`);
        console.log(`[minimax_api] 请求参数: temperature=${requestBody.temperature ?? '默认'}, top_p=${requestBody.top_p ?? '默认'}, max_tokens=${requestBody.max_completion_tokens ?? '默认'}`);

        let responseText: string;
        try {
            responseText = httpPost(url, JSON.stringify(requestBody), {
                "Authorization": "Bearer " + apiKey,
                "Content-Type": "application/json"
            });
        } catch (e) {
            console.error(`[minimax_api] HTTP 请求失败: ${e.message}`);
            return { success: false, message: `网络请求失败: ${e.message}` };
        }

        return parseResponse(responseText);
    }

    /**
     * list_models - 列出可用模型
     */
    async function list_models(): Promise<any> {
        const models = Object.keys(AVAILABLE_MODELS).map(key => {
            const m = AVAILABLE_MODELS[key];
            return {
                id: m.name,
                speed: m.speed,
                description: m.description,
                context_tokens: m.contextTokens
            };
        });

        return {
            success: true,
            models: models,
            total: models.length,
            note: "所有模型均支持 204800 token 上下文窗口。带 -highspeed 后缀的模型在效果不变的前提下提供更高输出速度（约100tps vs 60tps）。"
        };
    }

    /**
     * text_to_speech - 文字转语音
     * 调用 MiniMax T2A V2 API，将文字合成为语音并保存为本地音频文件。
     */
    async function text_to_speech(params: {
        text: string;
        voice_id?: string;
        model?: string;
        speed?: number;
        volume?: number;
        save_path?: string;
    }): Promise<any> {
        const { text, voice_id, model, speed, volume, save_path } = params;

        // 校验必填参数
        if (!text || !text.trim()) {
            return { success: false, message: "text 参数是必填的" };
        }
        if (text.length > 3000) {
            return { success: false, message: "text 参数过长，建议单次不超过 3000 字符" };
        }

        // 获取 Voice ID
        const voiceId = voice_id?.trim() || getVoiceId();
        if (!voiceId) {
            return { success: false, message: "Voice ID 未设置。请在参数中提供 voice_id 或设置环境变量 MINIMAX_VOICE_ID" };
        }

        // 校验参数范围
        const ttsModel = model?.trim() || DEFAULT_TTS_MODEL;
        const ttsSpeed = speed !== undefined && speed !== null ? speed : 1.0;
        const ttsVolume = volume !== undefined && volume !== null ? volume : 1.0;
        const ttsSavePath = save_path?.trim() || DEFAULT_TTS_SAVE_PATH;

        if (ttsSpeed < 0.5 || ttsSpeed > 2.0) {
            return { success: false, message: "speed 取值范围为 [0.5, 2.0]" };
        }
        if (ttsVolume < 0.1 || ttsVolume > 3.0) {
            return { success: false, message: "volume 取值范围为 [0.1, 3.0]" };
        }

        // 构建请求体
        const requestBody = {
            model: ttsModel,
            text: text.trim(),
            voice_setting: {
                voice_id: voiceId,
                speed: ttsSpeed,
                vol: ttsVolume
            },
            audio_setting: {
                sample_rate: 32000,
                bitrate: 128000,
                format: "mp3",
                channel: 1
            }
        };

        const apiKey = getApiKey();
        const baseUrl = getApiBaseUrl();
        const url = baseUrl + TTS_ENDPOINT;

        console.log(`[minimax_api] TTS 请求 -> ${url}`);
        console.log(`[minimax_api] TTS 模型: ${ttsModel}, Voice ID: ${voiceId}, 文本长度: ${text.length}`);

        let responseText: string;
        try {
            responseText = httpPost(url, JSON.stringify(requestBody), {
                "Authorization": "Bearer " + apiKey,
                "Content-Type": "application/json"
            });
        } catch (e) {
            console.error(`[minimax_api] TTS HTTP 请求失败: ${e.message}`);
            return { success: false, message: `网络请求失败: ${e.message}` };
        }

        // 解析响应
        let resp: any;
        try {
            resp = JSON.parse(responseText);
        } catch (e) {
            return { success: false, message: `无法解析 TTS 响应 JSON: ${e.message}` };
        }

        // 检查 base_resp
        if (resp.base_resp) {
            const statusCode = resp.base_resp.status_code;
            if (statusCode !== 0) {
                const statusMsg = resp.base_resp.status_msg || "未知错误";
                const errorMap: Record<number, string> = {
                    1000: "未知错误",
                    1001: "请求超时",
                    1002: "触发限流",
                    1004: "鉴权失败 - 请检查 API Key",
                    1013: "服务内部错误",
                    2013: "参数错误"
                };
                const hint = errorMap[statusCode] || `错误码 ${statusCode}`;
                return { success: false, message: `MiniMax TTS API 返回错误: ${hint} - ${statusMsg}` };
            }
        }

        // 提取 Base64 音频数据
        const audioData = resp.data?.audio || resp.audio;
        if (!audioData || typeof audioData !== "string") {
            return {
                success: false,
                message: "MiniMax API 未返回音频数据",
                raw_response_keys: Object.keys(resp)
            };
        }

        // 保存到文件
        let savedPath: string;
        try {
            savedPath = saveBase64Audio(audioData, ttsSavePath);
        } catch (e) {
            return { success: false, message: `保存音频文件失败: ${e.message}` };
        }

        const file = new Java.java.io.File(savedPath);
        const fileSizeKB = file.exists() ? (file.length() / 1024).toFixed(1) : "0.0";

        console.log(`[minimax_api] TTS 音频已保存: ${savedPath} (${fileSizeKB} KB)`);

        return {
            success: true,
            file_path: savedPath,
            file_size_kb: parseFloat(fileSizeKB),
            format: "mp3",
            sample_rate: 32000,
            model: ttsModel,
            voice_id: voiceId,
            text_length: text.length
        };
    }

    // ========== 包装器与导出 ==========

    async function wrapToolExecution(func: (params: any) => Promise<any>, params: any): Promise<any> {
        try {
            return await func(params);
        } catch (error) {
            console.error(`[minimax_api] 工具执行异常: ${error.message}`);
            return {
                success: false,
                message: `工具执行时发生意外错误: ${error.message}`
            };
        }
    }

    return {
        chat_completion: (params: any) => wrapToolExecution(chat_completion, params),
        list_models: () => wrapToolExecution(list_models, undefined),
        text_to_speech: (params: any) => wrapToolExecution(text_to_speech, params)
    };
})();

exports.chat_completion = minimaxApi.chat_completion;
exports.list_models = minimaxApi.list_models;
exports.text_to_speech = minimaxApi.text_to_speech;
