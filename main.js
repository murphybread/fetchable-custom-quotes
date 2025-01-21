export async function deleteQuote(id) {
  try {
    const deleteResponse = await fetch(
      `http://localhost:8000/api/quotes/${id}`,
      {
        method: "DELETE",
      }
    );

    if (deleteResponse.ok) {
      alert("명언이 성공적으로 삭제되었습니다.");
      renderQuotes(); // 명언 리스트 갱신
    } else {
      throw new Error("명언 삭제에 실패했습니다.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("명언 삭제 중 오류가 발생했습니다.");
  }
}
// 명언 리스트를 화면에 표시
export async function renderQuotes() {
  try {
    const response = await fetch("http://localhost:8000/api/quotes");
    const quotes = await response.json();

    const quoteList = document.getElementById("quoteList");
    quoteList.innerHTML = ""; // 목록 초기화

    quotes.forEach((quote) => {
      const li = document.createElement("li");
      li.textContent = `${quote.content} - ${quote.author}`;

      const button = document.createElement("button");
      button.textContent = "Delete";
      button.addEventListener("click", () => {
        const isConfirmed = confirm(
          `Are you sure delte this quote?\n${quote.content} - ${quote.author}`
        );

        if (isConfirmed) {
          deleteQuote(quote.id); // 명언 삭제 함수 호출
        }
      });
      li.appendChild(button);
      quoteList.appendChild(li);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// 폼 제출 이벤트 처리
document
  .getElementById("quoteForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // 폼 데이터 수집
    const newQuote = {
      content: document.getElementById("content").value,
      author: document.getElementById("author").value,
      type: document.getElementById("type").value,
      id: document.getElementById("id").value,
    };

    try {
      // 서버로 데이터 전송
      const saveResponse = await fetch("http://localhost:8000/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuote),
      });

      if (saveResponse.ok) {
        alert("데이터가 성공적으로 저장되었습니다.");
        this.reset(); // 폼 초기화
        renderQuotes(); // 명언 리스트 갱신
      } else {
        throw new Error("데이터 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("데이터 처리 중 오류가 발생했습니다.");
    }
  });
