export const MarketItemPrice = () => {
  return (
    <div className="w-1/2 max-w-1/2 pl-5 text-[22px]">
      <div className="flex w-full flex-row items-center justify-end text-[#fff]">
        <div className="inline-flex items-center text-2xl">
          <div className="mr-[5px] inline-flex h-[18px] w-2.5 items-center"></div>
          <div className="flex items-center">
            <span>$0.15</span>
          </div>
        </div>
        <div className="flex-end mx-[5px] flex text-[12px]">(1)</div>
        <div className="w-full px-2 text-left text-[12px]">
          <span>Market items price</span>
        </div>
      </div>
    </div>
  );
};
