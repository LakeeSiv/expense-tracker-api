import crypto from "crypto";
export const hash = (input: string) => {
  const secret = process.env.HASH_SECRET;
  return crypto
    .createHash("sha256")
    .update(input + secret)
    .digest("hex");
};
