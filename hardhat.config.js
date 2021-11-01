/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-truffle5")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")



const {
   API_URL,
   PRIVATE_KEY,
   RINKEBY_RPC_URL,
   MNEMONIC,
   KOVAN_RPC_URL,
   MAINNET_RPC_URL,
   ETHERSCAN_API_KEY,
   ROPSTEN_API_URL
} = process.env;

module.exports = {
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {

         // // If you want to do some forking, uncomment this
         // forking: {
         //   url: MAINNET_RPC_URL
         // }
      },
      localhost: {
      },
      kovan: {
         url: KOVAN_RPC_URL,
         // accounts: [PRIVATE_KEY],
         accounts: {
            mnemonic: MNEMONIC,
         },
         saveDeployments: true,
      },
      ropsten: {
         url: ROPSTEN_API_URL,
         // accounts: [PRIVATE_KEY],
         accounts: {
            mnemonic: MNEMONIC,
         },
         saveDeployments: true,
      },
      rinkeby: {
         url: RINKEBY_RPC_URL,
         // accounts: [PRIVATE_KEY],
         accounts: {
            mnemonic: MNEMONIC,
         },
         saveDeployments: true,
      },
      ganache: {
         url: 'http://localhost:8545',
         accounts: {
            mnemonic: MNEMONIC,
         }
      },
      mainnet: {
         url: MAINNET_RPC_URL,
         // accounts: [PRIVATE_KEY],
         accounts: {
            mnemonic: MNEMONIC,
         },
         saveDeployments: true,
      },
      polygon: {
         url: "https://rpc-mainnet.maticvigil.com/",
         // accounts: [PRIVATE_KEY],
         accounts: {
            mnemonic: MNEMONIC,
         },
         saveDeployments: true,
      },
   },
   etherscan: {
      // Your API key for Etherscan
      // Obtain one at https://etherscan.io/
      apiKey: ETHERSCAN_API_KEY
   },
   namedAccounts: {
      deployer: {
         default: 0, // here this will by default take the first account as deployer
         1: 0 // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      },
      feeCollector: {
         default: 1
      }
   },
   solidity: {
      compilers: [
         {
            version: "0.8.0"
         },
         {
            version: "0.7.0"
         },
         {
            version: "0.6.6"
         },
         {
            version: "0.4.24"
         }
      ]
   },
   mocha: {
      timeout: 100000
   }
}


/* module.exports = {
   solidity: "0.8.0",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
 */