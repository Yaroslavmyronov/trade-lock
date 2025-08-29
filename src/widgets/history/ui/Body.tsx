export const Body = () => {
  return (
    <div className="size-full overflow-auto">
      <div className="table-row min-h-[35px] items-center">
        <div className="table-cell h-16 max-w-[120px] border-b border-[#3e4044] px-4 py-3 text-center align-middle text-xs">
          Date & Time
        </div>
        <div className="table-cell h-16 max-w-[120px] border-b border-[#3e4044] px-4 py-3 text-center align-middle text-xs">
          Operation
        </div>
        <div className="table-cell h-16 max-w-[120px] border-b border-[#3e4044] px-4 py-3 text-center align-middle text-xs">
          Nft
        </div>
        <div className="table-cell h-16 max-w-[120px] border-b border-[#3e4044] px-4 py-3 text-center align-middle text-xs">
          Item/Wallet
        </div>
        <div className="table-cell h-16 max-w-[120px] border-b border-[#3e4044] px-4 py-3 text-center align-middle text-xs">
          Money
        </div>
        <div className="table-cell h-16 max-w-[120px] border-b border-[#3e4044] px-4 py-3 text-center align-middle text-xs">
          From
        </div>
        <div className="table-cell h-16 max-w-[120px] border-b border-[#3e4044] px-4 py-3 text-center align-middle text-xs">
          To
        </div>
        <div className="table-cell h-16 max-w-[120px] border-b border-[#3e4044] px-4 py-3 text-center align-middle text-xs">
          Transaction
        </div>
        <div className="table-cell h-16 max-w-[120px] border-b border-[#3e4044] px-4 py-3 text-center align-middle text-xs">
          Status
        </div>
        {/* {items.map((trade) => (
          <TradeItem
            activeTab="Incoming"
            trade={trade}
            key={trade.tradeId}
          ></TradeItem>
        ))} */}
      </div>
      <div className="table-row min-h-[35px] items-center bg-[#ffffff0a]">
        <div className="table-cell h-16 min-w-[95px] px-4 py-1 align-middle">
          <p>zalupa</p>
        </div>
      </div>
    </div>
  );
};
