import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message
  })
}

const access = process.env.UNSPLASH_ACCESS_KEY!

export async function POST(req: Request) {
  try {
    const { query }: { query: string } = await req.json()
    const page = 1

    const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${access}&query=${query}&page=${page}&per_page=10`)
    const data = await res.json()

    return NextResponse.json({
      success: true,
      images: data.results
    })

  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}