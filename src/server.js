import "babel-polyfill";
import Routes from "./Routes";
import createStore from "./helpers/createStore";
import renderer from "./helpers/renderer";
import creatStore from "./helpers/createStore";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import express from "express";

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use("/api", proxy("http://localhost:80/api"))
  .get("/*", (req, res) => {
    const store = creatStore(req);
    const promises = matchRoutes(Routes, req.url)
      .map(({ route }) => {
        return route.loadData && route.loadData(store);
      })
      .map(promise => {
        if (promise) {
          console.log(promise);
          return new Promise(resolve => {
            promise.then(resolve).catch(resolve);
          });
        }
      });

    const render = () => {
      const context = {};
      const store = createStore(req);
      if (context.url) res.redirect(301, context.url);
      if (context.notFound) res.status(404);
      const content = renderer(req, store, context);
      return res.send(content);
    };

    Promise.all(promises)
      .then(render)
      .catch(render);
  });

export default server;
