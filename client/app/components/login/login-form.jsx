"use client";

import React, { useState } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { callApi } from "@/app/utils/utils";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [emailAndPass, setEmailAndPass] = useState({ email: "", password: "" });
  const router = useRouter();

  function handleOnChage(e) {
    const { value, name } = e.target;
    setEmailAndPass((prevEmailAndPass) => {
      return { ...prevEmailAndPass, [name]: value };
    });
  }

  async function handleOnClick() {
    const { email, password } = emailAndPass;
    try {
      const response = await callApi("http://localhost:8080/login", "POST", {
        email,
        password,
      });
      const { status } = response;
      if (status === 202) {
        router.push("/category");
        console.log("ok", response);
      } else {
        console.log("paila", await response.json());
        //TODO: Red error message
      }
    } catch (error) {
      console.error(error);
    }
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
      <p></p>
      <Button onClick={handleOnClick} label="Sign Up" />
    </form>
  );
}
