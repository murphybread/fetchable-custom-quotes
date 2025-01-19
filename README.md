# fetchable-custom-quotes

명언 정리하기

이유
나만의 명언 정리하기
기억하고 싶은 명언을 정리하기
누군가에게 들은 대로 또는 그것을 나만의 해석으로 변환하거나 또는 내 스스로 생각한 명언들을 정리해봅니다
**내가 표기하고 싶은 정보를 임베딩 형태로 만들어서 웹에서 사용하고 싶게 만들기가 포인트**

아키텍쳐
![애플리케이션 아키텍쳐](./Drawing%202025-01-19%2022.03.20.excalidraw.png)

## 사용 방법

data.json에 다음의 양식의 파일을 작성

```json
{
  "content": "팀 프로젝트가 개인 프로젝트보다 난이도가 항상 높다",
  "author": "계동원",
  "type": "quote",
  "id": "013ebc01-5ed5-45b0-baea-c3f4d2fe72fa"
}
```

### vercel funtion기준으로 리 라우팅됨

기본 경로에서 data.json출력
`?id=013ebc01-5ed5-45b0-baea-c3f4d2fe72fa`파라미터로 해당 quote 출력

#### 기술

data.js 와 같은 형태로 파일 형태로 저장한 후 어디에서든 fetch가능한 형태가 best
클라이언트쪽에서는 API형태로 간단하게 호출

data.js
실제 명언 내용: 문자열. 한국어,영어 모두 포함하게 UTF
작가: 해당 명언을 말한 작가
종류: 내가 생각한 `original`인지, 다른사람이 말한 `quote`, 아니면 다른사람이 말한 것을 내식대로 해석한 `interpretation`
ID: key관리를 위한 ID 발급. ID는 DB를 따로 쓰지 않기 때문에 확인하기 위해 `UUID`사용 - UUID사용이유는 고유성 보장. 순차적으로 1,2,3,4도 고려해봤지만 명언이 수정되거나 중간에 삭제되는 경우 구조에 문제가 발생. - UUID는 버전 4 사용

```
content: string
author: string
type: 'original' | `quote` | `interpretation`
id: `uuid`

```

보안성은 낮음
무료 필수
외부 웹에서 링크나 api형태로 사용가능해야함
특히 md파일에서 사용가능형태가 필요함

AI 검색 추천

- GitHub Pages
- jsDelivr

# 중요 결정

여기서 결정해야하나? 옵시디언내부 md파일용일지, 아니면 외부 웹서버 용도로 사용할지?
일단 md파일을 기준으로 표기하는 것은 버리기. data.js를 활용해야하고 웹상에서 가져오기 위해서 웹에서 동작하는 프로젝트로 설정

어려움
무료 정적사이트는 API형태가 불간으함. 사용하는 측에서는 간단하게 주소만 입력해서 API 호출하듯이 사용하고 싶었음
왜냐하면 특정 작가나, ID를 명언에서 쿼리하고 싶었으나 이런 REST API 동작은 정적 사이트에서는 불가

그렇다면 해결 법은 클라이언트 측에서 query하는 JavaScript 로직을 구현하여 정적사이트 data.js를 가져다 쓰기
or
REST API를 구현한 서버 엔드포인트를 만들어서 클라이언트측에서는 주소만 검색하는 형태로 구현

즉 다른 곳에서 일반적으로 사용가능하게 만드는 점은 포기하기로하고 내 특별한 케이스인 IT블로그에서 호출용, 그래서 클라이언트에서 구현하는 방법으로만 고려하기
(무료인 정적사이트를 사용하기 위해)

**일단 로컬에서 구현해보고 동작 한다면, 실제 사용할 웹 블로그 페이지에 script방식으로 넣어보기**

테스트 결과 일단 서버만드는게 제일 현실적임

api형식이 아니다보니 웹 블로그에서 그럼 query방식을 사용해야하는데, 이를 옵시디언 md파일에서 구현해야함. 매우매우 어려움
나중에 파일 추가하는것도 번거롭기 때문에 파일 관리까지 가능한 서버를 만드는게 제일로 결론

vercel funtion(serverless)를 사용하기로함

- 무료
- vercel 플랫폼 많이 사용해봄
- node환경에서도 쉽게 배포 가능

옵시디언에서 플러그인 형태로 req가능 확인
하지만 표기가 안됨
dataview로 표기되는 것 확인

### 검색용 id 리팩토링 필요성 제기

기존에 느꼈던 문제. id로 찾기에는 검색하거나 기억하기에는 직관적이지가 않다.
이 프로젝트의 명언을 검색하는 목적에 맞춰 명언관련 데이터는 어떻게 저장하고 어떤 값을 키로 검색해야할까?

시간 제한 상태에서 개발 테스트

- 1시간 20분 1차 로컬테스트로 Github Pages로 테스트까지 완료한 시간
- 1시간 30분 2차 vercel을 통한 동적 라우팅 방식의 서버로 기능 테스트
- 1시간 30분 3차 id로 검색하는 기존 기능에서 단어가 content에 일부 포함돼있는경우 검사하는 로직 추가
