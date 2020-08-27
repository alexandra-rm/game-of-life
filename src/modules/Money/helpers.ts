export const saveCash = async (username: string, cash: number) => {
  await localStorage.setItem(`${username}#cash`, cash.toString());
};

export const getUserCash = async (username: string) => {
  const userCash = await localStorage.getItem(`${username}#cash`);
  if (!userCash) return 0;
  return Number.parseFloat(userCash);
};
