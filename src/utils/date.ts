import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const getCurrentDate = (): string => {
  return dayjs().toISOString();
};

export const formatRelativeTime = (date: string): string => {
  return dayjs(date).fromNow();
};
