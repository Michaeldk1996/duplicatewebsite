import { collection, serverTimestamp, doc, setDoc, increment, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const getIPAddress = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
};
const getDeviceType = () => {
  const ua = navigator.userAgent;
  const isMobileUA = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isMobileWidth = window.innerWidth <= 768;
  
  if (isMobileUA || isMobileWidth) return 'mob_';
  return '';
};

export const trackVisitor = async () => {
  try {
    const ip = await getIPAddress();

    const visitorsRef = collection(db, 'visitors');
    const q = query(visitorsRef, where('ip', '==', ip));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      await setDoc(doc(visitorsRef), {
        ip,
        userAgent: navigator.userAgent,
        browser: getBrowserName(),
        os: getOS(),
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || 'direct',
        page: window.location.pathname,
        createdAt: serverTimestamp(),
        lastVisit: serverTimestamp(),
        visitCount: 1,
      });
    } else {
      const existingDoc = snapshot.docs[0];
      await setDoc(doc(db, 'visitors', existingDoc.id), {
        lastVisit: serverTimestamp(),
        visitCount: increment(1),
      }, { merge: true });
    }

    const today = new Date().toISOString().split('T')[0];
    const dailyRef = doc(db, 'visitors', today);
    const count = `${getDeviceType()}count`;
    await setDoc(dailyRef, {
      type: 'Daily',
      [count]: increment(1),
      date: today,
    }, { merge: true });

  } catch (err) {
    console.error('Tracking failed:', err);
  }
};

export const trackEvent = async (eventType) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const dailyRef = doc(db, 'visitors', today);
    const event = `${getDeviceType()}${eventType}`;
    await setDoc(dailyRef, {
      [event]: increment(1),
    }, { merge: true });

  } catch (err) {
    console.error('Tracking Event failed:', err);
  }
};

const getBrowserName = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
  return 'Unknown';
};

const getOS = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Unknown';
};