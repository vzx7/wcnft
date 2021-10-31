async function main() {
  const WCNFT = await ethers.getContractFactory("WCNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const NFT = await WCNFT.deploy()
  console.log("Contract deployed to address:", NFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
