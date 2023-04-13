import React, { useState } from 'react'
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import Request from '../../utils/Request';

const Register = () => {
    const [file, setFile] = useState(null);
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      country: "",
      isSeller: false,
      desc: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
      setUser((prev) => {
       return {...prev, [e.target.name] : e.target.value};
     })
  };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFile(reader.result);
      };
    };
  
 

    const handleSeller = (e) => {
     
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await Request.post("/auth/register", { user, file });
        console.log(data);
  if (data) {
    navigate('/login')
  }
} catch (error) {
  console.log(error.response.data.message);
}
      
    };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="enter your username"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={handleImageChange} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register
