# System Requirements Specification (SRS) for QR-Menu Web App

## 1. Introduction

### 1.1 Purpose
- This document outlines the System Requirements Specification (SRS) for the QR-Menu Web App.
- This platform is designed for restaurants to manage their menu, orders, subscriptions and QR-based customer menu with advance search capabilities.
- The platform provides separate dashboards for restaurant owners, managers, waiters, cooks, and customers.
- A Super Admin role is added for your company to oversee and manage all restaurant accounts and subscriptions.

### 1.2 Scope
- This web app will consist of both a server-side backend and a client-side frontend.
- The system will support multiple roles such as admin, manager, cook, customer, and waiter.
- The app will handle user authentication, menu management, order processing, payment integration, and subscription services for restaurants.
- It will be multi-tenant, allowing each restaurant to customize its menu and staff roles.

The QR-Menu Web App allows restaurants to digitize their menus, accept orders, handle payments, and manage customer interactions. The system consists of two main components:
- **Restaurant Admin Dashboard**: Manages restaurant-specific operations.
- **Super Admin Dashboard**: Managed by your company to oversee the entire platform and all restaurant accounts.

### 1.3 Definitions, Acronyms, and Abbreviations
- **Super Admin**: The admin from your company who manages the entire platform and all restaurants.
- **Admin**: A restaurant administrator who manages the restaurant’s menu, orders, staff, and subscription.
- **Manager**: A user role responsible for managing menu items, orders, and users at the restaurant level.
- **Cook**: A user role responsible for managing dish preparation status and recipes.
- **Customer**: A user role responsible for browsing the menu, placing orders, and making payments.
- **Waiter**: A user role responsible for managing orders at the table and interacting with customers.
- **Multi-Tenancy**: A feature that allows each restaurant to manage its own configuration, menu, users, and settings separately.
- **Tenant**: Refers to an individual restaurant account within the platform.
- **QR-Menu**: The restaurant digital menu accessed by scanning a QR code.

### 1.4 References
- Restaurant-specific functionalities
- Subscription management
- Payment processing standards

