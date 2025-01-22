import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname 대체 (ESM에서는 __dirname이 없음)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

// JSON 데이터 파싱
app.use(express.json());

// 정적 파일 서빙 (index.html)
app.use(express.static(path.join(__dirname)));

// data.json 파일 경로
const dataFilePath = path.join(__dirname, "data.json");

// data.json 파일 읽기
let quotes = [];
fs.readFile(dataFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("파일 읽기 오류:", err);
  } else {
    quotes = JSON.parse(data); // 파일 내용을 quotes 배열에 저장
  }
});

// 명언 데이터 조회 API
app.get("/api/quotes", (req, res) => {
  res.json(quotes); // quotes 배열을 JSON 형태로 반환
});

app.delete("/api/quotes/:id", (req, res) => {
  const id = req.params.id;
  console.log(`id: ${id} , quotes: ${quotes}`);
  // quotes 배열에서 해당 id를 가진 명언 찾기
  const index = quotes.findIndex((quote) => quote.id === id);

  if (index !== -1) {
    // 명언 삭제
    quotes.splice(index, 1);

    // 수정된 데이터를 파일에 저장
    fs.writeFile(dataFilePath, JSON.stringify(quotes, null, 2), (err) => {
      if (err) {
        return res.status(500).send("파일 쓰기 오류");
      }
      res.status(200).send("명언이 성공적으로 삭제되었습니다.");
    });
  } else {
    res.status(404).send("명언을 찾을 수 없습니다.");
  }
});

// 명언 데이터 추가 API
app.post("/api/quotes", (req, res) => {
  const newQuote = req.body;

  quotes.push(newQuote); // 새로운 명언 추가

  // 수정된 데이터를 파일에 저장
  fs.writeFile(dataFilePath, JSON.stringify(quotes, null, 2), (err) => {
    if (err) {
      return res.status(500).send("파일 쓰기 오류");
    }
    res.status(201).send("데이터가 성공적으로 저장되었습니다.");
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
