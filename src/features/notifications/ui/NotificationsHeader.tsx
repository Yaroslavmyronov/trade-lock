interface NotificationsHeaderProps {
  unreadCount?: number;
}

export const NotificationsHeader = ({
  unreadCount,
}: NotificationsHeaderProps) => {
  return (
    <div className="mx-auto mt-4 mb-2 flex h-[50px] w-[388px] items-center justify-between gap-2.5 rounded-[8px] bg-[#202124] p-3">
      <div className="flex items-center text-sm leading-[26px] font-normal text-[#fff]">
        <span className="mr-1 text-[20px] font-bold text-[#836EF9]">
          {unreadCount}
        </span>
        <span className="leading-[22px]">New Notification</span>
      </div>
    </div>
  );
};
