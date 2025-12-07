import { IEventItem } from "@/types/responses/ResponsesTypes";
import React from "react";

export const IsShowDiscount = ({
  basePrice,
  finalPrice,
}: {
  basePrice: number;
  finalPrice: number;
}) => {
  return basePrice !== finalPrice;
};
