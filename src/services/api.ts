// API Service Layer - Ready for real API integration

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

// Mock delay to simulate network
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authApi = {
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // return response.json();
    
    return {
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: { id: '1', email, fullName: 'John Doe' },
      },
    };
  },

  async register(email: string, password: string, fullName: string): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return {
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: { id: Date.now().toString(), email, fullName },
      },
    };
  },

  async resetPassword(email: string): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return { success: true };
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return { success: true };
  },
};

// User API
export const userApi = {
  async getProfile(): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return {
      success: true,
      data: {
        id: '1',
        email: 'demo@example.com',
        fullName: 'John Doe',
        phoneNumber: '+1 234 567 8900',
        bio: 'Full-stack developer',
      },
    };
  },

  async updateProfile(data: any): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return { success: true, data };
  },

  async uploadAvatar(file: File): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    // const formData = new FormData();
    // formData.append('avatar', file);
    // const response = await fetch(`${API_BASE_URL}/user/avatar`, {
    //   method: 'POST',
    //   body: formData,
    // });
    
    return {
      success: true,
      data: { avatarUrl: URL.createObjectURL(file) },
    };
  },
};

// Notifications API
export const notificationsApi = {
  async getNotifications(): Promise<ApiResponse<any[]>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return {
      success: true,
      data: [
        {
          id: '1',
          title: 'Welcome!',
          message: 'Welcome to our platform. Get started by exploring the dashboard.',
          type: 'info',
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'New feature available',
          message: 'Check out our new analytics dashboard with advanced reporting.',
          type: 'feature',
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: '3',
          title: 'Security update',
          message: 'Your password was changed successfully.',
          type: 'security',
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
    };
  },

  async markAsRead(notificationId: string): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return { success: true };
  },

  async markAllAsRead(): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return { success: true };
  },

  async deleteNotification(notificationId: string): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return { success: true };
  },
};

// Devices API
export const devicesApi = {
  async getDevices(): Promise<ApiResponse<any[]>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return {
      success: true,
      data: [
        {
          id: '1',
          name: 'iPhone 14 Pro',
          type: 'mobile',
          browser: 'Safari',
          location: 'San Francisco, CA',
          lastActive: new Date().toISOString(),
          current: true,
        },
        {
          id: '2',
          name: 'MacBook Pro',
          type: 'desktop',
          browser: 'Chrome',
          location: 'San Francisco, CA',
          lastActive: new Date(Date.now() - 3600000).toISOString(),
          current: false,
        },
        {
          id: '3',
          name: 'iPad Air',
          type: 'tablet',
          browser: 'Safari',
          location: 'New York, NY',
          lastActive: new Date(Date.now() - 86400000).toISOString(),
          current: false,
        },
      ],
    };
  },

  async revokeDevice(deviceId: string): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return { success: true };
  },

  async revokeAllDevices(): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return { success: true };
  },
};

// Support API
export const supportApi = {
  async getTickets(): Promise<ApiResponse<any[]>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return {
      success: true,
      data: [
        {
          id: '1',
          title: 'Cannot upload profile picture',
          status: 'In Progress',
          priority: 'High',
          createdAt: '2026-01-01',
        },
        {
          id: '2',
          title: 'Question about billing',
          status: 'Open',
          priority: 'Medium',
          createdAt: '2025-12-30',
        },
        {
          id: '3',
          title: 'Feature request: Dark mode',
          status: 'Resolved',
          priority: 'Low',
          createdAt: '2025-12-25',
        },
      ],
    };
  },

  async createTicket(data: { name: string; email: string; message: string }): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return {
      success: true,
      data: {
        id: Date.now().toString(),
        ...data,
        status: 'Open',
        createdAt: new Date().toISOString(),
      },
    };
  },
};

// Dashboard API
export const dashboardApi = {
  async getStats(): Promise<ApiResponse<any>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return {
      success: true,
      data: {
        totalUsers: 12453,
        activeProjects: 48,
        revenue: '$125,430',
        growth: '+12.5%',
      },
    };
  },

  async getRecentActivity(): Promise<ApiResponse<any[]>> {
    await mockDelay();
    // TODO: Replace with actual API call
    return {
      success: true,
      data: [
        {
          id: '1',
          type: 'login',
          message: 'Logged in from new device',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
        },
        {
          id: '2',
          type: 'update',
          message: 'Updated profile information',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          id: '3',
          type: 'security',
          message: 'Enabled two-factor authentication',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
    };
  },
};
