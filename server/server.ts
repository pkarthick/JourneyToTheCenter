import { listenAndServe } from "https://deno.land/std/http/server.ts";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";

import { play } from "./play.ts";

listenAndServe({ port: 3000 }, async (req) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      req.respond({
        status: 200,
        headers: new Headers({
          "content-type": "text/html",
        }),
        body: await Deno.open("./dist/index.html"),
      });
    } // WebSockets Chat
    else if (req.url === "/ws") {
      if (acceptable(req)) {
        acceptWebSocket({
          conn: req.conn,
          bufReader: req.r,
          bufWriter: req.w,
          headers: req.headers,
        }).then(play);
      }
    } else {
      let type = "text/html";

      if (req.url.endsWith(".css")) {
        type = "text/css";
      }

      req.respond({
        status: 200,
        headers: new Headers({
          "content-type": type,
        }),
        body: await Deno.open("./dist" + req.url),
      });
    }
  }
});

// console.log(new Hash("sha1").digestString("nikhil").hex());
// console.log(new Hash("sha1").digestString("netra").hex());
// console.log(new Hash("sha1").digestString("dhanya").hex());
// console.log(new Hash("sha1").digestString("darshith").hex());
// console.log(new Hash("sha1").digestString("oviya").hex());

console.log("Server running on localhost:3000");
