// Authentication Constants
export const AUTH_CONFIG = {
  // Page Titles
  titles: {
    signUp: 'Create your GreenTrace account',
    login: 'Welcome back to GreenTrace',
    forgotPassword: 'Reset your password'
  },

  // Subtitles
  subtitles: {
    signUp: 'Start your journey towards sustainable carbon tracking',
    login: 'Sign in to access your carbon footprint dashboard',
    forgotPassword: 'Enter your email to receive reset instructions'
  },

  // Button Labels
  buttons: {
    signUp: 'Create Account',
    login: 'Sign In',
    forgotPassword: 'Send Reset Link',
    backToLogin: 'Back to Sign In',
    processing: 'Processing...'
  },

  // Social Auth
  socialAuth: {
    google: {
      label: 'Continue with Google',
      icon: 'google'
    },
    microsoft: {
      label: 'Continue with Microsoft',
      icon: 'microsoft'
    },
    github: {
      label: 'Continue with GitHub',
      icon: 'github'
    }
  },

  // Links
  links: {
    signUpToLogin: {
      text: 'Already have an account?',
      linkText: 'Sign in',
      href: '/auth/login'
    },
    loginToSignUp: {
      text: "Don't have an account?",
      linkText: 'Create one',
      href: '/auth/signup'
    },
    forgotPassword: {
      text: 'Forgot your password?',
      linkText: 'Reset it',
      href: '/auth/forgot-password'
    },
    termsAndPrivacy: {
      terms: '/legal/terms',
      privacy: '/legal/privacy'
    }
  }
}

// Form Field Configurations
export const AUTH_FORMS = {
  signUp: {
    fields: [
      {
        id: 'firstName',
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        placeholder: 'Enter your first name',
        required: true,
        autoComplete: 'given-name'
      },
      {
        id: 'lastName',
        name: 'lastName',
        type: 'text',
        label: 'Last Name',
        placeholder: 'Enter your last name',
        required: true,
        autoComplete: 'family-name'
      },
      {
        id: 'email',
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
        required: true,
        autoComplete: 'email'
      },
      {
        id: 'password',
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Create a strong password',
        required: true,
        autoComplete: 'new-password'
      },
      {
        id: 'confirmPassword',
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Confirm your password',
        required: true,
        autoComplete: 'new-password'
      }
    ]
  },
  login: {
    fields: [
      {
        id: 'email',
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
        required: true,
        autoComplete: 'email'
      },
      {
        id: 'password',
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true,
        autoComplete: 'current-password'
      }
    ]
  }
}

// Validation Messages
export const AUTH_VALIDATION = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  password: {
    minLength: 'Password must be at least 8 characters',
    mustContain: 'Password must contain uppercase, lowercase, number and special character',
    mismatch: 'Passwords do not match'
  },
  name: {
    minLength: 'Name must be at least 2 characters',
    maxLength: 'Name must not exceed 50 characters'
  }
}

// Success/Error Messages
export const AUTH_MESSAGES = {
  success: {
    signUp: 'Account created successfully! Please check your email to verify.',
    login: 'Welcome back! Redirecting to dashboard...',
    passwordReset: 'Password reset email sent successfully.',
    emailVerified: 'Email verified successfully!'
  },
  error: {
    invalidCredentials: 'Invalid email or password',
    userExists: 'An account with this email already exists',
    userNotFound: 'No account found with this email',
    networkError: 'Network error. Please try again.',
    genericError: 'Something went wrong. Please try again.'
  }
}

// Password Requirements
export const PASSWORD_REQUIREMENTS = [
  'At least 8 characters long',
  'Contains uppercase letter',
  'Contains lowercase letter',
  'Contains number',
  'Contains special character'
]