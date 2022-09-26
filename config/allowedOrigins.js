const allowedOrigins = [
  /*"[Your deployed web domain]"*/
  "http://localhost:4000",
  "http://localhost:3000",
];
/*Try http://127.0.0.1:3000 or http://127.0.0.1:5500 if LH3k doesnt work*/
/*Make sure to REMOVE DEV SERVERS from ALLOWED ORIGINS after full deployment*/

module.exports = allowedOrigins;
