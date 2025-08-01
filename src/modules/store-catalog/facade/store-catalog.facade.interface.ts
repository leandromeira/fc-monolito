export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export interface UpdateSalesPriceStoreCatalogFacadeInputDto {
  id: string;
  salesPrice: number;
}

export interface UpdateSalesPriceStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export default interface StoreCatalogFacadeInterface {
  find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto>;
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
  updateSalesPrice(
    input: UpdateSalesPriceStoreCatalogFacadeInputDto
  ): Promise<UpdateSalesPriceStoreCatalogFacadeOutputDto>;
}
