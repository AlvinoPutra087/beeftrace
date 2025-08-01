"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    gtin: "",
    serial: "",
    name: "",
    herkunft: "",
    produktion: "",
    verfallsdatum: "",
    rueckruf: false,
    bild: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin");
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>➕ Neues Produkt hinzufügen</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input name="gtin" placeholder="GTIN" onChange={handleChange} required />
        <input name="serial" placeholder="Seriennummer" onChange={handleChange} required />
        <input name="name" placeholder="Produktname" onChange={handleChange} required />
        <input name="herkunft" placeholder="Herkunft" onChange={handleChange} />
        <input name="produktion" placeholder="Produktionsdatum" type="date" onChange={handleChange} />
        <input name="verfallsdatum" placeholder="Verfallsdatum" type="date" onChange={handleChange} />
        <input name="bild" placeholder="Bildpfad (z. B. /images/xyz.jpg)" onChange={handleChange} />
        <label>
          Rückruf aktiv?
          <input name="rueckruf" type="checkbox" onChange={handleChange} />
        </label>
        <button type="submit">✅ Speichern</button>
      </form>
    </main>
  );
}