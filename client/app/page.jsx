"use client";

import LoginForm from "./components/login/login-form";
import { UserProvider } from "./contexts/UserContext";

export default function Home() {
  return (
    <div className="max-width: 640px;">
      <LoginForm />
    </div>
  );
}
