let { networkConfig } = require('../utils/helper-hardhat-config')
const fs = require('fs')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()

    log("----------------------------------------------------")
    const WCNFT = await deploy('WCNFT', {
        from: deployer,
        log: true
    })
    
    log(`You have deployed an NFT contract to ${WCNFT.address}`)

    const WCNFTContract = await ethers.getContractFactory("WCNFT")
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const WCNFT = new ethers.Contract(WCNFT.address, WCNFTContract.interface, signer)
    const networkName = networkConfig[chainId]['name']

    log(`Verify with:\n npx hardhat verify --network ${networkName} ${WCNFT.address}`)
    log("Let's create an NFT now!")
    let filepath = "./images/png.png"
    let png = fs.readFileSync(filepath, { encoding: "utf8" })
    log(`We will use ${filepath} as our PNG, and this will turn into a tokenURI. `)
    tx = await WCNFT.create(png)
    await tx.wait(1)
    log(`You've made your first NFT!`)
    log(`You can view the tokenURI here ${await WCNFT.tokenURI(0)}`)
}

module.exports.tags = ['all', 'png']