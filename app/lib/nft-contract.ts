// A standard ERC721 ABI with a 'safeMint' function.
// You can generate a similar one using OpenZeppelin Wizard.
export const nftContractAbi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function safeMint(address to, string memory uri)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
]

// IMPORTANT: Replace these placeholder addresses with your actual
// deployed smart contract addresses on each chain.
export const nftContractAddress: { [key: number]: string } = {
  // Sepolia Testnet
  11155111: "0xYourSepoliaContractAddress...",
  // Polygon Mainnet
  137: "0xYourPolygonContractAddress...",
  // Base Mainnet
  8453: "0xYourBaseContractAddress...",
  // OP Mainnet
  10: "0xYourOptimismContractAddress...",
  // Add other supported chain IDs and addresses here
  56: "0xYourBscContractAddress...",
  1946: "0xYourSoneiumContractAddress...",
  57073: "0xYourInkContractAddress...",
  480: "0xYourWorldchainContractAddress...",
  1135: "0xYourLiskContractAddress...",
}
