require('dotenv').config();
// FIXME Add dynamic contract config helper
const { RINKEBY_CONTRACT_ADDRESS, RINKEBY_RPC_URL, PUBLIC_KEY, PRIVATE_KEY } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const web3 = createAlchemyWeb3(RINKEBY_RPC_URL);
const contract = require("../artifacts/contracts/WCNFT.sol/WCNFT.json")
const nftContract = new web3.eth.Contract(contract.abi, RINKEBY_CONTRACT_ADDRESS)


async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': RINKEBY_CONTRACT_ADDRESS, // FIXME replace with a dynamic address of the contract
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)

    signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

// FIXME - Replace the stub with a real link.
mintNFT("https://gateway.pinata.cloud/ipfs/Qmc861EfjwbymjSzBEjmZnsq51u8MgNWW6vTjPU8N7DBck")

