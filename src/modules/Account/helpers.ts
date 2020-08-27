export const login = async (name: string) => {
  await localStorage.setItem("username", name);
};

export const logout = async () => {
  await localStorage.removeItem("username");
};

export const getUserSession = async () => {
  const username = await localStorage.getItem("username");
  return username;
};

export const isLoggedIn = async () => {
  const username = await getUserSession();
  return Boolean(username);
};
