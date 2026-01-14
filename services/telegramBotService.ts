
export const sendContactFormToTelegram = async (name: string, email: string, message: string): Promise<boolean> => {
  try {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram configuration missing:', { botToken: !!botToken, chatId: !!chatId });
      return false;
    }

    const text = `
📩 *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📝 *Message:*
${message || 'No message provided'}
    `;

    const directUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const body = JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
    });

    // Helper to try fetch
    const tryFetch = async (url: string) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });
        const data = await response.json();
        return data.ok;
    };

    // 1. Try Direct
    try {
        const result = await tryFetch(directUrl);
        if (result) return true;
    } catch (error) {
        console.warn('Direct Telegram request failed (likely blocked), switching to proxy...', error);
    }

    // 2. Try Proxy (corsproxy.io)
    try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(directUrl)}`;
        const result = await tryFetch(proxyUrl);
        if (result) return true;
    } catch (error) {
        console.warn('Proxy (corsproxy.io) failed:', error);
    }

    // 3. Try Proxy (codetabs) - Note: codetabs might not support POST body correctly or has limits, but worth a try as fallback
    try {
         // CodeTabs requires just appending the URL
         const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(directUrl)}`;
         const result = await tryFetch(proxyUrl);
         if (result) return true;
    } catch (error) {
         console.error('All Telegram transport methods failed:', error);
    }

    return false;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
};
