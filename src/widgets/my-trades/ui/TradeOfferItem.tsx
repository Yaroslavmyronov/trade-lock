import { Metadata } from '@/entities/trade/model/type';
import { ipfsToHttp } from '@/shared/lib/getIpfsUrl';

interface TradeOfferItemProps {
  title: string;

  metadata: Metadata[];
}

export const TradeOfferItem = ({ title, metadata }: TradeOfferItemProps) => {
  return (
    <div className="min-h-[106px] flex-[1_1_50%]">
      <div className="text-left text-xs leading-[26px]">{title}</div>
      <div className="overflow-x-visible overflow-y-auto">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(96px,_1fr))] grid-rows-[repeat(auto-fill,_96px)] gap-2">
          {metadata.map((data, index) => (
            <div key={index} className="relative size-24 cursor-default">
              <img
                className="absolute inset-0 size-full overflow-hidden object-cover select-none"
                src={
                  data.imageOriginal
                    ? ipfsToHttp(data.imageOriginal)
                    : '/images/no-media-available.jpg'
                }
                alt={data.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
