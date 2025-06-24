// netlify/functions/mongoHandler.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event, context) {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("your_db");
    const data = await db.collection("your_collection").find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error: " + error.message,
    };
  } finally {
    await client.close();
  }
};
