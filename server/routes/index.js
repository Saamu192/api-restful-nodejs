import { Router } from "express";

const routes = Router();

routes.get("/favicon.ico", (req, res) => {
  res.writeHead(200, { "Content-Type": "image/x-icon" });
  return res.end("");
});

routes.get("/", (req, res) => {
  res.send("Hello World");
});

export { routes };
