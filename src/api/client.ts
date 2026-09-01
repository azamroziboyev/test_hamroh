/**
 * HTTP API Client configured for FastAPI backend.
 * 
 * Provides:
 * - Bearer token authorization
 * - Telegram initData header injection (`X-Telegram-Init-Data`)
 * - Standard JSON serialize / deserialize
 * - Standardized error handling
 */

import { TelegramService } from '../telegram/telegramService';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

class ApiClient {
  private token: string | null = null;

  public setAuthToken(token: string | null): void {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Inject JWT token if stored
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    // Inject Telegram WebApp initData for FastAPI auth verification
    const tgInitData = TelegramService.getInitData();
    if (tgInitData) {
      headers['X-Telegram-Init-Data'] = tgInitData;
    }

    return headers;
  }

  public async get<T>(url: string, params?: Record<string, string | number | boolean | undefined>): Promise<ApiResponse<T>> {
    try {
      const fullUrl = new URL(url, window.location.origin);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            fullUrl.searchParams.append(key, String(value));
          }
        });
      }

      const response = await fetch(fullUrl.toString(), {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { data: null, error: errorText || `HTTP error ${response.status}`, status: response.status };
      }

      const data = await response.json();
      return { data, error: null, status: response.status };
    } catch (err: any) {
      return { data: null, error: err.message || 'Tarmoq xatosi yuz berdi', status: 0 };
    }
  }

  public async post<T, B = any>(url: string, body?: B): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { data: null, error: errorText || `HTTP error ${response.status}`, status: response.status };
      }

      const data = await response.json();
      return { data, error: null, status: response.status };
    } catch (err: any) {
      return { data: null, error: err.message || 'Tarmoq xatosi yuz berdi', status: 0 };
    }
  }

  public async patch<T, B = any>(url: string, body?: B): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { data: null, error: errorText || `HTTP error ${response.status}`, status: response.status };
      }

      const data = await response.json();
      return { data, error: null, status: response.status };
    } catch (err: any) {
      return { data: null, error: err.message || 'Tarmoq xatosi yuz berdi', status: 0 };
    }
  }

  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { data: null, error: errorText || `HTTP error ${response.status}`, status: response.status };
      }

      const data = await response.json();
      return { data, error: null, status: response.status };
    } catch (err: any) {
      return { data: null, error: err.message || 'Tarmoq xatosi yuz berdi', status: 0 };
    }
  }
}

export const apiClient = new ApiClient();
