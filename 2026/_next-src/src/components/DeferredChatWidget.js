'use client';

import { useState } from 'react';
import { buildLegacyChatPayload, getOrCreateLegacyChatSessionId, parseLegacyChatReply } from '@/src/lib/chat-utils';

export default function DeferredChatWidget({
  hasCart = false,
  cartOpen = false,
  webhookUrl,
  initialMessage = 'Hola, soy Rosita. Si querés, te ayudo con talles o con la promo de contrarreembolso.',
  source = 'next-2026-contrareembolso',
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: initialMessage }]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);

  async function sendMessage(event) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || sending) return;

    setMessages((current) => [...current, { from: 'user', text: trimmed }]);
    setDraft('');
    setSending(true);

    try {
      const sessionId = getOrCreateLegacyChatSessionId();
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildLegacyChatPayload({ sessionId, message: trimmed })),
      });

      const text = await response.text();
      const reply = parseLegacyChatReply(text);
      setMessages((current) => [...current, { from: 'bot', text: reply }]);
    } catch {
      setMessages((current) => [...current, { from: 'bot', text: 'No pude conectar con el asistente ahora. Podés continuar la compra y te confirmamos por WhatsApp.' }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={`chat-shell ${open ? 'is-open' : ''} ${hasCart ? 'has-cart' : ''} ${cartOpen ? 'cart-open' : ''}`}>
      <button type="button" className={`chat-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen((value) => !value)}>
        <span className="chat-toggle-dot" aria-hidden="true" />
        {open ? 'Cerrar' : 'Ayuda'}
      </button>
      {open ? (
        <div className="chat-panel">
          <div className="chat-messages">
            {messages.map((message, index) => <div key={`${message.from}-${index}`} className={`chat-message chat-${message.from}`}>{message.text}</div>)}
          </div>
          <form className="chat-form" onSubmit={sendMessage}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Escribe tu consulta..." />
            <button type="submit" disabled={sending}>{sending ? 'Enviando...' : 'Enviar'}</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
