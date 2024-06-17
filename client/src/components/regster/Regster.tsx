import React, { useState } from "react";
import bcrypt from "bcryptjs-react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    try {
      await axios.post("http://localhost:8080/users", userData);
    } catch (error) {
      console.error("Có lỗi xảy ra khi đăng ký.", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Tạo tài khoản</h1>
        <label htmlFor="signUpName" className="form-label">
          Tên
        </label>
        <input
          type="text"
          id="signUpName"
          placeholder="Tên"
          required
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="signUpEmail" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="signUpEmail"
          placeholder="Email"
          required
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="signUpPassword" className="form-label">
          Mật khẩu
        </label>
        <input
          type="password"
          id="signUpPassword"
          placeholder="Mật khẩu"
          required
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="form-button">
          Đăng ký
        </button>
      </form>
    </div>
  );
}
