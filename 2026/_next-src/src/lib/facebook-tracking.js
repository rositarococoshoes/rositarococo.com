export function getCookie(name) {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}

export function setCookie(name, value, days) {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getUrlParameter(name) {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get(name);
}

export function generateFBC() {
  let fbc = getCookie('_fbc');
  if (!fbc) {
    const fbclid = getUrlParameter('fbclid');
    if (fbclid) {
      const savedTimestamp = localStorage.getItem('initial_fbclid_timestamp');
      const savedFbclid = localStorage.getItem('initial_fbclid');
      let timestamp;
      if (savedFbclid === fbclid && savedTimestamp) {
        timestamp = parseInt(savedTimestamp, 10);
      } else {
        timestamp = Date.now();
        localStorage.setItem('initial_fbclid_timestamp', String(timestamp));
      }
      localStorage.setItem('initial_fbclid', fbclid);
      fbc = `fb.1.${timestamp}.${fbclid}`;
      setCookie('_fbc', fbc, 90);
    }
  }
  return fbc || '';
}

export function generateFBP() {
  let fbp = getCookie('_fbp');
  if (!fbp) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    fbp = `fb.1.${timestamp}.${random}`;
    setCookie('_fbp', fbp, 90);
  }
  return fbp;
}
