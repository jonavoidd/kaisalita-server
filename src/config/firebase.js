const admin = require("firebase-admin");
const serviceAccount = require(process.env.FIREBASE_KEY_PATH);

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
