import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

// ✅ Keine eigenen Props-Typen schreiben – Next.js regelt das
type Props = {
  params: {
    gtin: string;
    serial: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Produkt ${params.gtin} - ${params.serial}`,
  };
}

export default async function Page({ params }: Props) {
  await connectToDB();

  const product = await Product.findOne({
    gtin: params.gtin,
    serial: params.serial,
  }).lean();

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
      <p>
        <strong>Status:</strong>{" "}
        {product.rueckruf ? "❗ Rückruf aktiv" : "✅ In Ordnung"}
      </p>
    </main>
  );
}
