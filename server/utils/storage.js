const admin = require("firebase-admin");

const serviceAccount = require("../config/service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://project-app-69ec7.appspot.com"
});

module.exports = admin.storage();
