import { Order, User } from "@prisma/client";

export interface HistoryType extends Order {
    user: User
}