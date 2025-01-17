// api/quote.js
import quotes from "../data.json" with { type: "json" };

export default async function handler(req, res) {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === "/") {
    return res.status(200).json({
      message: "Welcome to the Quotes API!",
      endpoints: {
        getAllQuotes: "/api/quote",
        getQuoteById: "/api/quote?id=<quote_id>",
      },
    });
  } else if (pathname === "/api/quote") {
    const id = searchParams.get("id");
    const quote = quotes.find((q) => q.id === id)
    if (id && quote ) {
        return res.status(200).json(quote);
    } else {
      return res.status(404).json({ message: "Quote not found", quotes: quotes  });
    }
  } else {
    return res.status(404).json({ message: "Not Proper Request" });
  }
}