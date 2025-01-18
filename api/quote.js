// api/quote.js
import quotes from "../data.json" with { type: "json" };

function findById(id) {
  const quote = quotes.find((q) => q.id === id);
  return quote ? { status: 200, data: quote } : { status: 404, data: { message: "Quote not found" } };
}

function findByContent(contentQuery) {
  const matchedQuotes = quotes.filter((q) =>
    q.content.toLowerCase().includes(contentQuery.toLowerCase())
  );

  return matchedQuotes.length > 0
    ? { status: 200, data: matchedQuotes }
    : { status: 404, data: { message: "No matching content include quotes found" } };

}


export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const id = searchParams.get("id");
  const contentQuery = searchParams.get("content");

  if (id) {
    const { status, data } = findById(id);
    return res.status(status).json(data);
  }

  if (contentQuery) {
    const { status, data } = findByContent(contentQuery);
    return res.status(status).json(data);
  }

  return res.status(200).json(quotes);
}