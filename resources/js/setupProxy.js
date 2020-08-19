const proxy = require('proxy-middleware');

module.exports = app => {
  // setup proxies
  // 1st api
  app.use("/gob", proxy("http://datos.gob.cl/api/action/datastore_search?resource_id=a60f93af-6a8a-45b6-85ff-267f5dd37ad6&limit=1"));
  // 2nd api
  app.use("/cryptocompare", proxy("https://min-api.cryptocompare.com/data"));

  // Note: setupProxy is an express server so you can also override anything in the req or res before proxy them for example 
  app.use("/cryptocompare", (req,res,next) => {
     req.headers = { 
        ...req.headers,
        "my-header":"my header value"
     }
     return proxy("https://min-api.cryptocompare.com/data")(req,res,next);
  });

  app.use("/cryptocompare", proxy("https://min-api.cryptocompare.com/data"));


  // also it's better to use .env variables
  // const {REACT_APP_API_ETHERSCAN_PROXY, REACT_APP_API_ETHERSCAN_BASE_URL} = process.env;
  // app.use(REACT_APP_API_ETHERSCAN_PROXY, REACT_APP_API_ETHERSCAN_BASE_URL);      
};