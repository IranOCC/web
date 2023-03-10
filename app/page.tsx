import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

export default async function Home() {
  const fff = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 2000);
    });
  };
  await fff();
  return (
    <div className="App">
      <h1>antd version: </h1>
    </div>
  );
}
