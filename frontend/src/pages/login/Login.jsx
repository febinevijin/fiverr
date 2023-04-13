import React, { useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Context";

const Login = () => {

  const {
    login,
    authState: { error, isLogged },
  } = AuthContext();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email, password)
    
   
  };

  useEffect(() => {
    if (isLogged === true) {
      navigate("/");
    }
  }, [isLogged,navigate])
  


  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <h1>Sign in</h1>
        <label htmlFor="">Email</label>
        <input
          name="email"
          type="email"
          placeholder="johndoe"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
       {error && error}
      </form>
    </div>
  );
};

export default Login;
