type TypeBodyLogin = {
  email: string;
  password: string;
};

type TypeBodyRegister = {
  roleId: string;
  email: string;
  namaLengkap: string;
  alamat: string;
  noTlp: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  password: string;
};

export type { TypeBodyLogin, TypeBodyRegister };
