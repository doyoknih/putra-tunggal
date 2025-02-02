"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { ButtonMedium } from "../Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeBodyLogin } from "@/api/auth/types";
import { useMutationAuth } from "@/api/auth/mutations";
import { storeIsLogin } from "@/store/isLogin";
import { useAtom } from "jotai";
import { getCookies } from "cookies-next";
import { Loader } from "lucide-react";

export const FormLogin = () => {
  const router = useRouter();
  const [payload, setPayload] = React.useState<TypeBodyLogin>({
    email: "",
    password: "",
  });

  const [_, setIsLogin] = useAtom(storeIsLogin);
  const { serviceAuth, isPending } = useMutationAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await serviceAuth({
      type: "login",
      body: payload,
    });

    if (res.status === 200) {
      setIsLogin(true);
      const cookies = getCookies() as { [key: string]: string };
      const token = cookies.accessToken;

      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const role = decodedToken?.role;

          if (role === "User") {
            router.push("/");
          } else {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error decoding token", error);
          alert("Error decoding token. Please try again.");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Email"
          required
          type="email"
          name="email"
          onChange={(e) =>
            setPayload((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <Input
          placeholder="Password"
          type="password"
          name="passowrd"
          required
          onChange={(e) =>
            setPayload((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
      </div>
      <ButtonMedium
        type="submit"
        className="bg-red text-white flex justify-center items-center"
      >
        {isPending ? <Loader /> : "Masuk"}
      </ButtonMedium>
      <p>
        Belum Punya Akun?{" "}
        <Link href="/register" className="font-bold text-primary">
          Daftar
        </Link>
      </p>
    </form>
  );
};
