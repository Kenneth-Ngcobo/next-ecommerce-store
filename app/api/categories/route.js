import { NextResponse } from "next/server";
import { fetchCategories } from "db/fetchCategories";

export async function GET(params) {
  const categories = await fetchCategories();
  return NextResponse.json(categories);
}
