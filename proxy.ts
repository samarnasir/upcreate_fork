import { NextResponse } from "next/server";

// Wireframe mode: no auth gate.
export function proxy() {
  return NextResponse.next();
}
