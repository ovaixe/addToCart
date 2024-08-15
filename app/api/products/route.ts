import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = "https://fakestoreapi.com/products";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Return the data with status 200
    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    console.error(err);

    // Return the error with status 400
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
