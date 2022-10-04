import app from "./server/app.js";
import cluster from "cluster";
import os from "os";

const cpus = os.cpus();
const onWorkerError = (code, signal) => console.log(code, signal);

if (cluster.isPrimary) {
  cpus.map(() => {
    const worker = cluster.fork();
    worker.on("error", onWorkerError);
  });
  cluster.on("exit", (err) => {
    const worker = cluster.fork();
    worker.on("error", onWorkerError);
    console.log("A new worker rises", worker.process.pid);
  });
  cluster.on("exit", (err) => console.log(err));
} else {
  app.listen(3000, () => {
    console.log("Server runing at port 3000");
  });
  app.on("error", (err) => console.log(err));
}
