import crypto from 'crypto';

const USERNAME = process.env.DIGIFLAZZ_USERNAME!;
const API_KEY = process.env.DIGIFLAZZ_API_KEY!;

// Fungsi sakti untuk membuat Signature MD5
export const generateSignature = (additionalKey: string = "") => {
  // Rumus Digiflazz: md5(username + api_key + string_tambahan)
  return crypto
    .createHash('md5')
    .update(USERNAME + API_KEY + additionalKey)
    .digest('hex');
};