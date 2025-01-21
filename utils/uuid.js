export function simpleUUID() {
  const randomValues = new Uint8Array(16);
  crypto.getRandomValues(randomValues);

  randomValues[6] = (randomValues[6] & 0x0f) | 0x40;
  randomValues[8] = (randomValues[8] & 0x3f) | 0x80;

  let uuid = "";
  for (let i = 0; i < 16; i++) {
    uuid += randomValues[i].toString(16).padStart(2, "0");
    if (i === 3 || i === 5 || i === 7 || i === 9) {
      uuid += "-"; // 8-4-4-4-12 형식에 맞춰 하이픈 추가
    }
  }
  return uuid;
}

function simpleHexUUIDNotProper() {
  // 16진수로 표현할 수 있는 문자들
  const hex = "0123456789abcdef";
  let uuid = "";

  // UUID 형식: 8-4-4-4-12 자리
  const lengths = [8, 4, 4, 4, 12];

  lengths.forEach((length, index) => {
    // 각 부분의 길이만큼 반복
    for (let i = 0; i < length; i++) {
      // 무작위로 16진수 문자 선택
      uuid += hex[Math.floor(Math.random() * 16)];
    }
    // 마지막 부분이 아니면 하이픈 추가
    if (index < lengths.length - 1) {
      uuid += "-";
    }
  });

  return uuid;
}
