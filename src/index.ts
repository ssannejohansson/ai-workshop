import express from "express";
import { fileURLToPath } from "node:url";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT ?? 3000;
const publicDirectory = fileURLToPath(new URL("../public", import.meta.url));

app.use(express.json());
app.use(express.static(publicDirectory));
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
