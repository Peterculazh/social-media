import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { DomainException } from '../../../../common/exceptions/Domain.exception';
import { IErrorResponse } from '../../../../common/presentation/api/interfaces/error-response.interface';
import {
    InvalidPostCreationParamsException,
    InvalidPostUpdateParamsException,
    InvalidPostValueObjectParamsException,
    PostCreationBadParamsException,
    PostNotFoundException,
    PostUpdatingBadParamsException,
} from '../../../domain/exceptions';

@Catch(DomainException)
export class PostPresentationExceptionFilters implements ExceptionFilter {
    catch(exception: DomainException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = HttpStatus.BAD_REQUEST;
        const errorResponse: IErrorResponse = {
            statusCode: status,
            message: exception.message,
        };

        switch (true) {
            case exception instanceof InvalidPostCreationParamsException ||
                exception instanceof InvalidPostUpdateParamsException ||
                exception instanceof InvalidPostValueObjectParamsException ||
                exception instanceof PostCreationBadParamsException ||
                exception instanceof PostUpdatingBadParamsException:
                errorResponse.statusCode = HttpStatus.BAD_REQUEST;
                break;
            case exception instanceof PostNotFoundException:
                errorResponse.statusCode = HttpStatus.NOT_FOUND;
                break;
            default:
                errorResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                break;
        }

        response.status(errorResponse.statusCode).json(errorResponse);
    }
}
