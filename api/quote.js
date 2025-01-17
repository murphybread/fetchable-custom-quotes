// api/quote.js
import quotes from "../data.json" with { type: "json" };

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const id = searchParams.get("id");
  const quote = quotes.find((q) => q.id === id);

  if (id !== null) {
    // Case 1: ID 파라미터가 있는 경우
    const quote = quotes.find((q) => q.id === id);
    if (quote) {
      // Case 1-1: ID에 해당하는 quote가 있는 경우
      return res.status(200).json(quote);
    } else {
      // Case 1-2: ID에 해당하는 quote가 없는 경우
      return res.status(404).json({ message: "Quote not found" , quote: quote});
    }
  } else {
    // Case 2: ID 파라미터가 없는 경우
    return res.status(404).json({ message: "ID parameter is missing" });
  }
  
}