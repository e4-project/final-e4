import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  try {
    return NextResponse.json({ msg: "기록" });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  try {
    return NextResponse.json({ msg: "기록" });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
