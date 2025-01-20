function simpleUUID() {
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
