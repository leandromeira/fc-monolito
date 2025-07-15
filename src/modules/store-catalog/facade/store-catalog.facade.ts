import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import UpdateSalesPriceProductUseCase from "../usecase/update-sales-price/find-product.usecase";
import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
  UpdateSalesPriceStoreCatalogFacadeInputDto,
  UpdateSalesPriceStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: FindProductUseCase;
  findAllUseCase: FindAllProductsUsecase;
  updateSalesPriceUseCase: UpdateSalesPriceProductUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: FindProductUseCase;
  private _findAllUseCase: FindAllProductsUsecase;
  private _updateSalesPriceUseCase: UpdateSalesPriceProductUseCase;

  constructor(props: UseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._findAllUseCase = props.findAllUseCase;
    this._updateSalesPriceUseCase = props.updateSalesPriceUseCase;
  }

  async find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this._findUseCase.execute(id);
  }
  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this._findAllUseCase.execute();
  }
  async updateSalesPrice(
    input: UpdateSalesPriceStoreCatalogFacadeInputDto
  ): Promise<UpdateSalesPriceStoreCatalogFacadeOutputDto> {
    return await this._updateSalesPriceUseCase.execute(input);
  }
}
