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

    const WCNFT = await deploy('WCNFT', {
        from: deployer,
        log: true
    })
    
    log(`You have deployed an NFT contract to ${WCNFT.address}`)

    const WCNFTContract = await ethers.getContractFactory("WCNFT")
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const wcNFT = new ethers.Contract(WCNFT.address, WCNFTContract.interface, signer)
    const networkName = networkConfig[chainId]['name']

    log(`Verify with:\n npx hardhat verify --network ${networkName} ${WCNFT.address}`)

    let filepath = "./images/hearts.svg"
    let svg = fs.readFileSync(filepath, { encoding: "utf8" })
    log(`We will use ${filepath} as our SVG, and this will turn into a tokenURI. `)
    tx = await wcNFT.mintNFT(svg)
    await tx.wait(1)
    log(`You can view the tokenURI here ${await wcNFT.tokenURI(0)}`)
}

module.exports.tags = ['all', 'svg']