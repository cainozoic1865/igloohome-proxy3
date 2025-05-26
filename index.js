const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const USER_EMAIL = process.env.USER_EMAIL;

app.post('/api/token', async (req, res) => {
  try {
    const response = await axios.post('https://api.igloohome.io/v2/token', {
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      user_email: USER_EMAIL
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ 錯誤：', err.response?.data || err.message);
    res.status(500).json({
      error: 'Proxy 回傳非 JSON',
      detail: err.response?.data || err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server is running on port ${PORT}`);
});
