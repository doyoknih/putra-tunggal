import Image, { StaticImageData } from "next/image";

interface IServiceCard {
  img: StaticImageData;
  title: string;
  desc: string;
}

const ServicesCard = ({ img, title, desc }: IServiceCard) => {
  return (
    <div className="rounded-[20px] shadow shadow-black/25 bg-white overflow-hidden flex flex-col h-full">
      <div className="w-full h-[244px] overflow-hidden border">
        <Image
          src={img || ""}
          alt="services"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className="flex flex-col gap-2 p-5 flex-grow">
        <p className="font-semibold leading-6 text-black titleContent">
          {title}
        </p>
        <p className="leading-[17.44px] line-clamp-3">{desc}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
