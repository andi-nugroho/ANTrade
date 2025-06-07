"use client";

import Image from "next/image";

interface NFTHistoryProps {
  nftId: number;
}

export function NFTHistory({ nftId }: NFTHistoryProps) {
  // Mock transaction history
  const transactions = [
    {
      id: 1,
      type: "Minted",
      from: "0x0000...0000",
      to: "0x8B3...5F2e",
      price: 0,
      date: "2 days ago",
      avatar: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      type: "Listed",
      from: "0x8B3...5F2e",
      to: null,
      price: 1.5,
      date: "1 day ago",
      avatar: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      type: "Bid",
      from: "0x2D7...9E4a",
      to: null,
      price: 1.8,
      date: "12 hours ago",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-body-md font-medium mb-2">Transaction History</h3>
      
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center p-3 border border-border-light rounded-lg bg-background-secondary">
            <div className="h-10 w-10 relative rounded-full overflow-hidden mr-3">
              <Image
                src={tx.avatar}
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-body-sm font-medium">{tx.type}</span>
                <span className="text-body-sm">{tx.price} ETH</span>
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-body-xs text-text-tertiary">From:</span>
                  <span className="text-body-xs text-text-secondary">{tx.from}</span>
                </div>
                
                <span className="text-body-xs text-text-tertiary">{tx.date}</span>
              </div>
              
              {tx.to && (
                <div className="flex items-center gap-1">
                  <span className="text-body-xs text-text-tertiary">To:</span>
                  <span className="text-body-xs text-text-secondary">{tx.to}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
