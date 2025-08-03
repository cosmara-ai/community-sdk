# COSMARA Community SDK

[![NPM Version](https://img.shields.io/npm/v/@cosmara-ai/community-sdk)](https://www.npmjs.com/package/@cosmara-ai/community-sdk)
[![Monthly Downloads](https://img.shields.io/npm/dm/@cosmara-ai/community-sdk)](https://www.npmjs.com/package/@cosmara-ai/community-sdk)
[![License](https://img.shields.io/github/license/cosmara-ai/community-sdk)](https://github.com/cosmara-ai/community-sdk/blob/main/LICENSE)

A powerful TypeScript SDK for multi-provider AI integration with **1,000 free requests per month**. Easily switch between OpenAI, Anthropic, and Google AI with a unified interface.

> 🚀 **Ready for more?** Upgrade to [Developer tier](https://cosmara.dev/pricing) for 50x more requests, ML-powered routing, and commercial licensing!

## 🎯 Community Edition Features

- ✅ **Multi-Provider Support**: OpenAI, Anthropic (Claude), Google (Gemini)
- ✅ **Unified Interface**: Same API across all providers
- ✅ **TypeScript Support**: Full type safety and IntelliSense
- ✅ **Streaming Support**: Real-time response streaming
- ✅ **Usage Tracking**: Monitor your request limits
- ✅ **Basic Caching**: Simple response caching
- ✅ **Cost Estimation**: Track spending across providers

## 🚧 Community Edition Limitations

| Feature | Community | Developer | Professional |
|---------|-----------|-----------|--------------|
| Requests/Month | 1,000 | 50,000 | 500,000 |
| ML-Powered Routing | ❌ | ✅ | ✅ |
| Advanced Analytics | ❌ | ✅ | ✅ |
| Intelligent Fallbacks | ❌ | ✅ | ✅ |
| Commercial Use | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ✅ | ✅ |

## 📦 Installation

```bash
npm install @cosmara-ai/community-sdk
# or
yarn add @cosmara-ai/community-sdk
# or
pnpm add @cosmara-ai/community-sdk
```

## 🚀 Quick Start

```typescript
import { createClient } from '@cosmara-ai/community-sdk';

const client = createClient({
  apiKeys: {
    openai: 'your-openai-api-key',
    anthropic: 'your-anthropic-api-key',
    google: 'your-google-api-key',
  },
});

// Simple chat completion
const response = await client.chat({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'user', content: 'Hello, world!' }
  ],
});

console.log(response.choices[0].message.content);
```

## 💼 Usage Examples

### Basic Chat Completion

```typescript
import { createClient, APIProvider } from '@cosmara-ai/community-sdk';

const client = createClient({
  apiKeys: {
    openai: process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    google: process.env.GOOGLE_API_KEY,
  },
});

// Let the SDK pick a provider randomly
const response = await client.chat({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain quantum computing in simple terms.' }
  ],
  maxTokens: 500,
  temperature: 0.7,
});

console.log(response.choices[0].message.content);
```

### Manual Provider Selection

```typescript
// Force specific provider
const response = await client.chat({
  model: 'claude-3-haiku-20240307',
  messages: [{ role: 'user', content: 'Hello!' }],
}, {
  provider: APIProvider.ANTHROPIC
});
```

### Streaming Responses

```typescript
const stream = client.chatStream({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Write a short story' }],
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}
```

### Cost Estimation

```typescript
// Get cost estimates for all providers
const estimates = await client.estimateCost({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Analyze this data...' }],
  maxTokens: 1000,
});

console.log('Cost estimates:', estimates);
// Output: [{ provider: 'GOOGLE', cost: 0.002 }, { provider: 'OPENAI', cost: 0.03 }]
```

### Usage Monitoring

```typescript
// Check your current usage
const stats = client.getUsageStats();
console.log('Requests this month:', stats.requestsThisMonth);
console.log('Remaining requests:', 1000 - stats.requestsThisMonth);

if (stats.validation.violations.length > 0) {
  console.log('Usage violations:', stats.validation.violations);
  console.log('Upgrade recommended:', stats.upgradeMessage);
}
```

### Multi-Provider Model Selection

```typescript
import { MODEL_EQUIVALENTS } from '@cosmara-ai/community-sdk';

// Use equivalent models across providers
const smallModel = MODEL_EQUIVALENTS['chat-small'];
// { OPENAI: 'gpt-3.5-turbo', ANTHROPIC: 'claude-3-haiku-20240307', GOOGLE: 'gemini-1.5-flash' }

const response = await client.chat({
  model: smallModel[APIProvider.GOOGLE], // Uses Gemini Flash
  messages: [{ role: 'user', content: 'Quick question...' }],
});
```

## 📊 Supported Models

### OpenAI
- `gpt-3.5-turbo` - Fast and cost-effective
- `gpt-4` - Most capable reasoning
- `gpt-4o-mini` - Efficient and affordable

### Anthropic
- `claude-3-haiku-20240307` - Fast and cost-effective
- `claude-sonnet-4-20250514` - Balanced performance
- `claude-3-opus-20240229` - Most capable

### Google AI
- `gemini-1.5-flash` - Fast and efficient
- `gemini-1.5-pro` - High-performance reasoning

## ⚡ Rate Limits & Quotas

### Community Edition Limits
- **1,000 requests/month** - Perfect for learning and small projects
- **100 requests/day** - Sustainable daily usage
- **10 requests/minute** - Prevents API abuse
- **10 unique users max** - Personal/educational use only

### When You Hit Limits
```typescript
try {
  const response = await client.chat(request);
} catch (error) {
  if (error.code === 'RATE_LIMIT_MONTHLY') {
    console.log('Monthly limit reached!');
    console.log('Upgrade for 50x more requests:', error.details.upgradeUrl);
  }
}
```

## 🔧 Configuration Options

```typescript
const client = createClient({
  // Required: At least one API key
  apiKeys: {
    openai: 'sk-...',
    anthropic: 'sk-ant-...',
    google: 'AIza...',
  },
  
  // Optional: Custom base URLs
  baseUrls: {
    openai: 'https://api.openai.com/v1',
    anthropic: 'https://api.anthropic.com/v1',
    google: 'https://generativelanguage.googleapis.com/v1beta',
  },
  
  // Optional: Usage tracking
  enableUsageTracking: true, // default: true
  userId: 'unique-user-id', // default: auto-generated
});
```

## 🛡️ Error Handling

```typescript
import { AIError } from '@cosmara-ai/community-sdk';

try {
  const response = await client.chat(request);
} catch (error) {
  if (error instanceof AIError) {
    switch (error.type) {
      case 'authentication':
        console.log('Invalid API key:', error.message);
        break;
      case 'rate_limit':
        console.log('Rate limit hit:', error.message);
        break;
      case 'usage_limit':
        console.log('Usage limit exceeded:', error.message);
        console.log('Upgrade URL:', error.details.upgradeUrl);
        break;
      case 'invalid_request':
        console.log('Invalid request:', error.message);
        break;
      default:
        console.log('API error:', error.message);
    }
  }
}
```

## 🎓 Migration from Other SDKs

### From OpenAI SDK
```typescript
// Before (OpenAI SDK)
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: 'sk-...' });
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello' }],
});

// After (COSMARA SDK)
import { createClient } from '@cosmara-ai/community-sdk';
const client = createClient({ apiKeys: { openai: 'sk-...' } });
const response = await client.chat({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello' }],
});
```

### From Anthropic SDK
```typescript
// Before (Anthropic SDK)
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({ apiKey: 'sk-ant-...' });
const response = await anthropic.messages.create({
  model: 'claude-3-haiku-20240307',
  messages: [{ role: 'user', content: 'Hello' }],
  max_tokens: 100,
});

// After (COSMARA SDK)
import { createClient } from '@cosmara-ai/community-sdk';
const client = createClient({ apiKeys: { anthropic: 'sk-ant-...' } });
const response = await client.chat({
  model: 'claude-3-haiku-20240307',
  messages: [{ role: 'user', content: 'Hello' }],
  maxTokens: 100,
});
```

## 🔄 Upgrade Path

### Why Upgrade to Developer Tier?

#### 🚀 50x More Requests
- **Community**: 1,000 requests/month
- **Developer**: 50,000 requests/month
- **Perfect for**: Production apps, heavy development

#### 🧠 ML-Powered Routing
```typescript
// Community: Random provider selection
const response = await client.chat(request); // Random provider

// Developer: Intelligent routing based on:
// - Cost optimization
// - Response time
// - Model capabilities
// - Current provider availability
const response = await client.chat(request, {
  optimizeFor: 'cost' // or 'speed', 'quality', 'balanced'
});
```

#### 📊 Advanced Analytics
```typescript
// Community: Basic usage stats
const stats = client.getUsageStats();

// Developer: Full analytics dashboard
const analytics = await client.getAnalytics({
  timeRange: 'last-30-days',
  groupBy: 'provider',
  includeMetrics: ['cost', 'latency', 'success-rate']
});
```

#### 🔄 Intelligent Fallbacks
```typescript
// Community: Single provider, manual retry
try {
  const response = await client.chat(request);
} catch (error) {
  // Manual fallback logic required
}

// Developer: Automatic intelligent fallbacks
const response = await client.chat(request, {
  fallbackEnabled: true,
  fallbackOrder: ['GOOGLE', 'ANTHROPIC', 'OPENAI']
});
```

### Upgrade Process

1. **Visit**: [https://cosmara.dev/pricing](https://cosmara.dev/pricing)
2. **Choose**: Developer tier ($49/month)
3. **Migrate**: Use migration assistant
4. **Deploy**: Zero downtime upgrade

```bash
# Install Developer SDK
npm install @cosmara-ai/sdk-developer

# Migration helper
npx @cosmara-ai/migrate-from-community
```

## 🛠️ Advanced Usage

### Custom User IDs
```typescript
const client = createClient({
  apiKeys: { openai: 'sk-...' },
  userId: 'user-123', // Track usage per user
});

const response = await client.chat(request, {
  userId: 'different-user-456' // Override per request
});
```

### Disable Usage Tracking
```typescript
const client = createClient({
  apiKeys: { openai: 'sk-...' },
  enableUsageTracking: false, // Disable for privacy
});
```

### Clear Cache
```typescript
// Clear response cache
client.clearCache();
```

## 📝 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  AIRequest,
  AIResponse,
  AIModel,
  APIProvider,
  CommunityConfig,
  UsageRecord,
} from '@cosmara-ai/community-sdk';

// Type-safe configuration
const config: CommunityConfig = {
  apiKeys: {
    openai: process.env.OPENAI_API_KEY,
  },
};

// Type-safe request
const request: AIRequest = {
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Hello' }],
  temperature: 0.7,
  maxTokens: 100,
};
```

## 🧪 Testing

```typescript
// Mock for testing
jest.mock('@cosmara-ai/community-sdk', () => ({
  createClient: () => ({
    chat: jest.fn().mockResolvedValue({
      choices: [{ message: { content: 'Mocked response' } }],
    }),
  }),
}));
```

## 🤝 Community & Support

### Community Edition Support
- **Documentation**: [https://docs.cosmara.dev](https://docs.cosmara.dev)
- **GitHub Issues**: [Report bugs and request features](https://github.com/cosmara-ai/community-sdk/issues)
- **Discord**: [Join our community](https://discord.gg/cosmara-ai)

### Paid Support
- **Developer Tier**: Priority email support
- **Professional Tier**: Dedicated account manager
- **Enterprise**: Custom SLA and phone support

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

### Commercial Usage
Community Edition is for **personal and educational use only**. For commercial usage, please upgrade to Developer tier or higher.

## 🔒 Privacy & Security

- **No Data Logging**: We don't log your API requests or responses
- **Local Usage Tracking**: Usage stats stored locally in browser/app
- **API Key Security**: Keys never leave your environment
- **Open Source**: Community Edition is fully open source

## 🚀 Ready to Upgrade?

### Developer Tier - $49/month
- ✅ 50,000 requests/month (50x more)
- ✅ ML-powered cost optimization
- ✅ Advanced analytics dashboard
- ✅ Intelligent fallbacks
- ✅ Commercial licensing
- ✅ Priority email support

### Professional Tier - $199/month
- ✅ Everything in Developer
- ✅ 500,000 requests/month
- ✅ Dedicated account manager
- ✅ Custom integrations
- ✅ SLA guarantees
- ✅ Phone support

**[Start Your Upgrade →](https://cosmara.dev/pricing)**

---

Made with ❤️ by the [COSMARA](https://cosmara.dev) team