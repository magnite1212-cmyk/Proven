import React, { useEffect, useState } from 'react';
import { useNotificationGatekeeper } from '@/hooks/useNotificationGatekeeper';
import { AlertCircle, Bell, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationGatekeeperModalProps {
  onPermissionGranted: () => void;
  isDismissible?: boolean;
}

export const NotificationGatekeeperModal: React.FC<NotificationGatekeeperModalProps> = ({
  onPermissionGranted,
  isDismissible = false
}) => {
  const { permissionStatus, isLoading, requestPermission } = useNotificationGatekeeper();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (permissionStatus === 'prompt') {
      setIsVisible(true);
    } else if (permissionStatus === 'granted') {
      setIsVisible(false);
      onPermissionGranted();
    }
  }, [permissionStatus, onPermissionGranted]);

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      onPermissionGranted();
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white rounded-t-lg">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Activate Critical Notifications
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            To manage clinic operations effectively, you need to enable browser notifications. This allows you to receive real-time alerts for:
          </p>
          
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <Bell className="w-4 h-4 mt-1 text-blue-600 flex-shrink-0" />
              <span>New patient registrations</span>
            </li>
            <li className="flex items-start gap-2">
              <Bell className="w-4 h-4 mt-1 text-blue-600 flex-shrink-0" />
              <span>Session booking requests</span>
            </li>
            <li className="flex items-start gap-2">
              <Bell className="w-4 h-4 mt-1 text-blue-600 flex-shrink-0" />
              <span>Offer publication confirmations</span>
            </li>
            <li className="flex items-start gap-2">
              <Bell className="w-4 h-4 mt-1 text-blue-600 flex-shrink-0" />
              <span>Important system alerts</span>
            </li>
          </ul>

          {/* Visual Instruction */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">How to Enable:</p>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Click the <strong>lock/bell icon</strong> in your browser's address bar</span>
            </div>
            <div className="ml-8 mt-2 text-xs text-gray-600">
              Then select <strong>"Allow"</strong> for notifications
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t flex gap-3">
          {isDismissible && (
            <Button
              variant="outline"
              onClick={() => setIsVisible(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Skip for Now
            </Button>
          )}
          <Button
            onClick={handleRequestPermission}
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Checking...' : 'Enable Notifications'}
          </Button>
        </div>

        {!isDismissible && (
          <div className="px-6 py-2 text-center text-xs text-gray-500 bg-gray-50 rounded-b-lg">
            You must enable notifications to access the dashboard
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationGatekeeperModal;
