import { NextResponse } from "next/server";

export const ResponseHandler = {
  get<T>(data: T, message = "Success") {
    return NextResponse.json({
      status: 200,
      message,
      data,
    });
  },

  created<T>(data: T, message = "Created") {
    return NextResponse.json({
      status: 201,
      message,
      data,
    });
  },

  updated<T>(data: T, message = "Updated") {
    return NextResponse.json({
      status: 201,
      message,
      data,
    });
  },

  deleted<T>(data: T, message = "Deleted") {
    return NextResponse.json({
      status: 201,
      message,
      data,
    });
  },

  InvalidData(message = "Invalid Data") {
    return NextResponse.json({
      status: 400,
      message,
    });
  },

  Unauthorized(message = "Unauthorized") {
    return NextResponse.json({
      status: 401,
      message,
    });
  },

  serverError(message = "Internal Server Error") {
    return NextResponse.json({
      status: 500,
      message,
    });
  },

  notAllowed(message = "Method Not Allowed") {
    return NextResponse.json({
      status: 405,
      message,
    });
  }
};
