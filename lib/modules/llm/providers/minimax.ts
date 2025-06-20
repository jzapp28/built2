import { BaseProvider } from '~/lib/modules/llm/base-provider';
import type { ModelInfo } from '~/lib/modules/llm/types';
import type { IProviderSetting } from '~/types/model';
import type { LanguageModelV1 } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export default class MiniMaxProvider extends BaseProvider {
  name = 'MiniMax';
  getApiKeyLink = 'https://www.minimax.io/platform/app-setting/api-key';
  labelForGetApiKey = 'Get MiniMax API Key';
  icon = 'i-ph-brain-duotone';

  config = {
    baseUrlKey: 'MINIMAX_BASE_URL',
    baseUrl: 'https://api.minimax.io/v1',
    apiTokenKey: 'MINIMAX_API_KEY',
  };

  staticModels: ModelInfo[] = [
    { 
      name: 'MiniMax-M1', 
      label: 'MiniMax-M1 (Reasoning Model)', 
      provider: 'MiniMax', 
      maxTokenAllowed: 8192 
    },
    { 
      name: 'MiniMax-Text-01', 
      label: 'MiniMax-Text-01', 
      provider: 'MiniMax', 
      maxTokenAllowed: 2048 
    },
  ];

  async getDynamicModels(
    apiKeys?: Record<string, string>,
    settings?: IProviderSetting,
    serverEnv?: Record<string, string>,
  ): Promise<ModelInfo[]> {
    const { baseUrl, apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: settings,
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: 'MINIMAX_BASE_URL',
      defaultApiTokenKey: 'MINIMAX_API_KEY',
    });

    if (!apiKey) {
      throw `Missing API Key configuration for ${this.name} provider`;
    }

    try {
      // Try to fetch available models from MiniMax API
      const response = await fetch(`${baseUrl}/models`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        // If models endpoint doesn't exist, return empty array to use static models only
        return [];
      }

      const res = (await response.json()) as any;
      const staticModelIds = this.staticModels.map((m) => m.name);

      if (res.data && Array.isArray(res.data)) {
        return res.data
          .filter((model: any) => !staticModelIds.includes(model.id))
          .map((m: any) => ({
            name: m.id,
            label: `${m.id}`,
            provider: this.name,
            maxTokenAllowed: m.context_length || 8192,
          }));
      }

      return [];
    } catch (error) {
      // If there's an error fetching dynamic models, just return empty array
      // This allows the provider to work with static models only
      console.warn(`Failed to fetch dynamic models for ${this.name}:`, error);
      return [];
    }
  }

  getModelInstance(options: {
    model: string;
    serverEnv: Env;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }): LanguageModelV1 {
    const { model, serverEnv, apiKeys, providerSettings } = options;

    const { baseUrl, apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: providerSettings?.[this.name],
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: 'MINIMAX_BASE_URL',
      defaultApiTokenKey: 'MINIMAX_API_KEY',
    });

    if (!apiKey) {
      throw new Error(`Missing API key for ${this.name} provider`);
    }

    // Use OpenAI SDK with MiniMax base URL since they provide OpenAI-compatible API
    const minimax = createOpenAI({
      baseURL: baseUrl,
      apiKey,
    });

    return minimax(model);
  }
}
