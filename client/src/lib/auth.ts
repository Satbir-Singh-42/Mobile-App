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
    const response = await apiRequest('POST', '/api/auth/login', data);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.details || result.message || 'Login failed');
    }
    
    if (result.token) {
      localStorage.setItem('auth_token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
    }
    
    return result;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiRequest('POST', '/api/auth/register', data);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.details || result.message || 'Registration failed');
    }
    
    if (result.token) {
      localStorage.setItem('auth_token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
    }
    
    return result;
  },

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string; email: string }> {
    const response = await apiRequest('POST', '/api/auth/forgot-password', data);
    return await response.json();
  },

  async verifyOtp(data: VerifyOtpData): Promise<{ message: string; resetToken: string }> {
    const response = await apiRequest('POST', '/api/auth/verify-otp', data);
    const result = await response.json();
    
    if (result.resetToken) {
      localStorage.setItem('reset_token', result.resetToken);
    }
    
    return result;
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const resetToken = localStorage.getItem('reset_token');
    const response = await apiRequest('POST', '/api/auth/reset-password', data, {
      'Authorization': `Bearer ${resetToken}`
    });
    
    localStorage.removeItem('reset_token');
    return await response.json();
  },

  async saveQuestionnaire(data: any): Promise<{ message: string }> {
    const token = localStorage.getItem('auth_token');
    const response = await apiRequest('POST', '/api/questionnaire', data, {
      'Authorization': `Bearer ${token}`
    });
    return await response.json();
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