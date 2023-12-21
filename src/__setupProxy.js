const fs = require("fs");
const path = require("path");
const https = require("https");
const { URL } = require("url");
const fetch = require("node-fetch");

const xrfKey = "abcdefghijklmnop";
const CWD = process.cwd();
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  //ca: [fs.readFileSync(path.resolve(CWD, 'certs/root.pem'))],
  key: fs.readFileSync('./CA/localhost/localhost.decrypted.key'),
  cert: fs.readFileSync('./CA/localhost/localhost.crt'),
  passphrase: "Light113"
});

module.exports = function (app) {
  app.use("/dev-api/getTicket", async function (req, res, next) {
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
  });
};
