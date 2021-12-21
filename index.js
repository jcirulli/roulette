const web3 = require("@solana/web3.js");
const { secretKey } = require("./keydetails");

const connection = new web3.Connection(
  web3.clusterApiUrl("devnet"),
  "confirmed"
);

console.log(secretKey);
