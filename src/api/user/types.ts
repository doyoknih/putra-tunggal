type TypeRole = {
  id?: string;
  role?: "Admin" | "User" | "Dokter";
};

type TypeService = {
  id?: string;
  namaService?: string;
  harga?: number;
  dokterId?: string;
};

type TypeOrder = {
  id: string;
  userId: string;
  total: number;
  redirectUrl: string;
  time: string;
  dokter: string;
  jenisLayanan: string;
  layanan: "Offline" | "Online";
  createdAt: string;
  status: string;
  user: TypeUser;
};

type TypeUser = {
  id?: string;
  roleId?: string;
  email?: string;
  namaLengkap?: string;
  alamat?: string;
  noTlp?: string;
  jenis_kelamin?: string;
  tanggal_lahir?: string;
  foto?: string;
  str?: string;
  password?: string;
  role?: TypeRole;
  Service?: TypeService[];
  Order?: TypeOrder[];
};

export type { TypeUser, TypeRole, TypeOrder };
