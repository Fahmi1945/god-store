import crypto from 'crypto';

const API_KEY = process.env.VIPAYMENT_API_KEY!;
const API_ID = process.env.VIPAYMENT_API_ID!;

export const generateVipaymentSign = () => {
  // Rumus Vipayment: md5(api_id + api_key)
  return crypto
    .createHash('md5')
    .update(API_ID + API_KEY)
    .digest('hex');
};