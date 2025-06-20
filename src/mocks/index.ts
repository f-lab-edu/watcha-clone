import { worker } from "./browser";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  return worker.start();
}

enableMocking();
