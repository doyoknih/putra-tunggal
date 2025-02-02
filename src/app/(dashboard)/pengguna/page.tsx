import Pengguna from "@/components/(dashboard)/pengguna/";
import DialogCreate from "@/components/(dashboard)/pengguna/dialog/DialogCreate";
import DialogDelete from "@/components/(dashboard)/pengguna/dialog/DialogDelete";

const page = () => {
  return (
    <>
      <Pengguna />
      <DialogCreate />
      <DialogDelete />
    </>
  );
};

export default page;
