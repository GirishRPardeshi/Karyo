# Karyo 🛒

A modern, full-featured e-commerce platform built with Angular 21, featuring reactive state management with signals, responsive design, and comprehensive user authentication.
Wbsite Link: https://karyoonline.vercel.app/

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)

## ✨ Features

### 🛍️ Core E-commerce Features
- **Product Catalog**: Browse products with detailed information, ratings, and multiple images
- **Advanced Filtering**: Filter products by category, price range, and search functionality
- **Product Details**: Comprehensive product pages with image galleries and specifications
- **Shopping Cart**: Add/remove items, quantity management, and cart persistence
- **Checkout Process**: Complete order flow with order summary and confirmation
- **Order History**: View past orders and order details

### 🔐 Authentication & Security
- **User Registration**: Secure signup with form validation
- **User Login**: JWT-based authentication with localStorage persistence
- **Protected Routes**: Route guards for authenticated users
- **User-specific Cart**: Isolated cart management per user

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Material Symbols**: Consistent iconography throughout the application
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Handling**: Comprehensive error states and user feedback
- **404 Page**: Custom not-found page with navigation options

### ⚡ Performance & Architecture
- **Angular Signals**: Modern reactive state management for optimal performance
- **Lazy Loading**: Route-based code splitting for faster initial load
- **Standalone Components**: Modern Angular architecture without NgModules
- **RxJS Integration**: Reactive programming for async operations
- **TypeScript**: Full type safety throughout the application

## 🚀 Tech Stack

- **Framework**: Angular 21
- **Language**: TypeScript 5.9+
- **Styling**: Tailwind CSS 3.4+
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient
- **Reactive Programming**: RxJS 7.8+
- **Build Tool**: Angular CLI 21
- **Data Storage**: Local JSON files (assets/db.json)
- **Testing**: Vitest + JSDOM
- **Code Quality**: Prettier

## 📁 Project Structure

```
Karyo/
├── api/                          # Mock API data
│   ├── db.json                   # Products and orders data
│   └── users.json                # User data (for future use)
├── src/
│   ├── app/
│   │   ├── core/                 # Core services
│   │   │   └── services/
│   │   │       ├── cart.service.ts
│   │   │       ├── order.service.ts
│   │   │       └── product.service.ts
│   │   ├── features/             # Feature modules
│   │   │   ├── auth/             # Authentication
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── cart/             # Shopping cart
│   │   │   ├── checkout/         # Checkout process
│   │   │   ├── home/             # Landing page
│   │   │   ├── orders/           # Order history
│   │   │   └── products/         # Product catalog
│   │   │       ├── product-details/
│   │   │       └── product-list/
│   │   ├── layout/               # Layout components
│   │   │   ├── header/
│   │   │   └── footer/
│   │   ├── shared/               # Shared components & models
│   │   │   ├── components/
│   │   │   │   └── not-found/
│   │   │   └── models/
│   │   │       └── cart-item.model.ts
│   │   ├── app.component.*       # Root component
│   │   ├── app.config.ts         # Application configuration
│   │   └── app.routes.ts         # Route definitions
│   ├── assets/                   # Static assets
│   ├── styles.css                # Global styles
│   └── main.ts                   # Application bootstrap
├── angular.json                  # Angular CLI configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm 9+
- Angular CLI 21+

### 1. Clone the Repository
```bash
git clone <repository-url>
cd shivcart
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```
Navigate to `http://localhost:4200` in your browser.

### 4. Build for Production
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run watch` | Build in watch mode |
| `npm test` | Run unit tests |

## 🔧 Configuration

### API Configuration
The application uses JSON Server for mock API. The API endpoints are:
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /orders` - Create new order
- `GET /orders?userId=:id` - Get orders by user ID

### Environment Variables
Currently, the app uses hardcoded API URLs. For production deployment, consider adding environment files:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

## 🎯 Key Features Implementation

### Authentication Flow
1. User registers/logs in through dedicated forms
2. JWT tokens stored in localStorage
3. Route guards protect authenticated routes
4. User context maintained throughout session

### Cart Management
- Cart state managed with Angular Signals
- Persistent storage in localStorage
- User-specific cart isolation
- Real-time quantity updates

### Product Filtering
- Category-based filtering
- Price range filtering
- Search functionality
- Real-time filter application

### Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Flexible grid layouts
- Touch-friendly interactions

## 🧪 Testing

Run unit tests with:
```bash
npm test
```

Tests are configured with Vitest and JSDOM for fast, reliable testing.

## 📱 Data Sources

### Products
- Data loaded from `assets/db.json` (products array)
- Individual product details retrieved by ID from the same file

### Orders
- Orders stored in localStorage for persistence
- No external API calls required

### Authentication
- Static users loaded from `assets/db.json` (users array)
- New user registrations stored in localStorage
- Authentication state managed with Angular Signals

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- JSON Server for easy mock API development
- Material Symbols for consistent iconography

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Happy Shopping with karyo! 🛒✨**
