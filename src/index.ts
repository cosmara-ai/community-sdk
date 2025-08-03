/**
 * COSMARA Community SDK
 * 
 * A basic TypeScript SDK for multi-provider AI routing
 * Supports OpenAI, Anthropic, and Google AI with unified interface
 * 
 * ⚠️  Community Edition Limitations:
 * - 1,000 requests/month limit
 * - 100 requests/day limit
 * - 10 requests/minute limit
 * - No ML-powered routing
 * - No advanced analytics
 * - No intelligent fallbacks
 * - Personal/educational use only
 * 
 * 🚀 Upgrade to Developer tier for:
 * - 50,000 requests/month (50x more)
 * - ML-powered cost optimization
 * - Advanced analytics and insights
 * - Intelligent fallbacks
 * - Commercial usage rights
 * - Priority support
 * 
 * Learn more: https://cosmara.dev/pricing
 */

// Main client
export { AIMarketplaceCommunityClient } from './client';

// Core types and interfaces
export * from './types';

// Provider implementations
export { OpenAIProvider } from './providers/openai';
export { AnthropicProvider } from './providers/anthropic';
export { GoogleProvider } from './providers/google';

// License and usage tracking
export { CommunityUsageTracker, CommunityLicenseValidator } from './license';

// Re-export key types for convenience
export type {
  AIRequest,
  AIResponse,
  AIStreamChunk,
  AIMessage,
  AIModel,
  AIError,
  CommunityConfig,
  UsageRecord,
  UsageLimits,
} from './types';

// Constants
export {
  APIProvider,
  MODEL_EQUIVALENTS,
  COMMUNITY_LIMITS,
  PERFORMANCE_TARGETS,
  COST_THRESHOLDS,
  UPGRADE_MESSAGES,
} from './types';

// Import the client class and types
import { AIMarketplaceCommunityClient } from './client';
import type { CommunityConfig } from './types';

// Convenience factory function
export function createClient(config: CommunityConfig): AIMarketplaceCommunityClient {
  return new AIMarketplaceCommunityClient(config);
}

// Version
export const VERSION = '1.0.0';
export const EDITION = 'Community';

// Upgrade information
export const UPGRADE_INFO = {
  currentTier: 'Community',
  nextTier: 'Developer',
  pricingUrl: 'https://cosmara.dev/pricing',
  contactUrl: 'https://cosmara.dev/contact',
  benefits: {
    developer: [
      '50,000 requests/month (50x more than Community)',
      'ML-powered cost optimization and routing',
      'Advanced analytics and usage insights',
      'Intelligent fallbacks and error handling',
      'Commercial usage rights and licensing',
      'Priority email and chat support',
      'Custom model fine-tuning (coming soon)',
    ],
    professional: [
      '500,000 requests/month (500x more than Community)',
      'All Developer tier features',
      'Dedicated account manager',
      'Custom integrations and partnerships',
      'SLA guarantees and uptime commitments',
      'Advanced security and compliance features',
    ],
  },
} as const;

// Show upgrade notice on import
if (typeof console !== 'undefined') {
  console.log('\n🚀 COSMARA Community SDK');
  console.log('   Multi-provider AI client with 1,000 free requests/month');
  console.log('   Upgrade to Developer tier for 50x more requests and ML routing!');
  console.log('   Learn more: https://cosmara.dev/pricing\n');
}