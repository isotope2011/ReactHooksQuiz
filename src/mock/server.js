import { createServer } from "miragejs";
import sampleData from "./data/sample.json";
import quizData from "./data/quizData.json";

export default function ({ environment = "development" } = {}) {
  return createServer({
    environment,
    routes() {

      this.get("/api/words", (_schema, req) => {
        return sampleData;
      });

      this.get("/api/quiz", (_schema, req) => {
        return quizData;
      });

      // this.passthrough();
    },
  });
}
