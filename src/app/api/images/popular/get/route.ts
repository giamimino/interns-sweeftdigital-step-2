import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message
  })
}

const access = process.env.UNSPLASH_ACCESS_KEY!

export async function GET() {
  try {
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=${access}&per_page=20&order_by=popular`)
    const data = await res.json()

    return NextResponse.json({
      success: true,
      images: data
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}