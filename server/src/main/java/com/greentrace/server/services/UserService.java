package com.greentrace.server.services;

import com.greentrace.server.model.User;
import com.greentrace.server.repository.UserRepository;
import com.greentrace.server.dto.SignUpRequest;
import com.greentrace.server.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

/**
 * UserService for handling user operations
 * Manages user registration, authentication, and profile operations
 */
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /**
     * Register a new user
     * @param request SignUp request with user details
     * @return Created User entity
     * @throws IllegalArgumentException if validation fails
     */
    public User signUp(SignUpRequest request) {
        // Validate input
        validateSignUpRequest(request);
        
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("User with email " + request.getEmail() + " already exists.");
        }

        // Create User Entity
        User user = User.builder()
                .firstName(request.getFirstName().trim())
                .lastName(request.getLastName().trim())
                .email(request.getEmail().toLowerCase().trim())
                .password(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .emailVerified(false)
                .build();

        // Save User to Database
        User savedUser = userRepository.save(user);
        
        // Log successful registration
        System.out.println("New user registered: " + savedUser.getEmail());
        
        return savedUser;
    }

    /**
     * Authenticate user and generate JWT token
     * @param email User email
     * @param password User password
     * @return Authenticated User entity
     * @throws IllegalArgumentException if authentication fails
     */
    public User login(String email, String password) {
        // Find user by email (case insensitive)
        User user = userRepository.findByEmailIgnoreCase(email.toLowerCase().trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        // Check if account is active
        if (!user.getIsActive()) {
            throw new IllegalArgumentException("Account is deactivated. Please contact support.");
        }

        // Verify password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        // Update last login timestamp
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        return user;
    }

    /**
     * Generate JWT token for authenticated user
     * @param user User entity
     * @return JWT token string
     */
    public String generateToken(User user) {
        return jwtService.generateToken(user.getEmail(), user.getId());
    }

    /**
     * Find user by email
     * @param email User email
     * @return Optional User entity
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email.toLowerCase().trim());
    }

    /**
     * Find user by ID
     * @param id User ID
     * @return Optional User entity
     */
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Generate password reset token
     * @param email User email
     * @return Reset token string
     * @throws IllegalArgumentException if user not found
     */
    public String generateResetToken(String email) {
        User user = userRepository.findByEmailIgnoreCase(email.toLowerCase().trim())
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        // Generate unique reset token
        String resetToken = UUID.randomUUID().toString();
        
        // Set token and expiry (24 hours from now)
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(24));
        
        userRepository.save(user);
        
        return resetToken;
    }

    /**
     * Reset password using reset token
     * @param token Reset token
     * @param newPassword New password
     * @throws IllegalArgumentException if token is invalid or expired
     */
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid reset token"));

        // Check if token is expired
        if (!user.isResetTokenValid()) {
            throw new IllegalArgumentException("Reset token has expired");
        }

        // Validate new password
        validatePassword(newPassword);

        // Update password and clear reset token
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        
        userRepository.save(user);
    }

    /**
     * Update user profile
     * @param userId User ID
     * @param firstName New first name
     * @param lastName New last name
     * @return Updated User entity
     * @throws IllegalArgumentException if user not found
     */
    public User updateProfile(Long userId, String firstName, String lastName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Validate and update names
        if (firstName != null && !firstName.trim().isEmpty()) {
            user.setFirstName(firstName.trim());
        }
        if (lastName != null && !lastName.trim().isEmpty()) {
            user.setLastName(lastName.trim());
        }

        return userRepository.save(user);
    }

    /**
     * Deactivate user account
     * @param userId User ID
     * @throws IllegalArgumentException if user not found
     */
    public void deactivateAccount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setIsActive(false);
        userRepository.save(user);
    }

    /**
     * Validate signup request
     * @param request SignUp request
     * @throws IllegalArgumentException if validation fails
     */
    private void validateSignUpRequest(SignUpRequest request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }

        if (request.getFirstName() == null || request.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }

        if (request.getLastName() == null || request.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("Last name is required");
        }

        validatePassword(request.getPassword());
    }

    /**
     * Validate password strength
     * @param password Password to validate
     * @throws IllegalArgumentException if password is weak
     */
    private void validatePassword(String password) {
        if (password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }
        
        if (!password.matches(".*[a-z].*")) {
            throw new IllegalArgumentException("Password must contain at least one lowercase letter");
        }
        
        if (!password.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Password must contain at least one uppercase letter");
        }
        
        if (!password.matches(".*\\d.*")) {
            throw new IllegalArgumentException("Password must contain at least one number");
        }
        
        if (!password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
            throw new IllegalArgumentException("Password must contain at least one special character");
        }
    }
}
