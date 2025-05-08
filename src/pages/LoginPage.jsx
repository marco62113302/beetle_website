import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 模擬登入邏輯
    if (username === "admin" && password === "admin123") {
      alert("登入成功，角色：管理者");
    } else {
      alert("登入失敗");
    }
  };

  return (
    <div>
      <h1>登入頁面</h1>
      <input
        type="text"
        placeholder="帳號"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>登入</button>
    </div>
  );
};

export default LoginPage;
