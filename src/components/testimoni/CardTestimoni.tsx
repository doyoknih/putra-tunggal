import Image, { StaticImageData } from "next/image";

interface ICardTestimoni {
  review?: string;
  profile: StaticImageData;
  name?: string;
}

const CardTestimoni = ({ name, profile, review }: ICardTestimoni) => {
  return (
    <div className="bg-primary min-w-64 md:min-w-72 lg:min-w-full lg:h-[162px] rounded-xl p-4 flex flex-col gap-4">
      <p className="text-xs md:text-sm text-white">{review}</p>
      <div className="flex items-center gap-2">
        <div className="overflow-hidden rounded-full w-10 h-10 bg-white">
          <Image src={profile} alt="" width={0} height={0} sizes="100vw" />
        </div>
        <p className="text-white text-base">{name}</p>
      </div>
    </div>
  );
};

export { CardTestimoni };
