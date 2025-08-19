import dayjs from 'dayjs';
export const formatDate = (dateString: string) => {
  const date = dayjs(dateString);
  const now = dayjs();

  if (date.isSame(now, 'day')) {
    return `Today ${date.format('HH:mm')}`;
  }

  return date.format('MM-DD HH:mm');
};
