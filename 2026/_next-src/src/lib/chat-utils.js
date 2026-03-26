const CHAT_SESSION_STORAGE_KEY = 'rositaRococoChatSessionId';

function generateRandomId() {
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((value) => value.toString(16).padStart(2, '0'))
      .join('');
  }

  return `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`.slice(0, 32);
}

export function getOrCreateLegacyChatSessionId() {
  if (typeof window === 'undefined') return 'server-session';

  const existing = window.localStorage.getItem(CHAT_SESSION_STORAGE_KEY);
  if (existing) return existing;

  const next = generateRandomId();
  window.localStorage.setItem(CHAT_SESSION_STORAGE_KEY, next);
  return next;
}

export function buildLegacyChatPayload({ sessionId, message }) {
  return [
    {
      sessionId,
      action: 'sendMessage',
      chatInput: message,
    },
  ];
}

export function parseLegacyChatReply(text) {
  const fallback = 'Gracias, ya recibimos tu consulta. En unos instantes te respondemos por este chat.';
  let parsed = null;

  try {
    parsed = JSON.parse(text);
  } catch {
    return text.trim() || fallback;
  }

  if (Array.isArray(parsed) && parsed.length > 0) {
    return parsed[0]?.output || parsed[0]?.response || parsed[0]?.message || fallback;
  }

  return parsed?.output || parsed?.response || parsed?.reply || parsed?.message || fallback;
}
