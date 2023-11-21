import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { DomainException } from "../../../../common/exceptions/Domain.exception";
import { UserRegistrationBadParamsException } from "../../../domain/exceptions/UserRegistrationBadParams.exception";
import { UserRegistrationConflictException } from "../../../domain/exceptions/UserRegistrationConflict.exception";
import { IErrorResponse } from "../../../../common/presentation/api/interfaces/error-response.interface";
import { InvalidUserValueObjectParamsException } from "../../../domain/exceptions/InvalidUserValueObjectParams.exception";

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = HttpStatus.BAD_REQUEST;
        const errorResponse: IErrorResponse = {
            statusCode: status,
            message: exception.message,
        };

        switch (true) {
            case exception instanceof UserRegistrationBadParamsException || exception instanceof InvalidUserValueObjectParamsException:
                errorResponse.statusCode = HttpStatus.BAD_REQUEST;
                break;
            case exception instanceof UserRegistrationConflictException:
                errorResponse.statusCode = HttpStatus.CONFLICT;
                break;
            default:
                errorResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                break;
        }

        response
            .status(errorResponse.statusCode)
            .json(errorResponse);
    }
}
