import React, { useState } from 'react';

import "./Register.css";
import Header from '../Header/Header';

import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  let register_url = window.location.origin + "/djangoapp/register";

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
      }),
    });

    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
      sessionStorage.setItem('username', json.userName);
      sessionStorage.setItem('firstname', json.firstName);
      sessionStorage.setItem('lastname', json.lastName);
      window.location.href = "/";
    } else if (json.error === "Already Registered") {
      alert("The username is already registered. Please choose a different username.");
    } else {
      alert("Registration was unsuccessful.");
    }
  };

  return (
    <div>
      <Header />
      <div className="register_container">
        <span className='header'>Sign-up</span>
        <form className="inputs" onSubmit={register}>
          <div className='input'>
            <img className='img_icon' src={user_icon} alt="Username" />
            <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className='input'>
            <img className='img_icon' src={user_icon} alt="First Name" />
            <input type="text" name="firstname" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className='input'>
            <img className='img_icon' src={user_icon} alt="Last Name" />
            <input type="text" name="lastname" placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className='input'>
            <img className='img_icon' src={email_icon} alt="Email" />
            <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input'>
            <img className='img_icon' src={password_icon} alt="Password" />
            <input type="password" name="psw" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='submit_panel'>
            <input className="submit" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
