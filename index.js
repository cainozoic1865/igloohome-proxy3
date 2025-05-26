const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const USER_EMAIL = process.env.USER_EMAIL;

// 🔹 根目錄測試用
app.get('/', (req, res) => {
  res.send('✅ Proxy is working.');
});

// 🔹 這是你 Apps Script 會呼叫的 API
app.post('/api/token', async (req, res) => {
  try {
    const iglooRes = await axios.post('https://api.igloohome.io/v2/token', {
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      user_email: USER_EMAIL
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(iglooRes.data);
  } catch (err) {
    console.error('❌ proxy 錯誤:', err?.response?.data || err.message);
    res.status(500).json({
      error: 'Proxy 回傳非 JSON',
      detail: err?.response?.data || err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});
