import mongoose from 'mongoose';

let isConnected = false; // globaler Verbindungsstatus

export async function connectToDB() {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI ist nicht definiert in .env.local");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'beeftrace',
    });

    isConnected = true;
    console.log("✅ MongoDB verbunden:", db.connection.host);
  } catch (error) {
    console.error("❌ Fehler bei MongoDB-Verbindung:", error);
    throw error;
  }
}