package com.greentrace.server.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * User entity representing application users
 * Contains user information and authentication details
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    
    /**
     * Primary key - User ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * User's first name
     */
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    /**
     * User's last name
     */
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    /**
     * User's email address (unique identifier)
     */
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    /**
     * Encrypted password
     */
    @Column(name = "password", nullable = false)
    private String password;

    /**
     * Password reset token for forgot password functionality
     */
    @Column(name = "reset_token")
    private String resetToken;

    /**
     * Reset token expiration time
     */
    @Column(name = "reset_token_expiry")
    private LocalDateTime resetTokenExpiry;

    /**
     * Account creation timestamp
     */
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * Last login timestamp
     */
    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    /**
     * Account status (active/inactive)
     */
    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    /**
     * Email verification status
     */
    @Column(name = "email_verified")
    @Builder.Default
    private Boolean emailVerified = false;

    /**
     * Automatically set creation timestamp
     */
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    /**
     * Get user's full name
     * @return Full name (firstName + lastName)
     */
    public String getFullName() {
        return firstName + " " + lastName;
    }

    /**
     * Check if reset token is valid (not expired)
     * @return True if valid, false otherwise
     */
    public boolean isResetTokenValid() {
        return resetToken != null && 
               resetTokenExpiry != null && 
               resetTokenExpiry.isAfter(LocalDateTime.now());
    }
}