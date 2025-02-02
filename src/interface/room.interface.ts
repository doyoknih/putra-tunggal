import { Role, Room, Service, User } from "@prisma/client";

interface UserRole extends User {
    role: Role
}

export interface RoomType extends Room {
    service: Service
    RoomUser: {
        user: UserRole
    }[];
}