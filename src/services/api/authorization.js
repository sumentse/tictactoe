import { post } from "./base";

const Authorization = {
  signup: (email) => post("/auth", { email }),
  logout: () => sessionStorage.clear(),
};

export default Authorization;
