import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import { ReactNode } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { Logo } from "./Logo";

interface ISosmed {
  children: ReactNode;
}

const Sosmed = ({ children }: ISosmed) => {
  return (
    <div className="h-10 w-10 bg-white text-primary rounded-full flex justify-center items-center overflow-hidden">
      {children}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="px-5 p-10 lg:py-10 lg:px-16 bg-primary text-white">
      <div className="mb-10 flex justify-center">
        <Logo />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-10 lg:gap-20">
        <div className="md:col-span-1 lg:col-span-2 text-center md:text-start flex flex-col gap-y-2">
          <p className="titleContent">Tentang Kami</p>
          <p>
            Situs kami adalah sumber informasi kesehatan yang dipercayai dan
            tempat Anda dapat langsung berkonsultasi dengan psikolog berlisensi.
            Kami hadir untuk membantu Anda dalam perjalanan kesehatan mental
            Anda, memberikan pengetahuan dan akses langsung untuk mendapatkan
            dukungan dari para profesional kami.{" "}
          </p>
        </div>
        <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-y-2">
          <p className="titleContent">Layanan Pengaduan Konsumen</p>
          <p>
            Jalan Wahid Hasyim 37, Karangklesem, Kec. Purwokerto Sel., Kabupaten
            Banyumas, Jawa Tengah 53144 / +628123456789
          </p>
        </div>
        <div className="flex flex-col gap-y-2 w-[231px]">
          <p className="titleContent">Contact</p>
          <div className="flex items-center gap-x-2">
            <Sosmed>
              <FaFacebookF className="w-6 h-6" />
            </Sosmed>
            <Sosmed>
              <FaTwitter className="w-6 h-6" />
            </Sosmed>
            <Sosmed>
              <FaWhatsapp className="w-7 h-7" />
            </Sosmed>
            <Sosmed>
              <AiFillInstagram className="w-6 h-6" />
            </Sosmed>
          </div>
        </div>
      </div>
      <p className="text-center font-semibold leading-6 mt-16">
        Copyright © 2023 PsikoHeatlh
      </p>
    </div>
  );
};

export { Footer };
