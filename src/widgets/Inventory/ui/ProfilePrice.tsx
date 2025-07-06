import { Arrow2Icon } from '@/shared';

export const ProfilePrice = () => {
  return (
    <div className="mb-4">
      <div className="relative right-0 left-0 min-h-[44px] w-full min-w-auto overflow-hidden rounded-[4px] bg-[#424242]">
        <div className="flex h-[44px] w-full cursor-pointer flex-row items-center px-4">
          <div className="flex w-full flex-row items-center overflow-hidden pr-2">
            <div className="mr-auto">
              <span className="mr-1.5 leading-5">
                Profile price for
                <label>3 items</label>
              </span>
              <span>icon</span>
            </div>
            <div className="flex items-start">
              <div className="mr-1 flex min-h-5 flex-row flex-nowrap items-center p-1 text-[#8851f6]">
                <div className="mr-1">
                  <Arrow2Icon width={14} height={14} />
                </div>
                <span>$0.31</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
