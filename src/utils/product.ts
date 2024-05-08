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
