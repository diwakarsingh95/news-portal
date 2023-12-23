import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const relativeTimeToDate = (date: string) => dayjs(date).fromNow();
