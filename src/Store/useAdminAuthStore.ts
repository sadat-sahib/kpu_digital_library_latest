import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  email: string;
  status: string;
};

type AuthState = {
  user: User | null;
  type: string | null;
  permission: string | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  setUser: (user: User, isAdmin: boolean, type: string, permission: string) => void;
  clearUser: () => void;
};

export const useAdminAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
   
      type: null,
      permission: null,
      isAdmin: false,
      isLoggedIn: false,
      setUser: (user, isAdmin, type, permission) => set({ user, isAdmin, isLoggedIn: true, type, permission }),
      clearUser: () => set({ user: null, isAdmin: false, isLoggedIn: false, type: null, permission: null }),
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({ isAdmin: state.isAdmin, type: state.type, permission: state.permission }),
    }
  )
);
