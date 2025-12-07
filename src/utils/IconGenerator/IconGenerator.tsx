import { FacilityType } from "@/types/responses/ResponsesTypes";
import { Icon } from "@chakra-ui/react";
import {
  Cigarette,
  LetterCircleP,
  Toilet,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";

export const IconFacility = ({type}: {type:FacilityType}) => {
  const icons = {
    [FacilityType.FreeWifi]: WifiHigh,
    [FacilityType.Meal]: WifiHigh,
    [FacilityType.OpenSpace]: WifiHigh,
    [FacilityType.Parking]: LetterCircleP,
    [FacilityType.Smoking]: Cigarette,
    [FacilityType.Wc]: Toilet,
  };
  return <Icon mx="0" as={icons[type]} />;
};
