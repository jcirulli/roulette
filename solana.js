const web3 = require("@solana/web3.js");

exports.transferSOL = async (fromWallet, toWallet, amountSol) => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const transaction = new web3.Transaction.add(
      web3.SystemProgram.transfer({
        fromPubkey: new web3.PublicKey(
          fromWallet._keypair.publicKey.toString()
        ),
        toPubkey: new web3.PublicKey(toWallet._keypair.publicKey.toString()),
        lamports: web3.LAMPORTS_PER_SOL * amountSol,
      })
    );

    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWallet]
    );

    console.log(`Signature is ${signature}`);
    return signature;
  } catch (err) {
    console.log(err);
  }
};

exports.getWalletBalance = async (pubk) => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const balance = await connection.getBalance(new web3.PublicKey(pubk));
    return balance / web3.LAMPORTS_PER_SOL;
  } catch (err) {
    console.log(err);
  }
};

exports.airDropSol = async (wallet, transferAmt) => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    // const walletKeyPair=await web3.Keypair.fromSecretKey(Uint8Array.from())
    const fromAirDropSignature = await connection.requestAirdrop(
      new web3.PublicKey(wallet.publicKey.toString()),
      transferAmt * web3.LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
    return fromAirDropSignature;
  } catch (err) {
    console.log(err);
  }
};
