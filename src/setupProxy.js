const fs = require("fs");
const path = require("path");
const https = require("https");
const { URL } = require("url");
const fetch = require("node-fetch");

/*const xrfKey = "abcdefghijklmnop";
const CWD = process.cwd();
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  //ca: [fs.readFileSync(path.resolve(CWD, 'certs/root.pem'))],
  key: fs.readFileSync(path.resolve(CWD, "certs/client_key.pem")),
  cert: fs.readFileSync(path.resolve(CWD, "certs/client.pem")),
  // passphrase: "123456"
});*/

module.exports = function (app) {
  app.use("/extensions/powerkpi", async function (req, res, next) {
    res.json({"ver":"201804","controlNumber":"fc3c22b0-4bfd-11ea-9b8d-1d3750b9ea4d","name":"RBC license","expirationDate":"2099-12-31T00:00:00.000Z","data":"baeb75441b501d0cab37ddea15f30ca8e6b3adaf4bf7b1f67605e1bfd676aae2"});
  });
  app.use("/qrs/extension/full", async function (req, res, next) {
    res.redirect(`${process.env.QLIK_SERVER_SCHEME}://${process.env.QLIK_SERVER}${req.originalUrl}`);
    });
  
  /*app.use("/dev-api/getTicket", async function (req, res, next) {
    let data;
    try {
      const response = await fetch(
        `https://${process.env.REACT_APP_QLIK_SERVER}:4243/qps/${process.env.REACT_APP_QLIK_PROXY}ticket?xrfkey=${xrfKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Qlik-Xrfkey": xrfKey,
          },
          body: JSON.stringify({
            UserDirectory: process.env.REACT_APP_QLIK_DIR,
            UserId: process.env.REACT_APP_QLIK_USER,
            Attributes: [],
          }),
          agent: httpsAgent,
        }
      );
      data = await response.json();
    } catch (e) {
      console.error(e);
    }

    res.json(data);
  });

  app.use("/dev-api/auth", async (req, res, next) => {
    const targetId = req.query.targetId;
    const resturi = req.query.proxyRestUri;
    const urlObject = new URL(resturi);
    console.log("url object", urlObject);

    console.log("targetId", targetId);
    console.log("resturi", resturi);

    let data;
    try {
      const response = await fetch(
        `https://${process.env.REACT_APP_QLIK_SERVER}:4243/qps/${process.env.REACT_APP_QLIK_PROXY}ticket?xrfkey=${xrfKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Qlik-Xrfkey": xrfKey,
          },
          body: JSON.stringify({
            UserDirectory: process.env.REACT_APP_QLIK_DIR,
            UserId: process.env.REACT_APP_QLIK_USER,
            Attributes: [],
            TargetId: targetId,
          }),
          agent: httpsAgent,
        }
      );
      data = await response.json();
    } catch (e) {
      console.error(e);
    }

    let redirectURI;
    if (resturi.indexOf("?") > 0) {
      redirectURI =
        resturi + "&targetId=" + targetId + "&qlikTicket=" + data.Ticket;
    } else {
      redirectURI =
        resturi + "?targetId=" + targetId + "&qlikTicket=" + data.Ticket;
    }
    console.log("redirectURI", redirectURI);

    res.redirect(redirectURI);
  });*/
};
