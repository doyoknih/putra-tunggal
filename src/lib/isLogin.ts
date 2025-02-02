"use client";

import { getCookie } from "cookies-next";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { storeIsLogin } from "@/store/isLogin";

const IsLogin = () => {
  const [, setIsLogin] = useAtom(storeIsLogin);

  useEffect(() => {
    const token = getCookie("accessToken") as string | undefined; // Ambil token
    setIsLogin(!!token); // Set isLogin menjadi true jika token ada
  }, [setIsLogin]);

  return null;
};

export default IsLogin;
