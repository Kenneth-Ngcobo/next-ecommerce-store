import { NextResponse } from "next/server";
import { fetchDBCategories } from "db/fetchDBCategories";

export async function GET(params) {
  const categories = await fetchDBCategories();
  return NextResponse.json(categories);
}
