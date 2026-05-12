const { scryptSync, timingSafeEqual } = require('crypto');
const hash = '$scrypt$n=16384,r=8,p=1$XETsNjffu9lmH23B2H6Ynw$TOQmJcw4R05z02Xw5E0sgkKhgRCnyGzVAgV+ocacHiLVGk1pFy3sM29A6FpHLy6qbaZLNB4Tavk7zHZ5VQ+YLg';
const parts = hash.split('$');
const params = parts[2];
const salt = Buffer.from(parts[3], 'base64');
const key = Buffer.from(parts[4], 'base64');
const [nPart, rPart, pPart] = params.split(',');
const N = Number(nPart.split('=')[1]);
const r = Number(rPart.split('=')[1]);
const p = Number(pPart.split('=')[1]);
const candidates = ['12312345','12345678','senha1234','senha12345','ronaldo123','ronaldo1','abc12345'];
for (const candidate of candidates) {
  const derived = scryptSync(candidate, salt, key.length, { N, r, p });
  const ok = timingSafeEqual(derived, key);
  console.log(candidate, ok);
}
