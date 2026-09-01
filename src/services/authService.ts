/**
 * User & Authentication Service
 * 
 * Handles role switching, profile data, and Telegram auth bridge.
 */

import { UserProfile, UserRole } from '../types';
import { mockStore } from '../mock/mockStore';
import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export class AuthService {
  /**
   * Switches active role between Passenger and Driver.
   * Expected FastAPI Endpoint: `PATCH /api/profile/role`
   */
  public static async switchRole(newRole: UserRole): Promise<void> {
    // Future FastAPI call:
    // await apiClient.patch(ENDPOINTS.PROFILE_SWITCH_ROLE, { role: newRole });
    mockStore.setRole(newRole);
  }

  /**
   * Retrieves the current user's profile.
   * Expected FastAPI Endpoint: `GET /api/profile`
   */
  public static async getProfile(): Promise<UserProfile> {
    // Future FastAPI call:
    // const res = await apiClient.get<UserProfile>(ENDPOINTS.PROFILE);
    // if (res.data) return res.data;
    return mockStore.getCurrentUser();
  }

  /**
   * Updates user profile fields (name, phone, vehicle info).
   * Expected FastAPI Endpoint: `PATCH /api/profile`
   */
  public static async updateProfile(data: Partial<UserProfile>): Promise<void> {
    // Future FastAPI call:
    // await apiClient.patch(ENDPOINTS.PROFILE, data);
    mockStore.updateProfile(data);
  }

  /**
   * Authenticates user via Telegram WebApp initData string.
   * Expected FastAPI Endpoint: `POST /api/auth/telegram`
   */
  public static async loginWithTelegram(initData: string): Promise<UserProfile | null> {
    // Future FastAPI call:
    // const res = await apiClient.post<{ token: string; user: UserProfile }>(ENDPOINTS.AUTH_TELEGRAM_LOGIN, { initData });
    // if (res.data) {
    //   apiClient.setAuthToken(res.data.token);
    //   return res.data.user;
    // }
    return mockStore.getCurrentUser();
  }
}
