import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';

interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  subscriptionStatus: string;
  currentPeriodEnd?: string;
  loading: boolean;
}

export const useSubscription = (user: User | null): SubscriptionStatus => {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionStatus>({
    hasActiveSubscription: false,
    subscriptionStatus: 'none',
    loading: true,
  });

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setSubscriptionData({
          hasActiveSubscription: false,
          subscriptionStatus: 'none',
          loading: false,
        });
        return;
      }

      try {
        console.log('=== CHECKING SUBSCRIPTION FOR USER ===');
        console.log('User ID:', user.id);
        console.log('User email:', user.email);
        
        const response = await fetch(`/api/subscription-status?userId=${user.id}`);
        const data = await response.json();
        
        console.log('=== SUBSCRIPTION API RESPONSE ===');
        console.log('API Response:', data);
        console.log('hasActiveSubscription:', data.hasActiveSubscription);
        console.log('subscriptionStatus:', data.subscriptionStatus);

        setSubscriptionData({
          hasActiveSubscription: data.hasActiveSubscription,
          subscriptionStatus: data.subscriptionStatus,
          currentPeriodEnd: data.currentPeriodEnd,
          loading: false,
        });
      } catch (error) {
        console.error('Error checking subscription:', error);
        setSubscriptionData({
          hasActiveSubscription: false,
          subscriptionStatus: 'error',
          loading: false,
        });
      }
    };

    checkSubscription();
  }, [user]);

  return subscriptionData;
};