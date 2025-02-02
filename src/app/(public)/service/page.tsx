import { BannerTrigger } from "@/components/BannerTrigger";
import HighlightService from "@/components/services/Highlight";
import ServiceFee from "@/components/services/ServiceFee";
import { Services } from "@/components/services/Services";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const isLogin = (await cookies()).has("accessToken");
  return (
    <div className="pt-10 lg:pt-0">
      <HighlightService isLogin={isLogin} />
      <BannerTrigger refBannerTrigger={[]} />
      <Services />
      <ServiceFee />
      {/* <Testimoni /> */}
    </div>
  );
};

export default page;
