"use client";

import React, { useContext, useState } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { postData } from "@/app/utils/utils";
import { useRouter } from "next/navigation";
import { UserContext } from "../../contexts/UserContext";

export default function LoginForm() {
  const [emailAndPass, setEmailAndPass] = useState({ email: "", password: "" });
  const { setUserId } = useContext(UserContext);
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
      const response = await postData("http://localhost:8080/login", "POST", {
        email,
        password,
      });
      const { status } = response;
      const jsonResponse = await response.json();
      setUserId(jsonResponse.userId);

      if (status === 202) {
        router.push("/categories");
      } else {
        console.log("paila", await response.json());
        //TODO: Red error message
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
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
    </div>
  );
}
