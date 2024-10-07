import { NextResponse } from "next/server";
import { getDBProductById } from "db/getDBProductById";

export async function GET(request, { params }) {
  let { id } = params;

  try {
    const product = await getDBProductById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 }
    );
  }
}
