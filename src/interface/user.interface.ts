import { Role, User } from "@prisma/client";

export interface UserType extends User {
    role: Role
}