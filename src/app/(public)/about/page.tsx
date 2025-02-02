"use client";

import catFeetIMG from "@/assets/cat_feet.png";
import ceoIMG from "@/assets/CEO2.svg";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

import dynamic from "next/dynamic";
const Maps = dynamic(() => import("@/components/Map"), { ssr: false });

const page = () => {
  return (
    <div className="pt-10 lg:pt-0">
      <div className="Container">
        <div className="w-full rounded-xl md:rounded-3xl overflow-hidden shadow-md border">
          <div className="grid grid-cols-4 w-full bg-primary/10">
            <div className="relative overflow-hidden col-span-3 bg-primary p-3 md:p-8 rounded-xl md:rounded-r-3xl">
              <p className="titleContent text-white">
                MENGENAL BIRO PSIKOLOGI PUTRA TUNGGAL
              </p>
              <div className="absolute -bottom-48 -right-60 md:h-72">
                <Image
                  src={catFeetIMG}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            </div>
            <div className="col-span-1" />
          </div>
          <div className="bg-[#2A9D8F]/10 h-full p-4 md:p-10 grid gap-10 lg:gap-0 lg:grid-cols-3">
            <div className="lg:col-span-2 flex flex-col gap-2 md:gap-8 lg:w-10/12">
              <p className="titleContent">
                Selamat Datang di Biro Psikologi Putra Tunggal
              </p>
              <p>
                Biro Psikologi Putra Tunggal adalah perusahaan yang bergerak di
                bidang pengembangan Sumber Daya Manusia yang berkomitmen untuk
                membantu pelanggan dalam mengelola Sumber Daya Manusia secara
                optimal bagi perusahaan, organisasi, lembaga maupun pemerintahan
                yang melayani berbagai bidang jasa seperti, konseling, training,
                rekrutmen dan layanan psikolog lainnya
              </p>
              <p>
                Dengan pengalaman bertahun-tahun, kami menawarkan beragam
                layanan mulai dari konseling individu dan kelompok, pelatihan
                pengembangan diri dan kepemimpinan, hingga asesmen psikologis
                yang akurat untuk mendukung proses rekrutmen, promosi, dan
                pengembangan karir.
              </p>
              <p>
                Melalui pendekatan yang holistik dan berbasis bukti ilmiah, kami
                berupaya menciptakan lingkungan kerja yang positif dan
                produktif, serta meningkatkan kualitas hidup individu secara
                keseluruhan.
              </p>
            </div>
            <div className="lg:col-span-1">
              <div className="w-1/2 md:w-1/3 lg:w-1/2 mx-auto">
                <Image src={ceoIMG} alt="" width={0} height={0} sizes="100vw" />
              </div>
            </div>
          </div>
        </div>
        {/* contact */}
        <div className="Container text-center lg:w-1/2 mx-auto flex flex-col gap-5">
          <p className="titleContent">CONTACT</p>
          <p>
            Butuh bantuan? Jangan ragu untuk menghubungi kami, kami siap
            melayani Anda.
          </p>
          <div className="flex items-center gap-10 justify-center">
            <FaWhatsapp size={52} fill="#25D366" />
            <FaFacebook size={52} fill="#3B5998" />
            <FaTwitter size={52} fill="#00ACEE" />
            <FaInstagram size={52} />
          </div>
        </div>
        {/* end location */}

        {/* location */}
        <div className="text-center lg:w-10/12 mx-auto flex flex-col gap-5">
          <p className="titleContent">LOKASI</p>
          <p className="lg:w-1/2 mx-auto">
            Jalan Wahid Hasyim 37, Karangklesem, Kec. Purwokerto Sel., Kabupaten
            Banyumas, Jawa Tengah 53144
          </p>
          <div className="w-full h-52 md:h-72 lg:h-96 rounded-3xl bg-white shadow-md border">
            <Maps />
          </div>
        </div>
        {/* end location */}
      </div>
    </div>
  );
};

export default page;
