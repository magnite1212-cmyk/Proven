import { useState, useEffect } from 'react';

export interface NotificationGatekeeperState {
  permissionStatus: 'prompt' | 'granted' | 'denied';
  isLoading: boolean;
  error: string | null;
}

export const useNotificationGatekeeper = () => {
  const [state, setState] = useState<NotificationGatekeeperState>({
    permissionStatus: 'prompt',
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (!('Notification' in window)) {
          setState(prev => ({
            ...prev,
            error: 'Browser does not support notifications',
            isLoading: false
          }));
          return;
        }

        const permission = Notification.permission;
        setState(prev => ({
          ...prev,
          permissionStatus: permission as 'prompt' | 'granted' | 'denied',
          isLoading: false
        }));
      } catch (err) {
        setState(prev => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Unknown error',
          isLoading: false
        }));
      }
    };

    checkPermission();
  }, []);

  const requestPermission = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const permission = await Notification.requestPermission();
      setState(prev => ({
        ...prev,
        permissionStatus: permission as 'prompt' | 'granted' | 'denied',
        isLoading: false
      }));
      return permission === 'granted';
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to request permission',
        isLoading: false
      }));
      return false;
    }
  };

  return {
    ...state,
    requestPermission
  };
};
