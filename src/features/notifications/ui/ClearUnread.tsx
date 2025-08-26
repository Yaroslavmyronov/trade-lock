import { BroomIcon } from '@/shared/icons/BroomIcon';

export const ClearUnread = ({
  MarkAllAsRead,
}: {
  MarkAllAsRead: () => void;
}) => {
  return (
    <div
      onClick={MarkAllAsRead}
      className="flex h-[60px] cursor-pointer items-center justify-center text-sm font-normal hover:text-[#836EF9]"
    >
      <BroomIcon className="mr-1"></BroomIcon>
      <span>Mark all as read</span>
    </div>
  );
};
