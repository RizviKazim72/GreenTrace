package com.greentrace.server.controller;

import com.greentrace.server.dto.LoginRequest;
import com.greentrace.server.dto.SignUpRequest;
import com.greentrace.server.model.User;
import com.greentrace.server.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Authentication Controller
 * Handles user signup, login, and authentication-related operations
 * Provides comprehensive error handling and validation
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * User signup endpoint
     * Creates a new user account with validation
     * 
     * @param request SignUpRequest with user details
     * @param bindingResult Validation results
     * @return ResponseEntity with created user or error messages
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest request, BindingResult bindingResult) {
        
        // Check for validation errors
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> 
                errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Validation failed",
                "errors", errors
            ));
        }

        try {
            User createdUser = userService.signUp(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "Account created successfully! Welcome to GreenTrace.",
                "user", Map.of(
                    "id", createdUser.getId(),
                    "firstName", createdUser.getFirstName(),
                    "lastName", createdUser.getLastName(),
                    "email", createdUser.getEmail()
                )
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "An error occurred while creating your account. Please try again."
            ));
        }
    }

    /**
     * User login endpoint
     * Authenticates user credentials
     * 
     * @param request LoginRequest with email and password
     * @param bindingResult Validation results
     * @return ResponseEntity with user data or error messages
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, BindingResult bindingResult) {
        
        // Check for validation errors
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> 
                errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Validation failed",
                "errors", errors
            ));
        }

        try {
            User loggedInUser = userService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Welcome back! Login successful.",
                "user", Map.of(
                    "id", loggedInUser.getId(),
                    "firstName", loggedInUser.getFirstName(),
                    "lastName", loggedInUser.getLastName(),
                    "email", loggedInUser.getEmail()
                )
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "success", false,
                "message", "Invalid email or password. Please check your credentials and try again."
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "An error occurred during login. Please try again."
            ));
        }
    }
}
