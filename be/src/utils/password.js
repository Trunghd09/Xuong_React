import bcryptjs from "bcryptjs";
export const hassPassword = async (password) => {
  //   const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, 10);
};
export const comparePassword = async (password, hashPassword) => {
  return await bcryptjs.compare(password, hashPassword);
};
