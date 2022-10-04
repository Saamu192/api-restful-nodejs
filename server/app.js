import express from "express";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { pageNotFount } from "./middlewares/notPage.middleware.js";
import { routes } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/", routes);

app.use(pageNotFount);
app.use((err, req, res, next) => {
  if (err.status !== 404) console.log(err.stack);
  res.status(err.status || 500).json({ err: err.message });
});

app.listen(3000, () => {
  console.log("Server runing at port 3000");
});
