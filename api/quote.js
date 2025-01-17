// api/quote.js
import quotes from "../data.json" with { type: "json" };

export default async function handler(req, res) {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const id = searchParams.get("id");

  if (pathname === "/") {
    if (id) {
      // ID가 있는 경우 해당 quote 반환
      const quote = quotes.find((q) => q.id === id);
      if (quote) {
        return res.status(200).json(quote);
      } else {
        return res.status(404).json({ message: "Quote not found" });
      }
    }
    // ID가 없는 경우 전체 목록 반환
    return res.status(200).json(quotes);
  } else {
    // 그 외의 모든 경로 (404 에러)
    return res.status(404).json({ message: "Not Found" });
  }
}