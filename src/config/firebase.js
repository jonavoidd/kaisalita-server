const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccountPath =
  process.env.FIREBASE_KEY_PATH ||
  "../../secret/student-concerns-cddf6-firebase-adminsdk-fbsvc-ddd9c7e9ea.json";
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const testConnection = async () => {
  try {
    const docRef = db.collection("testCollection").doc("testDocument");
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log("Document does not exist");
    }

    console.log("Successfully connected to firestore db");
  } catch (error) {
    console.error("Error connecting to firestore database:", error);
  }
};

module.exports = { db };
