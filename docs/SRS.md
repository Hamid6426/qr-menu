# System Requirements Specification (SRS) for QR-Menu Web App

## 1. Introduction

### 1.1 Purpose
- This document outlines the System Requirements Specification (SRS) for the QR-Menu Web App.
- The app enables restaurants to digitize menu management, orders, subscriptions, payments, and staff operations using QR codes.
- The platform offers role-specific dashboards for restaurant managers, cooks, waiters, and customers, as well as a Super Admin dashboard for company-level management.
- The updated architecture includes dynamic multi-restaurant dashboards tailored to the restaurant-specific routes provided.

### 1.2 Scope
- The system supports role-based access control with unique dashboards for managers, cooks, waiters, and customers.
- Multi-tenancy allows each restaurant to operate independently within the platform, managing its own menu, staff, and operations.
- Route-based architecture ensures scalability and flexibility for multiple restaurants.
- Users can interact via a mobile-friendly web interface or desktop application.

---

## 2. System Overview

### 2.1 System Architecture
- **Backend (Server-side)**: Handles business logic, database interactions, user authentication, and restaurant-specific data segregation.
- **Frontend (Client-side)**: React-based, featuring dynamic routes (`/manager/:restaurantId`, `/cook/:restaurantId`, etc.) for isolated dashboards.

### 2.2 Technologies Used
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, React Router DOM for dynamic routing
- **Authentication**: Role and restaurant-based access via JWT
- **Payments**: Stripe or PayPal integration

---

## 3. Product Functions

### 3.1 Manager Dashboard (`/manager/:restaurantId`)
- **Dashboard**: Displays restaurant performance, order summaries, and staff analytics.
- **Menu Management**: Add, update, and delete menu items with details like categories, prices, and availability.
- **User Management**: Assign roles (cook, waiter) and manage staff activity.
- **Settings**: Customize restaurant details like name, theme, or subscription settings.

### 3.2 Cook Dashboard (`/cook/:restaurantId`)
- **Order Management**: View orders categorized by preparation status (e.g., pending, in-progress).
- **Menu Preparation**: Mark menu items as ready or unavailable based on stock or preparation time.

### 3.3 Waiter Dashboard (`/waiter/:restaurantId`)
- **Order Management**: Track and update customer orders and their statuses (e.g., served).
- **Table Management**: Assign orders to specific tables and view real-time updates.

### 3.4 Customer Dashboard (`/customer/:restaurantId`)
- **Menu Viewing**: Scan a QR code to view the restaurant’s menu dynamically.
- **Order Placement**: Select menu items, customize orders, and submit for preparation.
- **Payments**: Complete transactions securely via integrated payment gateways.

---

## 4. Functional Requirements

### 4.1 Multi-Tenancy and Restaurant Isolation
- Each restaurant will have its unique identifier (`restaurantId`) embedded in the routes.
- All operations (e.g., menu updates, order processing) will be scoped to the specific restaurant using `restaurantId`.

### 4.2 Role-Based Access Control (RBAC)
- **Manager**: Full access to restaurant-specific data.
- **Cook**: Access to preparation tasks and status updates.
- **Waiter**: Access to order and table management.
- **Customer**: Limited access to view menus and place orders.

### 4.3 Dynamic Routing
- Routes dynamically adapt to the `restaurantId` in the URL, ensuring the correct data is displayed:
  - `/manager/:restaurantId/dashboard`
  - `/cook/:restaurantId/dashboard`
  - `/waiter/:restaurantId/dashboard`
  - `/customer/:restaurantId/menu`

### 4.4 Analytics and Reporting
- Generate restaurant-specific reports for order trends, payment history, and menu performance.

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Support high traffic by isolating restaurant operations through `restaurantId`.
- Ensure real-time updates for order statuses across roles.

### 5.2 Security
- Implement JWT-based authentication with role and `restaurantId` validation.
- Enforce HTTPS for secure data transmission.

### 5.3 Usability
- Provide responsive designs for mobile and desktop users.
- Optimize QR scanning workflows for customers.

