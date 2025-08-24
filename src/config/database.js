// const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to mongodb successful:", conn.connection.host);
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// const client = new MongoClient(process.env.MONGODB_CLIENT, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // connect to the server
//     await client.connect();

//     // send a ping to confirm connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected to mongo successfully");
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.dir);
