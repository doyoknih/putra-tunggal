import Image from "next/image";
import { calculateAge, formatIDR } from "@/lib/format";

// components
import { InputSearch } from "@/components/Input";
import { ButtonSmall } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// icon
import { FaJoget } from "react-icons/fa";
import ProfilePsikolog from "./ProfilePsikolog";
import { FC, useEffect, useState } from "react";
import { Service, User } from "@prisma/client";
import waraIMG from "@/assets/person-empty.png";
import ContinuePayment from "../consultation/modal/ContinuePayment";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

interface ServiceData extends Service {
  dokter: User;
}

const ListPsikolog: FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceData[]>([]);
  const [loadingClickChat, setLoadingClickChat] = useState(false);
  const [needToPay, setNeedToPay] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const route = useRouter();

  const handleClickChat = async (serviceId: string) => {
    if (!isLogin) {
      route.push("/login");
    }
    setLoadingClickChat(true);
    try {
      const res = await fetch(`/api/rooms?serviceId=${serviceId}`);
      const data = await res.json();
      if (data.data.length > 0) {
        route.push(`/consultation`);
      } else {
        setNeedToPay(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingClickChat(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data.data);
        setFilteredServices(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the services based on the search query (case-insensitive)
    const filtered = services.filter((item) =>
      item.dokter.namaLengkap.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  if (services?.length === 0) {
    return <Loader />;
  }
  return (
    <div className="w-full flex flex-col gap-6">
      <InputSearch
        placeholder="Cari Psikolog"
        value={searchQuery}
        onChange={handleSearchChange} // Pass the onChange handler
      />
      <div className="max-h-[679px] pb-2 lg:pb-0 overflow-hidden overflow-y-auto grid gap-5 md:grid-cols-2 lg:grid-cols-1">
        {filteredServices.length === 0 ? (
          <p>Data Kosong</p>
        ) : (
          filteredServices?.map((item, index) => (
            <div
              key={index}
              className="border lg:border-none bg-white shadow lg:shadow-none rounded-xl lg:rounded-3xl overflow-hidden p-2 lg:p-0 lg:h-48"
            >
              <div className="flex items-start gap-2 lg:gap-x-5 h-32 md:h-36 lg:h-full">
                <div className="max-w-32 lg:min-w-[169px] lg:max-w-[169px] h-full overflow-hidden rounded-xl lg:rounded-3xl shadow-md border">
                  <Image
                    src={item.dokter.foto ?? waraIMG}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
                <div className="flex flex-col gap-3 lg:gap-0 lg:justify-between h-full">
                  <div className="flex flex-col items-start gap-y-[6px]">
                    <p className="font-semibold">{item.dokter.namaLengkap}</p>
                    <div className="flex items-center gap-3 py-1 px-2 bg-primary rounded">
                      <FaJoget className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
                      <p className="text-white text-xs lg:text-sm">
                        {calculateAge(item?.dokter?.tanggal_lahir!)} Tahun
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold lg:text-lg">
                    {formatIDR(item.harga)}
                  </p>
                  <div className="hidden lg:flex items-center gap-4">
                    <Dialog>
                      <DialogTrigger
                        onClick={() => setNeedToPay(false)}
                        className="text-xs rounded-full font-bold shadow py-2 px-8 bg-red text-white"
                      >
                        Chat
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle></DialogTitle>
                        {needToPay ? (
                          <ContinuePayment serviceId={item.id} />
                        ) : (
                          <ProfilePsikolog service={item} />
                        )}
                        {!needToPay && (
                          <ButtonSmall className="bg-red text-white">
                            <div onClick={() => handleClickChat(item.id)}>
                              {loadingClickChat ? "loading..." : "Chat"}
                            </div>
                          </ButtonSmall>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              <div className="lg:hidden flex flex-col gap-2 mt-2">
                <Dialog>
                  <DialogTrigger className="text-xs rounded-full font-bold shadow py-2 px-8 border border-black/20">
                    Lihat Profil
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle></DialogTitle>
                    {needToPay ? (
                      <ContinuePayment serviceId={item.id} />
                    ) : (
                      <ProfilePsikolog service={item} />
                    )}
                    {!needToPay && (
                      <ButtonSmall className="bg-red text-white">
                        <div onClick={() => handleClickChat(item.id)}>
                          {loadingClickChat ? "loading..." : "Chat"}
                        </div>
                      </ButtonSmall>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListPsikolog;
