package com.greentrace.server.controller;

import com.greentrace.server.dto.LoginRequest;
import com.greentrace.server.dto.SignUpRequest;
import com.greentrace.server.model.User;
import com.greentrace.server.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Authentication Controller
 * Handles user signup, login, logout, and password reset operations
 * Provides comprehensive error handling and JWT token management
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * User signup endpoint
     * Creates a new user account with validation and returns JWT token
     * 
     * @param request SignUpRequest with user details
     * @param bindingResult Validation results
     * @return ResponseEntity with created user and JWT token or error messages
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
            // Create new user
            User createdUser = userService.signUp(request);
            
            // Generate JWT token
            String token = userService.generateToken(createdUser);
            
            // Return success response with user data and token
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "Account created successfully! Welcome to GreenTrace.",
                "token", token,
                "user", Map.of(
                    "id", createdUser.getId(),
                    "firstName", createdUser.getFirstName(),
                    "lastName", createdUser.getLastName(),
                    "email", createdUser.getEmail(),
                    "fullName", createdUser.getFullName()
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
     * Authenticates user credentials and returns JWT token
     * 
     * @param request LoginRequest with email and password
     * @param bindingResult Validation results
     * @return ResponseEntity with user data and JWT token or error messages
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
            // Authenticate user
            User loggedInUser = userService.login(request.getEmail(), request.getPassword());
            
            // Generate JWT token
            String token = userService.generateToken(loggedInUser);
            
            // Return success response with user data and token
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Welcome back! Login successful.",
                "token", token,
                "user", Map.of(
                    "id", loggedInUser.getId(),
                    "firstName", loggedInUser.getFirstName(),
                    "lastName", loggedInUser.getLastName(),
                    "email", loggedInUser.getEmail(),
                    "fullName", loggedInUser.getFullName(),
                    "lastLogin", loggedInUser.getLastLogin()
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

    /**
     * User logout endpoint
     * Invalidates the current session (frontend should remove token)
     * 
     * @param request HTTP request
     * @return ResponseEntity with logout confirmation
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            // In a stateless JWT system, logout is handled by frontend removing the token
            // Here we can log the logout action or implement token blacklisting if needed
            
            String userEmail = (String) request.getAttribute("userEmail");
            if (userEmail != null) {
                System.out.println("User logged out: " + userEmail);
            }
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Logged out successfully. Thank you for using GreenTrace!"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "An error occurred during logout."
            ));
        }
    }

    /**
     * Forgot password endpoint
     * Generates and sends password reset token
     * 
     * @param request Map with email
     * @return ResponseEntity with reset token (in real app, send via email)
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email is required"
                ));
            }
            
            // Generate reset token
            String resetToken = userService.generateResetToken(email);
            
            // In a real application, you would send this token via email
            // For development purposes, we're returning it in the response
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password reset instructions sent to your email.",
                "resetToken", resetToken  // Remove this in production
            ));
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "success", false,
                "message", "No account found with that email address."
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "An error occurred while processing your request."
            ));
        }
    }

    /**
     * Reset password endpoint
     * Resets password using reset token
     * 
     * @param request Map with token and new password
     * @return ResponseEntity with reset confirmation
     */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String newPassword = request.get("newPassword");
            
            if (token == null || token.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Reset token is required"
                ));
            }
            
            if (newPassword == null || newPassword.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "New password is required"
                ));
            }
            
            // Reset password
            userService.resetPassword(token, newPassword);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password reset successfully. You can now login with your new password."
            ));
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "An error occurred while resetting your password."
            ));
        }
    }

    /**
     * Verify token endpoint
     * Checks if JWT token is valid
     * 
     * @param request HTTP request
     * @return ResponseEntity with token validity
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(HttpServletRequest request) {
        try {
            Long userId = (Long) request.getAttribute("userId");
            String userEmail = (String) request.getAttribute("userEmail");
            
            if (userId != null && userEmail != null) {
                // Find user to get latest data
                var user = userService.findById(userId);
                if (user.isPresent()) {
                    return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Token is valid",
                        "user", Map.of(
                            "id", user.get().getId(),
                            "firstName", user.get().getFirstName(),
                            "lastName", user.get().getLastName(),
                            "email", user.get().getEmail(),
                            "fullName", user.get().getFullName()
                        )
                    ));
                }
            }
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "success", false,
                "message", "Invalid or expired token"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "success", false,
                "message", "Token verification failed"
            ));
        }
    }
}
