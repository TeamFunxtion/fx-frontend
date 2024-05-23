import moment from "moment";
import _ from "moment";
import toast from "react-hot-toast";

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const elapsedTime = (date: string): string => {
  const start = new Date(date);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < 60) return "방금 전";

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  return `${start.toLocaleDateString()}`;
};

export const dateFormatterYYYYMMDD = (date: string) => {
  if (!date) return "";
  return moment(date).format("YYYY.MM.DD");
};

export const dateFormatterYYYYMMDDHHmm = (date: string) => {
  if (!date) return "";
  return moment(date).format("YYYY.MM.DD HH:mm");
};

export const numberFormatter = (num: number) => {
  let returnString = num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return returnString;
};

export const copyClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("클립보드에 복사 완료!");
  } catch (e) {}
};

export const getNotificationIcons = (type: string) => {
  switch (type) {
    case "auction_winner":
      return "👏";
    case "auction_miss":
      return "😡";
    default:
      return "😀";
  }
};
