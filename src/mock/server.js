import { createServer } from "miragejs";
import sampleData from "./data/sample.json";
import quizData from "./data/quizData.json";

export default function ({ environment = "development" } = {}) {
  return createServer({
    environment,
    routes() {
      this.get("/api/words", () => {
        return sampleData;
      });

      this.get("/api/quiz", () => {
        return quizData;
      });

      this.get("/api/quiz/:id", (_schema, req) => {
        let id = req.params.id;
        console.log("dynamic segment id", id, quizData[id]);
        return quizData[id];
      });

      this.post("/api/quiz", (schema, req) => {
        const { answer, ansType } = JSON.parse(req.requestBody) || {};
        console.log("post body data", answer, ansType);
        return { status: "success", answer, ansType };
      });

      this.passthrough();
    },
  });
}
