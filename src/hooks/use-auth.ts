'use client';

import { useAuth as useAuthFromProvider } from '@/components/auth/auth-provider';

/**
 * @deprecated The useAuth hook is now exported from '@/components/auth/auth-provider'. Please update your imports.
 */
export const useAuth = () => {
    return useAuthFromProvider();
};
