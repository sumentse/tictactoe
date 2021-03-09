import { post } from "./base";

// we can expand this even more to keep it organize and clean
const Engine = {
  post: (board) => post(`/engine`, { board }),
};

export default Engine;
