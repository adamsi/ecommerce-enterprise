package adam.dev.ecom_enterprise.exception.gql;

import adam.dev.ecom_enterprise.exception.PaymentProcessingException;
import graphql.ErrorType;
import io.jsonwebtoken.JwtException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.authorization.AuthorizationDeniedException;

import java.util.Arrays;

public enum GQLErrorType {

    JWT(ErrorType.ValidationError, JwtException.class),

    AUTH_DENIED(ErrorType.ValidationError, AuthorizationDeniedException.class),

    ENTITY_NOT_FOUND(ErrorType.DataFetchingException, EntityNotFoundException.class),

    ILLEGAL_ARGUMENT(ErrorType.ValidationError, IllegalArgumentException.class),

    PAYMENT_FAILURE(ErrorType.DataFetchingException, PaymentProcessingException.class),

    UNKNOWN_FAILURE(ErrorType.DataFetchingException, RuntimeException.class);

    public final ErrorType errorType;

    public final Class<?> exceptionClass;

    GQLErrorType(ErrorType errorType, Class<?> ex) {
        this.errorType = errorType;
        this.exceptionClass = ex;
    }

    public static GQLErrorType fromException(Class<?> exceptionClass) {
        return Arrays.stream(values())
                .filter(error-> error.exceptionClass.equals(exceptionClass))
                .findAny()
                .orElseGet(()-> GQLErrorType.UNKNOWN_FAILURE);
    }

}
