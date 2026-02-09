
import https from 'https';

// Hardcoded for testing to ensure no env var reading issues
const BOT_TOKEN = '8353237414:AAGMKs4FyPW1-aQ9TaIQG_S8rSo26SxRP1A';
const CHAT_ID = '3575748112';

const message = encodeURIComponent('Test message from script 🚀');
const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}&parse_mode=Markdown`;

console.log('Testing Telegram Bot...');
console.log('Token:', BOT_TOKEN);
console.log('Chat ID:', CHAT_ID);
console.log('URL:', url);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('\nResponse Status:', res.statusCode);
        console.log('Response Body:', data);

        const json = JSON.parse(data);
        if (json.ok) {
            console.log('\n✅ SUCCESS! The bot credentials are correct.');
        } else {
            console.log('\n❌ FAILURE! The Telegram API returned an error.');
            console.log('Error Description:', json.description);
        }
    });

}).on('error', (err) => {
    console.error('\n❌ Network Error:', err.message);
});
