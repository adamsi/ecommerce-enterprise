package adam.dev.ecom_enterprise.exception.rest.handler;

import adam.dev.ecom_enterprise.exception.rest.EmailSendingException;
import adam.dev.ecom_enterprise.exception.rest.ErrorResponse;
import adam.dev.ecom_enterprise.exception.rest.TokenProcessingException;
import io.jsonwebtoken.JwtException;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        log.warn("HttpMessageNotReadableException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Bad Request", ex.getMessage().split(":")[0]);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(EntityNotFoundException ex) {
        log.warn("EntityNotFoundException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Resource not found", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex) {
        log.warn("AccessDeniedException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Access denied", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(EntityExistsException.class)
    public ResponseEntity<ErrorResponse> handleResourceExists(EntityExistsException ex) {
        log.warn("EntityExistsException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Already exists", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        log.warn("MethodArgumentNotValidException caught: {}", ex.getMessage());
        StringBuilder errors = new StringBuilder();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.append(error.getField()).append(": ").append(error.getDefaultMessage()).append("; ");
        }
        ErrorResponse error = new ErrorResponse("Validation Error", errors.toString());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingRequestCookieException.class)
    public ResponseEntity<ErrorResponse> handleMissingRequestCookie(MissingRequestCookieException ex) {
        log.warn("MissingRequestCookieException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Bad Request", "Required cookie is missing: " + ex.getCookieName());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex) {
        log.warn("BadCredentialsException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Unauthorized", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleExpiredJwt(JwtException ex) {
        log.warn("JwtException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Unauthorized", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAuthDenied(AuthorizationDeniedException ex) {
        log.warn("AuthorizationDeniedException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Unauthorized", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ErrorResponse> handleInvalidJwt(SignatureException ex) {
        log.warn("SignatureException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Unauthorized", "Invalid JWT signature.");
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(EmailSendingException.class)
    public ResponseEntity<ErrorResponse> handleEmailSending(EmailSendingException ex) {
        log.warn("EmailSendingException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Internal server error", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoHandlerFound(NoHandlerFoundException ex) {
        log.warn("NoHandlerFoundException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Not Found", "The requested resource was not found");
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TokenProcessingException.class)
    public ResponseEntity<ErrorResponse> handleTokenProcessing(TokenProcessingException ex) {
        log.warn("TokenProcessingException caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Internal server error", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        log.warn("General Exception caught: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse("Internal server error", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
