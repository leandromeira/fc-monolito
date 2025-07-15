import ProductGateway from "../../gateway/product.gateway";
import {
  UpdateSalesPriceProductInputDto,
  UpdateSalesPriceProductOutputDto,
} from "./find-product.dto";

export default class UpdateSalesPriceProductUseCase {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(
    input: UpdateSalesPriceProductInputDto
  ): Promise<UpdateSalesPriceProductOutputDto> {
    const product = await this.productRepository.find(input.id);

    if (!product) {
      throw new Error("Product not found!");
    }

    product.salesPrice = input.salesPrice;

    await this.productRepository.update(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
