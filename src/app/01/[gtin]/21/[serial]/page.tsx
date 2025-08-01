export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function ProductPage({ params }: { params: { gtin: string; serial: string } }) {
  await connectToDB();

  const product = await Product.findOne({
    gtin: params.gtin,
    serial: params.serial,
  }).lean();

  if (!product) return notFound();

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
