// netlify/functions/getArticles.js
const { MongoClient } = require("mongodb");

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("ingeri"); // change if your DB name is different
  cachedDb = db;
  return db;
}

exports.handler = async function (event, context) {
  const db = await connectToDatabase(process.env.MONGO_URI);
  const articles = await db.collection("articles").find({}).toArray();

  return {
    statusCode: 200,
    body: JSON.stringify(articles),
  };
};
