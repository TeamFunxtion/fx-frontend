import { categories } from "@/app/constants";
import _ from "lodash";

export const getProductQualityNameKR = (typeId: string) => {
  switch (typeId) {
    case "QU01":
      return "중고";
    case "QU02":
      return "새 상품";
    default:
      return typeId;
  }
};

export const getProductSalesNameKR = (typeId: string) => {
  switch (typeId) {
    case "SA01":
      return "경매";
    case "SA02":
      return "블라인드 경매";
    case "SA03":
      return "대화 거래";
    default:
      return typeId;
  }
};

export const getCategoryNameKR = categoryId => {
  return _.find(categories, { categoryId }).categoryName;
};
