import { forwardRef, memo } from 'react';
import { ipfsToHttp } from '../lib/getIpfsUrl';

interface CardProps {
  title: string;
  selected?: boolean;
  onClick?: () => void;
  isSelected: boolean;
  image: string;
  price: number;
}

export const Card = memo(
  forwardRef<HTMLDivElement, CardProps>(
    ({ price, image, title, isSelected, onClick, selected }, ref) => {
      return (
        <div
          ref={ref}
          onClick={onClick}
          className={`${!isSelected && 'group hover:border-[rgba(111,104,125,0.5)]'} relative w-full overflow-hidden rounded-lg border border-[#232627] bg-[#232627] transition`}
        >
          {isSelected && !selected && (
            <div className="absolute top-0 left-0 z-30 flex size-full cursor-not-allowed flex-col items-center justify-center text-center text-[#fff] after:absolute after:top-0 after:left-0 after:z-[-1] after:h-full after:w-full after:bg-[#2a2c2e] after:opacity-90">
              <span>Selected</span>
            </div>
          )}
          <div className="relative aspect-square w-full">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="relative mx-auto my-0 size-full">
                <div className="h-full">
                  <div className="relative size-full">
                    <img
                      className="absolute inset-0 size-full overflow-hidden object-cover transition-transform duration-300 select-none group-hover:scale-110"
                      alt=""
                      loading="lazy"
                      src={
                        image
                          ? ipfsToHttp(image)
                          : '/images/no-media-available.jpg'
                      }
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`relative ${selected ? 'gap-1' : 'gap-y-1.5'} flex flex-col p-2 text-xs @md:group-[.standard]/grid:gap-y-2 @md:group-[.standard]/grid:p-3 @md:group-[.standard]/grid:text-sm`}
          >
            <div
              className={`flex ${selected ? 'h-2 text-[8px]' : 'h-4'} items-center justify-between gap-x-2 group-[.compact]/grid:h-4`}
            >
              <p className="truncate"> {title}</p>
            </div>
            <div
              className={`flex ${selected ? 'h-2 text-[8px]' : 'h-5'} items-center justify-between gap-x-1`}
            >
              {`${price} MON`}
            </div>
            {/* <div
              className={`flex ${selected ? 'h-2 text-[8px]' : 'h-5'} items-center`}
            >
              956
            </div> */}
          </div>
        </div>
      );
    },
  ),
);

Card.displayName = 'Card';
