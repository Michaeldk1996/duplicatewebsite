import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

export const trackAnalyticsVisitor = () => {
  logEvent(analytics, 'page_view', {
    page_path: window.location.pathname,
    page_title: document.title,
  });

  logEvent(analytics, 'visitor_info', {
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || 'direct',
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
  });
};