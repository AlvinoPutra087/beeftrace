export const dynamic = "force-dynamic";

import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import type { ProductType } from "@/models/Product"; // ✅ Das ist neu!

export default async function ProductPage({ params }: { params: { gtin: string; serial: string } }) {
  await connectToDB();

  const product = await Product.findOne({
    gtin: params.gtin,
    serial: params.serial,
  }).lean<ProductType>(); // ✅ So weiß TypeScript, wie "product" aussieht

  if (!product) return <p>❌ Produkt nicht gefunden</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{product.name}</h1>
      <img src={product.bild} alt={product.name} width={400} />
      <p><strong>GTIN:</strong> {product.gtin}</p>
      <p><strong>Seriennummer:</strong> {product.serial}</p>
      <p><strong>Herkunft:</strong> {product.herkunft}</p>
      <p><strong>Produktionsdatum:</strong> {product.produktion}</p>
      <p><strong>Verfallsdatum:</strong> {product.verfallsdatum}</p>
      <p><strong>Status:</strong> {product.rueckruf ? "❗ Rückruf aktiv" : "✅ In Ordnung"}</p>
    </main>
  );
}
