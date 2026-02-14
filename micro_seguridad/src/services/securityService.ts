import { Token } from "../models";

export const createToken = async () => {
  let tokenValue = "";
  let isUnique = false;

  while (!isUnique) {
    tokenValue = Math.floor(10000000 + Math.random() * 90000000).toString();

    const existing = await Token.findOne({
      where: { token_value: tokenValue },
    });
    if (!existing) isUnique = true;
  }
  return await Token.create({
    token_value: tokenValue,
    is_used: false,
  });
};

export const verifyToken = async (tokenValue: string) => {
  const tokenRecord = await Token.findOne({
    where: {
      token_value: tokenValue,
      is_used: false,
    },
  });

  return !!tokenRecord;
};
