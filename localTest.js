const url = "https://murphybread.github.io/fetchable-custom-quotes/data.json";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function fetchQuote() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  try {
    const response = await fetch(url);
    const quotes = await response.json();

    const quote = quotes.find((q) => q.id === id);

    if (quote) {
      console.log(quote.content);
    } else {
      console.error("Quote not found with id:", id);
    }
  } catch (error) {
    console.stack("Error fetching data:", error);
  }
}

fetchQuote();
