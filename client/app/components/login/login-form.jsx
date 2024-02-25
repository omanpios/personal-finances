"use client";

import React, { useState } from "react";
import Button from "./button";
import Input from "./input";

export default function LoginForm() {
  const [emailAndPass, setEmailAndPass] = useState({ email: "", password: "" });

  function handleOnChage(e) {
    const { value, name } = e.target;
    setEmailAndPass((prevEmailAndPass) => {
      return { ...prevEmailAndPass, [name]: value };
    });
  }

  function handleClick(e) {
    e.preventDefault();
    console.log(emailAndPass);
  }

  return (
    <form className="w-full max-w-sm">
      <Input
        onChange={handleOnChage}
        label="email"
        type="email"
        name="email"
        placeholder="youremail@example.com"
        value={emailAndPass.email}
      />
      <Input
        onChange={handleOnChage}
        label="Password"
        type="password"
        name="password"
        placeholder="**********"
        value={emailAndPass.password}
      />
      <Button onClick={handleClick} label="Sign Up" />
    </form>
  );
}
