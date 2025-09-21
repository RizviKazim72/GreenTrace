package com.greentrace.server.repository;

import com.greentrace.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * UserRepository interface for database operations
 * Provides CRUD operations and custom queries for User entity
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email address
     * @param email User email
     * @return Optional User entity
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if user exists by email
     * @param email User email
     * @return True if exists, false otherwise
     */
    boolean existsByEmail(String email);

    /**
     * Find user by reset token
     * @param token Password reset token
     * @return Optional User entity
     */
    Optional<User> findByResetToken(String token);

    /**
     * Find user by email (case insensitive)
     * @param email User email
     * @return Optional User entity
     */
    @Query("SELECT u FROM User u WHERE LOWER(u.email) = LOWER(:email)")
    Optional<User> findByEmailIgnoreCase(@Param("email") String email);

    /**
     * Count total registered users
     * @return Total user count
     */
    @Query("SELECT COUNT(u) FROM User u")
    long countTotalUsers();

    /**
     * Delete user by email
     * @param email User email
     */
    void deleteByEmail(String email);
}
