// Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "base64-sol/base64.sol";

contract WCNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("WCNFT", "WCNFT") {}

    function mintNFT(string memory png)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        string memory imageURI = pngToImageURI(png);
        _setTokenURI(newItemId, formatTokenURI(imageURI));

        return newItemId;
    }

    function pngToImageURI(string memory png) public pure returns (string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory pngBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(png))));
        return string(abi.encodePacked(baseURL, pngBase64Encoded));
    }

    function formatTokenURI(string memory imageURI) public pure returns (string memory) {
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"',
                            "WCNFT",
                            /// FIXME description set by param desc 
                            '", "description":"An NFT based on SVG!", "attributes":"", "image":"',imageURI,'"}'
                        )
                    )
                )
            )
        );
    }
}
