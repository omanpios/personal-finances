import Image from "next/image";
import styles from "./page.module.css";
import LoginForm from "./components/login/login-form";

export default function Home() {
  return (
    <div className="max-width: 640px;">
      <LoginForm />
    </div>
  );
}
