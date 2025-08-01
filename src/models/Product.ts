import mongoose, { Document, Schema } from "mongoose";

// 🔹 1. Typdefinition für TypeScript
export interface ProductType extends Document {
  gtin: string;
  serial: string;
  name: string;
  herkunft: string;
  produktion: string;
  verfallsdatum: string;
  rueckruf: boolean;
  bild: string;
}

// 🔹 2. Schema
const ProductSchema = new Schema<ProductType>({
  gtin: String,
  serial: String,
  name: String,
  herkunft: String,
  produktion: String,
  verfallsdatum: String,
  rueckruf: Boolean,
  bild: String,
});

// 🔹 3. Export
export default mongoose.models.Product ||
  mongoose.model<ProductType>("Product", ProductSchema);
