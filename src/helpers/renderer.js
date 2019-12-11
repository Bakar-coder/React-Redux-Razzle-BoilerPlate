import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";
import Routes from "../Routes";
import { Provider } from "react-redux";
import serialize from "serialize-javascript";

export default (req, store, context) => {
  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
  const helmet = Helmet.renderStatic();

  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.url}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  return `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <title>TechHub Africa</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
        ${
          process.env.NODE_ENV === "production"
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
    </body>
</html>`;
};
