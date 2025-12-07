import React from "react";

export const Toman = (count: number) => {
  const price = count?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return price + " تومان";
};



export const formatNumber = (num: number | string) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
