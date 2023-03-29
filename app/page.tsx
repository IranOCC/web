import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { cookies } from "next/headers";
// import TextInput from "@/components/Input/Normal";
import Providers from "@/store/provider";
import { store } from "@/store";
export default function Home() {
  // const fff = async () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => resolve(true), 2000);
  //   });
  // };
  // await fff();
  const cookieStore = cookies();
  const _authToken = cookieStore.get("authToken");
  return (
    <h2>
      Main Content{store.getState().auth.token}GGG
      {/* <TextInput /> */}
    </h2>
  );
}
