import React, { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  // 제출할 때, newaccount인지 체크 과정을 거쳐, 참트루를 검증해야 한다.
  // 그리고 참트루에 따라 계정생성/로그인 로직으로 구분해준다.
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          value={email}
          required
          placeholder="email address"
          onChange={onChange}
          className="authInput"
        ></input>
        <input
          name="password"
          type="password"
          value={password}
          required
          placeholder="password"
          onChange={onChange}
          className="authInput"
        ></input>
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"} // 나중에 계정 생성과 로그인 창은 분리가 맞겠다.
          className="authInput authSubmit"
        ></input>
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Log In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
