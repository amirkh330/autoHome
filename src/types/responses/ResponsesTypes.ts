import { ReactNode } from "react";

export type GlobalData<T> = {
  error: any;
  is_success: boolean;
  status_code: number;
  message: string;
  response: T;
};

export interface IEventDetail {
  title: string;
  basePrice: number;
  finalPrice: number;
  availableCapacity: number;
  dateTime: string;
  host: IHostDetail;
  game: IGameDetail;
  participants: any[];
}

export interface IGameDetail {
  gameType: string;
  title: string;
  logoUrl: string;
  scenario: string;
  rules: string;
  mafia: { characters: ICharacter[] };
}
export interface ICharacter {
  title: string;
  logoUrl: string;
  description: string;
}

export interface IEventItem {
  eventId: number;
  dateId: number;
  timeId: number;
  basePrice: number;
  finalPrice: number;
  remainingCapacity: number;
  dateTime: string;
  game: IGame;
  host: IHost;
}

export interface IGame {
  title: string;
  logoUrl: string;
}

export interface IHostDetail {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  address: string;
  districtTitle: string;
}
export interface IHost {
  title: string;
  district: string;
  logoUrl: string;
}

export enum GameMode {
  mafia = "Mafia",
  golyapoch = "Golyapoch",
}

export interface ICoffeeShopListItem {
  id: number;
  title: string;
  logoUrl: string;
  rate: number;
  address: string;
}

export interface ICoffeeShopDetail {
  id: number;
  title: string;
  logoUrl: string;
  rate: number;
  address: string;
  imageUrls: [];
  description: string;
  menuUrl: string;
  facilities: [];
}
export interface IUserProfile {
  phoneNumber: string;
  currentWalletBalance: number;
  rate: number;
  fullName: string;
  avatarUrl: string;
  email: string;
  birthDate: string;
  birthDateFriendly: string;
  sex: string;
}

export enum FacilityType {
  "Parking" = "Parking",
  "FreeWifi" = "FreeWifi",
  "Meal" = "Meal",
  "Wc" = "Wc",
  "Smoking" = "Smoking",
  "OpenSpace" = "OpenSpace",
}

export interface IPanelEventCard {
  id: number;
  title: string;
  rate: number;
  logoUrl: string;
  times: IPanelEventTime[];
  status: string;
}

export interface IPanelEventTime {
  timeId: number;
  dateId: number;
  status: string;
  date: string;
  from: string;
  to: string;
  startAt: Date;
}

export interface IScenario {
  id: number;
  title: string;
  description: string;
  logoUrl: string;
  characters: IScenarioCharacter[];
}

export interface IScenarioCharacter {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
  canBeUsedMultipleTime?: boolean;
}

export interface IGamer {
  [x: string]: ReactNode;
  sitId: number;
  userId: number;
  userRate: number;
  status: string;
  userName: string;
  avatarUrl: string;
}
