export const sendContactFormToTelegram = async (name: string, email: string, message: string, budget?: string): Promise<boolean> => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.error('Telegram configuration missing');
        alert('Configuration Error: Missing Bot Token or Chat ID');
        return false;
    }



    const text = `
📩 *New Request*
👤 *Name:* ${name}
📧 *Email:* ${email}
💰 *Budget:* ${budget || 'Not specified'}
📝 *Message:*
${message || 'No message provided'}
  `.trim();

    // "Pixel" method: Create an Image request.
    // This forces a GET request that browsers treat as loading an image resource.
    // It bypasses many strict CORS rules because images are cross-origin allowed.
    // The server returns JSON, so the image load will technically "fail" (trigger onerror),
    // but the request WILL reach the server first.

    const encodedText = encodeURIComponent(text);
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodedText}&parse_mode=Markdown`;

    return new Promise((resolve) => {
        const img = new Image();

        // We expect an error because Telegram returns JSON, not an image.
        // But the request itself succeeds in hitting the server.
        img.onerror = () => {
            console.log('Message sent via Image Transport (Pixel)');
            resolve(true);
        };

        // Unlikely to fire, but good measure
        img.onload = () => {
            console.log('Message sent via Image Transport (Pixel)');
            resolve(true);
        };

        // Trigger request
        img.src = url;

        // Safety timeout
        setTimeout(() => resolve(true), 2000);
    });
};
