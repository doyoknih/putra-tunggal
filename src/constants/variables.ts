import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const baseURL = process.env.BASE_URL;
const apiURL = `${(process.env.BASE_URL, process.env.NEXT_PUBLIC_BASE_URL)}`;
const imageURL = process.env.NEXT_PUBLIC_IMAGE;

const roleId = process.env.NEXT_PUBLIC_ROLE_USER;

export { prisma, baseURL, roleId, apiURL, imageURL };
