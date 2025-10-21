import { NextRequest } from "next/server";
import { mockProducts } from "@/utils/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bestSellingProductsFilter = searchParams.get("mais_vendido");

  if (bestSellingProductsFilter === "true") {
    const bestSellingProducts = mockProducts.filter(
      (product) => product.best_selling === true
    );

    return Response.json(bestSellingProducts);
  }

  // Retorna todos os produtos quando o parâmetro não está presente
  return Response.json(mockProducts);
}
