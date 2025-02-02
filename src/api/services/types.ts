import { TypeUser } from "../user/types";

type TypeServices = {
  id?: string;
  namaService?: string;
  harga?: number;
  dokterId?: string;
  dokter?: TypeUser;
};

export type { TypeServices };
