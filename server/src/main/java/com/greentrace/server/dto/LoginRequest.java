package com.greentrace.server.dto;

import jakarta.validation.constraints.*;
import lombok.*;

/**
 * DTO for user login request with validation
 * Ensures proper email format and password requirements
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 1, max = 128, message = "Password is required")
    private String password;
}
