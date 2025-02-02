import { Service, User } from "@prisma/client";

export interface ServiceType extends Service {
    dokter: User
}