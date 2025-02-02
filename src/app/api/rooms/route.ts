import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";
import { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const serviceId = request.nextUrl.searchParams.get('serviceId')
        const userData = (await headers()).get('x-user-data');
        if (!userData) {
            return ResponseHandler.Unauthorized();
        }
        const user: JwtPayload = JSON.parse(userData);
        const rooms = await prisma.room.findMany({
            where: {
                RoomUser: {
                    some: {
                        userId: user.id
                    }
                },
                AND: serviceId ? {
                    serviceId: serviceId
                }: undefined
            },
            include: {
                RoomUser: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                namaLengkap: true,
                                email: true,
                                role: true,
                                foto: true,
                            }
                        }
                    }
                },
                service: true
            }
        })

        
        return ResponseHandler.get(rooms);

    }
    catch (error) {
        return ResponseHandler.serverError((error as Error)?.message);
    }
}