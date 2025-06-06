import { featuredNFTs, liveAuctions } from "@/lib/mock-data";
import { NFTView } from "@/components/nft/nft-view";

// This function tells Next.js which static paths to generate at build time
export async function generateStaticParams() {
  // Get all possible NFT IDs from our mock data
  const allNFTs = [...featuredNFTs, ...liveAuctions];
  return allNFTs.map((nft) => ({
    id: nft.id.toString(),
  }));
}

export default function NFTPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  
  // Find NFT data from mock data (in a real app, this would be an API call)
  const nft = [...featuredNFTs, ...liveAuctions].find(item => item.id === id);
  
  return <NFTView nft={nft} />;
}
