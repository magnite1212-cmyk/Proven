export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, any>;
}

export const notificationService = {
  /**
   * Send a browser notification
   */
  send: (payload: NotificationPayload) => {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/assets/proven-logo.png',
        badge: payload.badge,
        tag: payload.tag,
        data: payload.data
      });
    }
  },

  /**
   * Register Service Worker for Web Push
   */
  registerServiceWorker: async () => {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Workers not supported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register(
        '/sw.js',
        { scope: '/' }
      );
      console.log('Service Worker registered:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  },

  /**
   * Clinic Event: New Patient Registration
   */
  clinicNewPatientRegistered: (patientName: string, clinicName: string) => {
    notificationService.send({
      title: '🎉 New Patient Registration',
      body: `${patientName} has registered at ${clinicName}`,
      icon: '/assets/proven-logo.png',
      tag: 'new-patient',
      data: { type: 'patient_registration' }
    });
  },

  /**
   * Clinic Event: New Session Booking Request
   */
  clinicNewBookingRequest: (patientName: string, product: string) => {
    notificationService.send({
      title: '📅 New Session Booking',
      body: `${patientName} booked a session for ${product}`,
      tag: 'new-booking',
      data: { type: 'booking_request' }
    });
  },

  /**
   * Clinic Event: Offer Published
   */
  clinicOfferPublished: (offerTitle: string) => {
    notificationService.send({
      title: '✅ Offer Published',
      body: `Your offer "${offerTitle}" is now live`,
      tag: 'offer-published',
      data: { type: 'offer_published' }
    });
  },

  /**
   * Clinic Event: Profile Change Alert
   */
  clinicProfileUpdated: () => {
    notificationService.send({
      title: '⚙️ Profile Updated',
      body: 'Your clinic profile changes have been saved',
      tag: 'profile-update',
      data: { type: 'profile_updated' }
    });
  },

  /**
   * Patient Event: Registration Confirmation
   */
  patientRegistrationConfirmed: (clinicName: string) => {
    notificationService.send({
      title: '✅ Registration Confirmed',
      body: `Welcome to ${clinicName}! Your account is active.`,
      tag: 'registration-confirmed',
      data: { type: 'patient_registered' }
    });
  },

  /**
   * Patient Event: Session Reminder (7 days before)
   */
  patientSessionReminder7Days: (productName: string, clinicName: string) => {
    notificationService.send({
      title: '⏰ Upcoming Session Reminder',
      body: `Your ${productName} session at ${clinicName} is in 7 days`,
      tag: 'session-reminder-7d',
      data: { type: 'session_reminder' }
    });
  },

  /**
   * Patient Event: Phase Transition
   */
  patientPhaseTransition: (product: string, newPhase: string) => {
    notificationService.send({
      title: `📊 Phase Update: ${newPhase}`,
      body: `Your ${product} treatment has transitioned to the ${newPhase} phase`,
      tag: 'phase-transition',
      data: { type: 'phase_transition', phase: newPhase }
    });
  },

  /**
   * Patient Event: New Clinic Offers
   */
  patientNewOffers: (clinicName: string, offerCount: number) => {
    notificationService.send({
      title: '🎁 New Offers Available',
      body: `${clinicName} has ${offerCount} new offer(s) for you`,
      tag: 'new-offers',
      data: { type: 'new_offers' }
    });
  }
};
