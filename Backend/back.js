const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// 模擬使用者資料 (實際應連接資料庫)
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'creator', password: 'creator123', role: 'creator' },
  { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer' },
];

// 登入 API
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).send('帳號或密碼錯誤');

  // 創建 JWT Token
  const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
  res.json({ token });
});

// Middleware: 驗證 Token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('未授權');

  try {
    req.user = jwt.verify(token, 'your_secret_key');
    next();
  } catch (err) {
    res.status(401).send('Token 無效');
  }
};

// API: 取得存庫
app.get('/repositories', authenticate, (req, res) => {
  if (req.user.role === 'viewer' || req.user.role === 'creator' || req.user.role === 'admin') {
    res.json([{ id: 1, name: '樣本存庫', description: '這是一個範例存庫' }]);
  } else {
    res.status(403).send('無權限');
  }
});

// 啟動伺服器
app.listen(3000, () => console.log('伺服器運行中 http://localhost:3000'));