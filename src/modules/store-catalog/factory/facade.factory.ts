import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import UpdateSalesPriceProductUseCase from "../usecase/update-sales-price/find-product.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findUseCase = new FindProductUseCase(productRepository);
    const findAllUseCase = new FindAllProductsUsecase(productRepository);
    const updateUseCase = new UpdateSalesPriceProductUseCase(productRepository);

    const facade = new StoreCatalogFacade({
      findUseCase: findUseCase,
      findAllUseCase: findAllUseCase,
      updateSalesPriceUseCase: updateUseCase,
    });
    return facade;
  }
}
