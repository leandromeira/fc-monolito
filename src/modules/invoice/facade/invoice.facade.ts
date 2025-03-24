import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "../usecase/find/find.dto";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "../usecase/generate/generate.dto";
import {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
} from "./invoice.facade.interface";

export interface UseCasesProps {
  generateUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
}

export default class InvoiceFacade {
  private _generateUsecase: UseCaseInterface;
  private _findUsecase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._generateUsecase = usecasesProps.generateUseCase;
    this._findUsecase = usecasesProps.findUseCase;
  }

  generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<void> {
    return this._generateUsecase.execute(input);
  }

  findInvoice(
    input: FindInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDto> {
    return this._findUsecase.execute(input);
  }
}
