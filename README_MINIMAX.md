# 🚀 MiniMax-Powered Bolt.diy

**AI-Powered Full-Stack Development with MiniMax Intelligence**

This is a modified version of [Bolt.diy](https://github.com/stackblitz-labs/bolt.diy) with **complete MiniMax API integration**. Build full-stack applications using MiniMax's powerful AI models with 1M token context windows.

## 🤖 Available MiniMax Models

| Model | Context Window | Output Tokens | Best For |
|-------|---------------|---------------|----------|
| **MiniMax-M1** | 1M tokens | 8,192 | Complex reasoning, multi-step analysis, detailed code generation |
| **MiniMax-Text-01** | 1M tokens | 2,048 | General coding, text generation, quick responses |

## 🚀 Quick Start

### 1. Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### 2. Get MiniMax API Key
Visit [MiniMax Developer Platform](https://www.minimax.io/platform/app-setting/api-key) to:
- Create account or sign in
- Generate API key from API Keys section  
- Copy your API key (starts with `sk-`)

### 3. Configure MiniMax
1. Open the application at `http://localhost:5173`
2. Select **MiniMax** from the provider dropdown
3. Click the pencil (edit) icon
4. Enter your MiniMax API key
5. Choose your preferred model (M1 or Text-01)

### 4. Start Building!
Create full-stack applications, React/Vue projects, Node.js backends, and more with MiniMax's powerful AI assistance.

## 🔧 What's New in This Version

### Added Files:
- `app/lib/modules/llm/providers/minimax.ts` - MiniMax provider implementation
- `public/icons/MiniMax.svg` - MiniMax provider icon

### Modified Files:
- `app/lib/modules/llm/registry.ts` - Added MiniMax to provider registry
- `.env.example` - Added MiniMax API key configuration

## 🌐 Deployment

### Cloudflare Pages (Recommended)
```bash
pnpm run build
pnpm run deploy
```

### Other Platforms
Deploy to any Node.js hosting platform:
- **Vercel**: Connect GitHub repo and deploy
- **Netlify**: Use Netlify CLI or web interface
- **Railway/Render**: Deploy with Node.js runtime

## 🌟 Features

✅ **Full MiniMax Integration** - Complete provider implementation
✅ **1M Token Context** - Massive context windows for complex projects
✅ **OpenAI SDK Compatible** - Seamless integration with existing architecture
✅ **Dynamic Model Discovery** - Automatic detection of available models
✅ **All Bolt.diy Features** - WebContainer, file operations, terminal, deployments

## 🔗 Links

- **MiniMax API Documentation**: https://www.minimax.io/platform/document/ChatCompletion%20v2
- **Get API Key**: https://www.minimax.io/platform/app-setting/api-key  
- **Original Bolt.diy**: https://github.com/stackblitz-labs/bolt.diy

## 📞 Support

If you encounter issues:
1. Verify your MiniMax API key is correct
2. Check account has sufficient credits
3. Ensure model names are exact (case-sensitive)
4. Review browser console for error messages

---

**Build amazing applications with MiniMax-powered Bolt.diy!** 🎨⚡️
