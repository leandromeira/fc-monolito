export interface UpdateSalesPriceProductInputDto {
  id: string;
  salesPrice: number;
}

export interface UpdateSalesPriceProductOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}
