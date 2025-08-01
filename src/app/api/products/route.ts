import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDB();
    const created = await Product.create(body);
    return new Response(JSON.stringify(created), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Fehler beim Speichern", { status: 500 });
  }
}
