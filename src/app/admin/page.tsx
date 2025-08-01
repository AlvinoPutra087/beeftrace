import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";

export const dynamic = "force-dynamic";

type ProductType = {
  _id: string;
  gtin: string;
  serial: string;
  name: string;
  herkunft: string;
  produktion: string;
  verfallsdatum: string;
  rueckruf: boolean;
  bild: string;
};

export default async function AdminDashboard() {
  await connectToDB();
  const products: ProductType[] = await Product.find().lean();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>📋 Produktübersicht</h1>
      <Link href="/admin/add">➕ Neues Produkt</Link>
      <table style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>GTIN</th>
            <th>Serial</th>
            <th>Bearbeiten</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.gtin}</td>
              <td>{product.serial}</td>
              <td>
                <Link href={`/admin/edit/${product._id}`}>✏️ Bearbeiten</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}