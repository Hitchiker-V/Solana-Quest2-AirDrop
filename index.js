const{
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js")

// Creating a new Wallet
const newPair = new Keypair(); // Holds the public and private keys for the wallet
console.log(newPair);
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

// Finding the balance of our wallet
const getWalletBalance = async() => {
    try{
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`Wallet Balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}`);
    }catch(err){
        console.log(err);
    }
};

const airDropSol = async() => {
    try{
        // We need to create a conneciton object and a walletKeyPair object for the airdrop function
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        console.log(`--Airdropping 2 SOL --`);
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2*LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    }catch(err){
        console.log(err);
    }
};

// Testing the AirDrop

const driverFunction = async() =>{
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();

