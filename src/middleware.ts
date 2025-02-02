import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Daftar rute
const privateRoutesAdmin = ["/dashboard"];
const provateRoutesDoctor = ["/layanan", "riwayat"];
const privateRoutesUser = ["/profile", "/consultation"];
const authRoutes = ["/login", "/register"];
const publicRoutes = ["/article", "/service", "/about"];

export async function middleware(request: NextRequest) {
  const cookie = (await cookies()).get("accessToken"); // Ambil token dari cookies
  const url = request.nextUrl.clone(); // Clone URL agar bisa dimodifikasi
  const token = cookie ? cookie.value : null;

  if (token) {
    const decoded: any = jwt.decode(token);
    if (request.nextUrl.pathname.startsWith("/api")) {
      const headers = new Headers(request.headers);
      headers.set("x-user-data", JSON.stringify(decoded));
      return NextResponse.next({
        request: {
          headers,
        },
      });
    }
    if (authRoutes.some((route) => url.pathname.startsWith(route))) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    const role = decoded?.role;

    if (role === "User") {
      if (
        privateRoutesAdmin.some((route) => url.pathname.startsWith(route)) ||
        provateRoutesDoctor.some((route) => url.pathname.startsWith(route))
      ) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    // if (role === 'Dokter') {
    //   if (privateRoutesAdmin.some((route) => url.pathname.startsWith(route))) {
    //     url.pathname = "/";
    //     return NextResponse.redirect(url);
    //   }
    // }
  } else {
    // Jika tidak ada token dan mengakses private routes, redirect ke /login
    if (
      privateRoutesAdmin.some((route) => url.pathname.startsWith(route)) ||
      privateRoutesUser.some((route) => url.pathname.startsWith(route)) ||
      provateRoutesDoctor.some((route) => url.pathname.startsWith(route))
    ) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Lanjutkan ke halaman yang diminta
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*.png$|.*.jpg$|.*.jpeg$|.*.gif$|.*.svg$).*)/",
    "/:path*",
  ],
};