### 5.4 Scalability
- Support onboarding of thousands of restaurants with isolated operations via the route structure.

## Folder Structure

qr-menu/                           # Project's temporary name
│
├── client/                        # Client-side (React)
│   ├── node_modules/              # node_modules
│   ├── public/                    # Static files (HTML, assets)
│   │   ├── logo.svg               # App icon on tab
│   ├── src/                       # React source code
│   │   ├── api/                   # API interaction modules for specific roles
│   │   │   ├── authApi.js         # Authentication-related API requests
│   │   │   ├── adminApi.js        # Admin-related API requests
│   │   │   ├── cookApi.js         # Cook-related API requests
│   │   │   ├── customerApi.js     # Customer-related API requests
│   │   │   ├── managerApi.js      # Manager-related API requests
│   │   │   ├── developerApi.js    # developer-related API requests
│   │   │   ├── waiterApi.js       # Waiter-related API requests
│   │   ├── assets/                # Static assets (images, fonts, etc.)
│   │   │   ├── images/            # Application images
│   │   │   │   ├── icons/         # Icon assets
│   │   │   │   ├── backgrounds/   # Background images
│   │   │   │   ├── illustrations/ # Illustrative assets
│   │   │   │   ├── logo.png       # App logo
│   │   │   ├── fonts/             # Custom font files
│   │   │   ├── styles/            # Asset-specific stylesheets
│   │   ├── components/            # Reusable React components
│   │   │   ├── Button.jsx         # Reusable button component
│   │   │   ├── DashboardCard.jsx  # Card component for dashboards
│   │   │   ├── Footer.jsx         # Footer section component
│   │   │   ├── Input.jsx          # Reusable input field component
│   │   │   ├── Modal.jsx          # Generic modal component
│   │   │   ├── Navbar.jsx         # Top navigation bar component
│   │   │   ├── PaymentForm.jsx    # Handles payment inputs
│   │   │   ├── Sidebar.jsx        # Sidebar navigation component
│   │   │   ├── SubscriptionCard.jsx # Displays subscription details
│   │   ├── context/               # Global state management with Context API
│   │   │   ├── AuthContext.js     # Handles authentication state
│   │   │   ├── RoleContext.js     # Manages user roles in state
│   │   │   ├── TenantContext.js   # Manages multi-tenancy data
│   │   │   ├── ThemeContext.js    # Application theme (light/dark mode)
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useFetch.js        # Fetch data from APIs
│   │   │   ├── useAuth.js         # Custom hook for authentication
│   │   │   ├── useRole.js         # Manage role-based logic
│   │   ├── layouts/               # Layout templates for dashboards
│   │   │   ├── developerLayout.jsx    # Layout for developer dashboard
│   │   │   ├── AdminLayout.jsx    # Layout for admin dashboard
│   │   │   ├── ManagerLayout.jsx  # Layout for manager dashboard
│   │   │   ├── CookLayout.jsx     # Layout for cook dashboard
│   │   │   ├── CustomerLayout.jsx # Layout for customer dashboard
│   │   │   ├── WaiterLayout.jsx   # Layout for waiter dashboard
│   │   │   ├── TenantLayout.jsx   # Layout for restaurant-specific views
│   │   ├── pages/                 # Individual app pages
│   │   │   ├── admin/             # Admin-specific pages
│   │   │   │   ├── AdminDashboard.jsx             # Admin dashboard page
│   │   │   │   ├── Billing.jsx               # Billing and payment history
│   │   │   │   ├── HowToUseAdmin.jsx      # Admin guide page
│   │   │   │   ├── ManagePlans.jsx           # Manage subscription plans
│   │   │   │   ├── Payment.jsx               # Payment processing page
│   │   │   │   ├── SubscriptionDetails.jsx   # View subscription details
│   │   │   ├── cook/            # Cook-specific pages
│   │   │   │   ├── CookDashboard.jsx        # Cook dashboard
│   │   │   │   ├── CookingStatus.jsx        # Update cooking statuses
│   │   │   │   ├── HowToUseCook.jsx         # Cook guide page
│   │   │   │   ├── ManageRecipes.jsx        # Recipe management
│   │   │   │   ├── ViewDishes.jsx           # View prepared dishes
│   │   │   ├── customer/        # Customer-specific pages
│   │   │   │   ├── Favorites.jsx            # View favorite dishes
│   │   │   │   ├── OrderHistory.jsx         # View past orders
│   │   │   │   ├── Profile.jsx              # Customer profile
│   │   │   │   ├── Review.jsx               # Submit reviews
│   │   │   │   ├── SpecialMenu.jsx          # View special menu items
│   │   │   │   ├── TokensExchange.jsx       # Token exchange functionality
│   │   │   ├── developer/               # developer-specific pages
│   │   │   │   ├── Analytics.jsx             # View overall system analytics
│   │   │   │   ├── DeveloperDashboard.jsx    # developer dashboard page
│   │   │   │   ├── ManageRestaurants.jsx     # Manage restaurant accounts
│   │   │   │   ├── ManageSubscriptions.jsx   # Manage subscriptions
│   │   │   │   ├── Reports.jsx               # View system-wide reports
│   │   │   │   ├── Settings.jsx              # System settings page
│   │   │   ├── info/            # Informational pages
│   │   │   │   ├── About.jsx                # About the app
│   │   │   │   ├── Blogs.jsx                # Blog and news page
│   │   │   │   ├── Contact.jsx              # Contact us page
│   │   │   │   ├── HowToUse.jsx             # General usage guide
│   │   │   │   ├── SearchMenu.jsx           # Search menu items
│   │   │   ├── manager/          # Manager-specific pages
│   │   │   │   ├── HowToUseManager.jsx      # Manager guide page
│   │   │   │   ├── ManageMenu.jsx           # Menu management
│   │   │   │   ├── ManageOrders.jsx         # Order management
│   │   │   │   ├── ManagerDashboard.jsx     # Manager dashboard
│   │   │   ├── other/           # Other utility pages
│   │   │   │   ├── Auth.jsx                 # Authentication page
│   │   │   │   ├── NotFound.jsx             # 404 error page
│   │   │   ├── waiter/          # Waiter-specific pages
│   │   │   │   ├── HowToUseWaiter.jsx       # Waiter guide page
│   │   │   │   ├── ManageOrders.jsx         # Manage assigned orders
│   │   │   │   ├── OrderHistory.jsx         # Orders history
│   │   │   │   ├── WaiterDashboard.jsx      # Waiter dashboard
│   │   │   │   ├── ViewTableStatus.jsx      # View table status and assignments     
│   │   ├── router/                # React Router configuration
│   │   │   ├── RouterIndex.jsx    # Main routing index
│   │   │   ├── PrivateRoute.jsx   # Wrapper for protected routes
│   │   │   ├── PublicRoute.jsx    # Wrapper for public routes  
│   │   ├── services/              # API interaction and business logic
│   │   │   ├── authService.js     # Handles authentication logic
│   │   │   ├── developerService.js    # Admin-related service calls
│   │   │   ├── adminService.js    # Admin-related service calls
│   │   │   ├── managerService.js  # Manager-related service calls
│   │   │   ├── menuService.js     # Handles menu API interactions
│   │   │   ├── paymentService.js  # Handles payment processing
│   │   │   ├── tenantService.js   # Manages tenant-related API calls
│   │   ├── styles/                # Styling and CSS for the app
│   │   │   ├── global.css         # Global application styles
│   │   │   ├── layout.css         # Layout-specific styles
│   │   │   ├── components.css     # Reusable component styles
│   │   │   ├── pages.css          # Page-specific styles
│   │   ├── App.jsx                # Main React application component
│   │   ├── main.jsx               # Entry point for the React app
│   │   ├── README.md              # Frontend-specific instructions
│   │   ├── package.json           # Dependencies and scripts for the frontend
├── database/                      # Database schema or sample data
│   ├── seedData.js                # Script to seed database with dummy data
│   ├── migrations/                # Database migration files (if using a tool like Mongoose migrations)
├── README.md                      # Project overview and setup instructions
├── index.html                     # Main HTML file
├── .env                           # Environment variables (DB URI, JWT secret)
|
├── server/                        # Server-side application (backend)
│
├── config/                        # Configuration files for the backend
│   ├── database.config.js         # Sets up the database connection
│   ├── env.config.js              # Loads and manages environment variables
│   ├── logger.js                  # Configures application-wide logging
│
├── controllers/                   # Route-handling logic for specific features
│   ├── adminController.js         # Admin-specific functionality
│   ├── authController.js          # Manages user authentication
│   ├── cookController.js          # Cook-specific functionality
│   ├── customerController.js      # Customer-specific functionality
│   ├── developerController.js     # developer-specific functionality
│   ├── managerController.js       # Manager-specific functionality
│   ├── paymentsController.js      # Handles payment processing
│   ├── subscriptionController.js  # Handles subscriptions and related logic
│   ├── waiterController.js        # Waiter-specific functionality
│
├── middlewares/                   # Middleware functions
│   ├── authMiddleware.js          # Ensures users are authenticated
│   ├── errorHandler.js            # Global error handler
│   ├── tenantMiddleware.js        # Handles multi-tenancy logic
│   ├── roleMiddleware.js          # Role-based access control (RBAC)
│
├── models/                        # Database schemas/models
│   ├── User.js                    # Schema for user data
│   ├── Menu.js                # Schema for menu items
│   ├── Order.js                   # Schema for orders
│   ├── Review.js                  # Schema for user reviews
│   ├── Subscription.js            # Schema for subscription plans
│   ├── Tenant.js                  # Schema for restaurant/tenant accounts
│   ├── Token.js                   # Schema for authentication tokens
│
├── routes/                        # API route definitions
│   ├── developerRoutes.js             # Routes for developer-related actions
│   ├── adminRoutes.js             # Routes for admin-related actions
│   ├── managerRoutes.js           # Routes for admin-related actions
│   ├── cookRoutes.js              # Routes for cook-related actions
│   ├── customerRoutes.js          # Routes for customer-related actions
│   ├── waiterRoutes.js            # Routes for waiter-related actions
│   ├── subscriptionRoutes.js      # Routes for subscription actions
│   ├── paymentRoutes.js           # Routes for payment actions
│   ├── authRoutes.js              # Routes for authentication
│
├── services/                      # Reusable business logic
│   ├── emailService.js            # Email sending utility
│   ├── tokenService.js            # Token management (e.g., JWTs)
│   ├── paymentService.js          # Payment processing logic
│   ├── userService.js             # User management functions
│
├── utils/                         # Utility/helper functions
│   ├── validation.js              # Input validation utilities
│   ├── constants.js               # Application constants
│   ├── helpers.js                 # Miscellaneous helper functions
│   ├── planConstants.js           # Constants for subscription tiers
│   ├── tenantHelpers.js           # Helper functions for multi-tenancy
│   ├── responses.js               # Standardized API response formats
│
├── tests/                         # Unit and integration tests
│   ├── controllers/               # Tests for controllers
│   │   ├── authController.test.js
│   ├── middlewares/               # Tests for middleware
│   │   ├── authMiddleware.test.js
│   ├── services/                  # Tests for services
│       ├── userService.test.js
│
├── .env                           # Environment variables (sensitive data)
├── package.json                   # Dependencies and scripts for backend
├── server.js                      # Entry point for the server
├── Dockerfile                     # Docker container definition
├── docker-compose.yml             # Docker services and orchestration
├── .eslintrc.json                 # ESLint configuration for code linting
├── .prettierrc                    # Prettier configuration for code formatting
├── .github/workflows/ci.yml       # CI/CD pipeline using GitHub Actions
├── Jenkinsfile                    # Jenkins pipeline configuration
├── README.md                      # Backend-specific instructions
