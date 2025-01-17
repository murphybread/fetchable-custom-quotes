// api/quote.js
import quotes from "../data.json" assert { type: "json" };

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const id = searchParams.get("id");

  if (id) {
    const quote = quotes.find((q) => q.id === id);
    if (quote) {
      return res.status(200).json(quote);
    } else {
      return res.status(404).json({ message: "Quote not found" });
    }
  } else {
    return res.status(404).json({ message: "Fetch by id is Failed" });
  }
}
