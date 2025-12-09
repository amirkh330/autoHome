
export type TPerson = {
  fullName: string;
  phone: string;
};

export type TUnit = {
  owner?: TPerson; // مالک
  tenant?: TPerson;
  area: number;
  people: number;
  parking: number;
  residencyType: "owner" | "tenant" | "both";
};

export type TBuilding = {
  units: TUnit[];
};
