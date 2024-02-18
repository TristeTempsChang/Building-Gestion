// Params for @POST

export type CreateBuildingParams = {
  address: string;
}

export type CreateTypeParams = {
  name: string;
  maximum_capacity: number;
}

export type CreateOptionParams = {
  name: string;
}

export type CreateOwnerParams = {
  name: string;
  account_number: number;
  have_TVA: boolean;
}

export type CreateFacilitiesParams = {
  name: string;
  isSecure: boolean;
}

export type CreateApartmentParams = {
  floor: number;
  door_number: number;
}