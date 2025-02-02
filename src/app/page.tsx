"use client";

import { BannerTrigger } from "@/components/BannerTrigger";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Foooter";
import { Faq } from "@/components/home/FAQ";
import { Highlight } from "@/components/home/Highlight";
import { MentalHealth } from "@/components/home/MentalHealth";
import { Services } from "@/components/services/Services";
import ButtonChatTrigger from "@/components/ButtonChatTrigger";
import { useRef } from "react";

export default function Home() {
  const refBannerTrigger = useRef<HTMLDivElement>(null);

  const scrollToBanner = (component: string) => {
    if (component === "buat_janji") {
      refBannerTrigger.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto relative">
      <Header />
      <div className="pt-10">
        <Highlight scrollToBanner={scrollToBanner} />
        <Services />
        <MentalHealth />
        <BannerTrigger refBannerTrigger={refBannerTrigger} />
        <Faq />
      </div>
      <Footer />
      <ButtonChatTrigger />
    </div>
  );
}
