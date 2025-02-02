import { PrismaClient, Service } from "@prisma/client";

const primsaClient = new PrismaClient();

export class CreateOrderDto {
    serviceId: string;
    qty: number;
    price: number;
    layanan: 'Online' | 'Offline';

    constructor(serviceId: string, qty: number, price: number, layanan?: 'Online' | 'Offline') {
        this.serviceId = serviceId;
        this.qty = qty;
        this.price = price;
        this.layanan = layanan || 'Online';
    }

    isValid(): { valid: boolean, message?: string } {
        const valid = this.serviceId !== undefined && this.qty > 0 && this.price !== undefined;
        if (!valid) {
            return { valid: false, message: "Invalid data" };
        }
        return { valid: valid };
    }

    get total(): number {
        const total = this.price * this.qty;
        return total
    }

}