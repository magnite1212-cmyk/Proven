import React, { createContext, useContext, useEffect } from 'react';
import { notificationService } from '@/utils/notificationService';

interface NotificationContextType {
  isServiceWorkerReady: boolean;
  sendClinicNotification: (type: string, data: any) => void;
  sendPatientNotification: (type: string, data: any) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isServiceWorkerReady, setIsServiceWorkerReady] = React.useState(false);

  useEffect(() => {
    const registerSW = async () => {
      const registration = await notificationService.registerServiceWorker();
      if (registration) {
        setIsServiceWorkerReady(true);
      }
    };

    registerSW();
  }, []);

  const sendClinicNotification = (type: string, data: any) => {
    switch (type) {
      case 'new_patient':
        notificationService.clinicNewPatientRegistered(data.patientName, data.clinicName);
        break;
      case 'new_booking':
        notificationService.clinicNewBookingRequest(data.patientName, data.product);
        break;
      case 'offer_published':
        notificationService.clinicOfferPublished(data.offerTitle);
        break;
      case 'profile_updated':
        notificationService.clinicProfileUpdated();
        break;
    }
  };

  const sendPatientNotification = (type: string, data: any) => {
    switch (type) {
      case 'registration_confirmed':
        notificationService.patientRegistrationConfirmed(data.clinicName);
        break;
      case 'session_reminder_7d':
        notificationService.patientSessionReminder7Days(data.product, data.clinicName);
        break;
      case 'phase_transition':
        notificationService.patientPhaseTransition(data.product, data.newPhase);
        break;
      case 'new_offers':
        notificationService.patientNewOffers(data.clinicName, data.offerCount);
        break;
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        isServiceWorkerReady,
        sendClinicNotification,
        sendPatientNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
