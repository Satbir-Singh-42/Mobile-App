import { apiRequest } from './queryClient';

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
}

interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

interface ForgotPasswordData {
  email: string;
}

interface VerifyOtpData {
  email: string;
  otp: string;
}

interface ResetPasswordData {
  newPassword: string;
}

// Auth API functions
export const authAPI = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.details || result.message || 'Login failed');
      }
      
      if (result.token) {
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      
      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.details || result.message || 'Registration failed');
      }
      
      if (result.token) {
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      
      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string; email: string }> {
    const response = await apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: data
    });
    return await response.json();
  },

  async verifyOtp(data: VerifyOtpData): Promise<{ message: string; resetToken: string }> {
    const response = await apiRequest('/api/auth/verify-otp', {
      method: 'POST',
      body: data
    });
    const result = await response.json();
    
    if (result.resetToken) {
      localStorage.setItem('reset_token', result.resetToken);
    }
    
    return result;
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const resetToken = localStorage.getItem('reset_token');
    const response = await apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': `Bearer ${resetToken}`
      }
    });
    
    localStorage.removeItem('reset_token');
    return await response.json();
  },

  async saveQuestionnaire(data: any): Promise<{ message: string }> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.details || result.message || 'Failed to save questionnaire');
      }
      
      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to save questionnaire');
    }
  },

  async updateProfile(data: { username?: string; email?: string; phone?: string }): Promise<{ message: string; user: User }> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.details || result.message || 'Profile update failed');
      }
      
      // Update local storage with new user data
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      
      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Profile update failed');
    }
  },

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.details || result.message || 'Password change failed');
      }
      
      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Password change failed');
    }
  },

  async getQuestionnaire(): Promise<any> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/questionnaire', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.details || result.message || 'Failed to get questionnaire');
      }
      
      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get questionnaire');
    }
  },

  async updateQuestionnaire(data: any): Promise<{ message: string }> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/questionnaire', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.details || result.message || 'Failed to update questionnaire');
      }
      
      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update questionnaire');
    }
  },

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('reset_token');
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};