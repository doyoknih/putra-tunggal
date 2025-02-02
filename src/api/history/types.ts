import { TypeServices } from "../services/types";
import { TypeOrder, TypeUser } from "../user/types";

type TypeOrderItem = {
  id?: string;
  orderId?: string;
  serviceId?: string;
  qty?: number;
  service?: TypeServices;
};

type TypeHistory = {
  id?: string;
  orderId?: string;
  serviceId?: string;
  qty?: number;
  layanan?: "Offline" | "Online";
  status?: string;
  createdAt?: string;
  time?: string;
  order?: TypeOrder;
  service?: TypeServices;
  user?: TypeUser;
  orderItem?: TypeOrderItem[];
};

export type { TypeHistory, TypeOrderItem };
