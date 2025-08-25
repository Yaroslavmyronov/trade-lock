import { formatDate } from '@/shared/lib/formateDate';

interface NotificationItemProps {
  open?: () => void;
  onRead?: () => void;
  title: string;
  body: string;
  time: string;
  imgSrc?: string;
}

export const NotificationItem = ({
  open,
  onRead,
  title,
  body,
  time,
  imgSrc,
}: NotificationItemProps) => {
  return (
    <button
      onClick={() => {
        onRead?.();
        open?.();
      }}
      className="cursor-pointer px-[18px] py-3 text-left whitespace-nowrap hover:bg-[rgba(0,0,0,.1)] hover:text-[#836EF9]"
    >
      {imgSrc && <img src={imgSrc} alt="" className="mr-3" />}
      <div>
        <h5 className="mb-0.5 max-w-[350px] text-sm leading-[22px] text-ellipsis">
          {title}
        </h5>
        <p className="mb-0.5 max-w-[350px] overflow-hidden text-sm leading-[22px] font-normal text-ellipsis text-[#adb1b8]">
          {body}
        </p>
        <span className="block text-xs leading-[18px] text-[#adb1b8]">
          {formatDate(time)}
        </span>
      </div>
    </button>
  );
};
