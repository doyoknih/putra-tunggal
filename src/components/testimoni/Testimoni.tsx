"use client";

// components
import { CardTestimoni } from "./CardTestimoni";
import { ButtonMedium } from "../Button";

// data
import { dataTestmoni } from "@/lib/data";

const Testimoni = () => {
  return (
    <div className="py-10 md:py-16 lg:py-24">
      <div className="ContainerX lg:bg-primary/10 lg:h-[450px] overflow-hidden lg:mb-16">
        <div className="grid lg:grid-cols-2 gap-10 h-full">
          <div className="flex flex-col justify-center text-center items-center lg:text-start lg:items-start gap-5">
            <p className="titleHighlight">
              Bagikan ceritamu, dapatkan dukungan.
            </p>
            <p>
              Biro Psikologi Putra Tunggal menyediakan forum konsultasi online
              yang berfokus pada kesehatan mental.
            </p>
            <ButtonMedium className="bg-red text-white">
              CHAT DOKTER SEKARANG
            </ButtonMedium>
          </div>
          <div className="overflow-auto grid lg:grid-cols-2 gap-5">
            <div className="flex lg:flex-col gap-5 overflow-auto">
              {dataTestmoni.map((item, index) => (
                <CardTestimoni
                  key={index}
                  review={item.review}
                  profile={item.profile}
                  name={item.name}
                />
              ))}
            </div>
            <div className="flex lg:flex-col gap-5 overflow-y-auto">
              {dataTestmoni.map((item, index) => (
                <CardTestimoni
                  key={index}
                  review={item.review}
                  profile={item.profile}
                  name={item.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimoni;
