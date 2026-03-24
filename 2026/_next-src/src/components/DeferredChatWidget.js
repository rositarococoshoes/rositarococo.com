'use client';

import { useState } from 'react';

export default function DeferredChatWidget({ hasCart = false, cartOpen = false, webhookUrl }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hola, soy Rosita. Si quieres, te ayudo con talles o con la promo de contrareembolso.' }]);
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
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, source: 'next-2026-contrareembolso', page: typeof window !== 'undefined' ? window.location.href : '' }),
      });

      const text = await response.text();
      let reply = 'Gracias, ya recibimos tu consulta. En unos instantes te respondemos por este chat.';
      try {
        const data = JSON.parse(text);
        reply = data.reply || data.message || data.output || reply;
      } catch {
        if (text.trim()) reply = text.trim();
      }
      setMessages((current) => [...current, { from: 'bot', text: reply }]);
    } catch {
      setMessages((current) => [...current, { from: 'bot', text: 'No pude conectar con el asistente ahora. Puedes continuar la compra y te confirmamos por WhatsApp.' }]);
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