(https://github.com/AchmetCh/qrMenu/)
(https://www.figma.com/design/Xi9amBqLe9box6ORP5UQEF/DigiServed?node-id=0-1&p=f&t=S8yR5vCtesYtULjM-0)

## 2. System Overview

### 2.1 System Architecture
- **Backend (Server-side)**: Handles the logic, database interactions, user authentication, role-based access control, and payment processing.
- **Frontend (Client-side)**: A React-based web application used by customers and restaurant staff to interact with the system.

### 2.2 Technologies Used
- **Backend**: Node.js, Express, MongoDB, Docker
- **Frontend**: React, Redux, React Router
- **Payment Gateway**: Third-party integration (e.g., Stripe, PayPal)
- **Authentication**: JWT (JSON Web Tokens)
- **Logging**: Winston or similar for server logging

## 3. Overall Description

### 3.1 Product Perspective
- QR-Menu Web App serves as an all-in-one solution for restaurants, enabling them to manage their operations efficiently.
- It is a SaaS (Software as a Service) offering, allowing restaurants to access their account, menus, and orders through a web-based platform and a mobile-friendly QR code system.
- The **Super Admin** will oversee and manage all aspects of the platform, ensuring smooth operation across all restaurants.

### 3.2 Product Functions
The primary functions of the system include:
- **QR Code Generation**: Generate QR codes for customers to scan and view the restaurant menu.
- **Order Management**: Customers place orders via the app, and the restaurant staff manages them.
- **Payment Gateway**: Facilitates online and offline payment processing.
- **Menu Management**: Restaurant admins can configure and update their menu items.
- **User Management**: Admins manage staff roles and customer data.
- **Subscription Management**: Restaurant admins can subscribe, renew, or change their subscription plans.
- **Analytics and Reporting**: Provides reports on orders, payments, and usage statistics.
- **Multi-Tenancy**: Supports multiple restaurants (tenants) using the same system.

### 3.3 User Classes and Characteristics
The system has different user classes with varying roles:
- **Super Admin**: Oversees all restaurant accounts, manages billing, subscriptions, and platform-wide settings.
- **Admin**: Manages a specific restaurant’s operations, including staff, menu, orders, and subscription.
- **Manager**: Manages the day-to-day operations of a specific restaurant, including orders and staff.
- **Cook**: Manages the preparation of orders and updates their status.
- **Waiter**: Takes orders from customers and ensures timely delivery.
- **Customer**: Views the restaurant’s menu, places orders, and reviews items.

### 3.4 Operating Environment
- **Backend**: Node.js, Express.js (API), MongoDB (Database)
- **Frontend**: React.js
- **Hosting**: Cloud-based (AWS, Heroku, etc.)
- **Payment Gateway**: Stripe or PayPal for handling payments

### 3.5 Design and Implementation Constraints
- Multi-tenancy must be supported to allow multiple restaurants to operate on the same platform.
- The platform must be scalable to accommodate a growing number of restaurants and users.
- The **admin panel** should provide role-based access control to ensure security.
- The system must comply with relevant data protection laws, such as GDPR.

## 4. System Features

### 4.1 Super Admin Dashboard (Company Management)
The Super Admin will have the following features:
- **Platform-wide Overview**: View all restaurant accounts, their subscription statuses, and usage statistics.
- **Restaurant Management**: Create, modify, or remove restaurant accounts. Assign or change the admin for each restaurant.
- **Subscription Management**: Monitor and manage the subscription plans of all restaurants. Upgrade, downgrade, or cancel subscriptions.
- **Billing**: Handle payments and invoicing for the restaurants’ subscription plans.
- **User Support**: Provide platform-wide support for restaurants, including troubleshooting and handling queries.
- **Analytics**: Monitor usage statistics, payments, active restaurants, and subscriptions across the entire platform.

### 4.2 Restaurant Admin Dashboard
The Admin for each restaurant will have the following features:
- **Menu Management**: Add, edit, or remove menu items.
- **Order Management**: View and manage customer orders.
- **Staff Management**: Assign roles to staff members (Managers, Cooks, Waiters).
- **Subscription Plan**: View and manage subscription plan details, including renewals and upgrades.
- **Analytics**: View restaurant-specific performance metrics, such as sales and popular menu items.

### 4.3 Manager Dashboard
- **Order Management**: View and manage orders placed by customers.
- **Menu Management**: Assist in managing menu items.
- **Staff Management**: Assign and monitor waiters and cooks.

### 4.4 Cook Dashboard
- **Order Preparation**: View incoming orders and update their status (e.g., cooking, ready).
- **Menu Management**: Update the preparation status of menu items.

### 4.5 Waiter Dashboard
- **Order Management**: View customer orders, take new orders, and update the status of orders (e.g., served, pending).
- **Table Management**: Track and assign orders to specific tables.

### 4.6 Customer Dashboard
- **Menu Viewing**: Browse the menu via a QR code.
- **Order Placement**: Place orders for food and beverages.
- **Payment**: Make payments for orders.
- **Profile**: Update personal information and view order history.

## 5. External Interface Requirements

### 5.1 User Interfaces
The system will have user interfaces for:
- Super Admin Dashboard (for your company’s management)
- Restaurant Admin Dashboard
- Role-based dashboards (Manager, Cook, Waiter, Customer)

### 5.2 Hardware Interfaces
- The system will support any device with internet access and a web browser (PCs, tablets, and smartphones). It should be optimized for mobile devices.

### 5.3 Software Interfaces
- **Payment Gateway Integration**: Stripe, PayPal, or other payment processors.
- **Email Service**: For user notifications (account registration, password resets, etc.).
- **Analytics Tools**: Google Analytics or similar for tracking platform usage and performance.

## 6. Functional Requirements

### 6.1 User Roles & Authentication
- **Admin**: Manage subscription plans, manage restaurant users, view system analytics.
- **Manager**: Manage the menu, view and manage customer orders, manage assigned staff and shift schedules.
- **Cook**: View orders in progress, update cooking status for dishes, manage recipes.
- **Customer**: View the menu by scanning the QR code, place orders and add special requests, view order history, make payments.
- **Waiter**: View assigned orders and tables, update table statuses, assist customers with orders and payments.

### 6.2 Menu Management
- Admin and Manager roles can add, update, or delete menu items.
- Each menu item can have details such as name, description, price, and category (e.g., appetizers, drinks).
- Menu items can be categorized (e.g., vegetarian, vegan, gluten-free).

### 6.3 Order Management
- Customers can view the menu, select items, and place an order.
- Orders can be tracked by status (e.g., pending, cooking, served).
- Managers and Waiters can view and update order status.
- Cooks can update dish preparation statuses.

### 6.4 Payment Processing
- Payments are processed through third-party payment gateways (Stripe/PayPal).
- Customers can pay for orders and optionally provide tips.
- Admin and Manager roles can view payment history and transaction details.

### 6.5 Subscription Management
- Admin can configure subscription plans for restaurants.
- Subscription details are provided to the restaurant, including renewal reminders.

### 6.6 User Management
- Admin can manage user roles (create/remove users, assign roles).
- All roles must authenticate via JWT tokens.
- Role-based access control (RBAC) is enforced across the app.

## 7. Non-Functional Requirements

### 7.1 Performance
- The system should support multiple concurrent users and perform actions (like placing an order, updating a menu) in under 2 seconds.
- The application should handle hundreds of simultaneous orders per restaurant.

### 7.2 Security
- Passwords should be securely stored using encryption techniques (e.g., bcrypt).
- All data transmission should be encrypted using HTTPS.
- Role-based access control (RBAC) should be implemented to ensure each user has appropriate access to data and features.

### 7.3 Usability
- The app should be user-friendly and accessible via any modern web browser (Chrome, Firefox, Safari).
- The frontend should have responsive design, working on both mobile and desktop devices.
- Customers should be able to quickly scan a QR code and access the menu.

### 7.4 Availability
- The system should be available 99.9% of the time, excluding scheduled maintenance.
- The backend should be capable of running continuously in a cloud environment, ensuring scalability and availability.

### 7.5 Scalability
- The system should be scalable to support multiple restaurants (multi-tenancy).
- The system should be capable of scaling up to handle hundreds of restaurants using the platform.

### 7.6 Maintainability
- The system should be modular, allowing easy updates, debugging, and troubleshooting.
- Clear documentation should be provided for developers.

### 7.7 Compliance
- The application should comply with local data protection laws (e.g., GDPR for handling customer data).
- Payment integrations must comply with PCI-DSS standards.

## 8. System Features

### 8.1 Feature 1: Multi-Tenancy Support
- The system should support multiple restaurants (tenants), each with its own set of configurations, users, and data.
- Each tenant (restaurant) should have a separate, isolated environment to manage its menu, orders, and subscriptions.

### 8.2 Feature 2: QR Code Scanning for Menu Access
- Customers can scan a unique QR code at the restaurant to access the digital menu.
- The system should identify the restaurant and display the appropriate menu.

### 8.3 Feature 3: Real-Time Order Updates
- Orders placed by customers should be reflected in real time to restaurant staff (waiters, cooks, and managers).
- Cooks and managers can update the status of orders (e.g., cooking, served).
- The system will communicate through HTTP/HTTPS requests and responses.
- REST API for backend-to-frontend communication.

## 9. System Design Constraints
- The system should be designed to support a wide range of restaurants, from small cafes to larger establishments.
- The system must be able to integrate with popular third-party payment gateways (Stripe, PayPal).
- The database should be scalable, capable of handling high volumes of data as the system grows.

## 10. Assumptions and Dependencies
- The system assumes that restaurants will have internet access to use the QR-Menu web app.
- The system depends on third-party services for payment processing (e.g., Stripe, PayPal).
- The system assumes that customers have access to mobile devices with QR code scanning capabilities.

## 11. External Interface Requirements

### 11.1 Hardware Interfaces
- The system is designed to run on standard web browsers (Chrome, Firefox, etc.).
- Mobile and desktop devices supported.

### 11.2 Software Interfaces
- The system will interface with a database for storing user, menu, and order data.
- The frontend will be built using HTML, CSS, and JavaScript.

### 11.3 Communication Interfaces
- The system will communicate through HTTP/HTTPS requests and responses.
- REST API for backend-to-frontend communication.

## 13. Appendices

### 13.1 Glossary
- **JWT (JSON Web Token)**: A token-based authentication system used to secure API routes.
- **RBAC (Role-Based Access Control)**: A method of restricting access to resources based on user roles.

### 13.2 References
- Links to system documentation, codebase, and design documents.
