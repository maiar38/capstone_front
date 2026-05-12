# ECOBAZAR - Frontend

A modern React + Vite e-commerce platform for sustainable products. This is the frontend repository for the ECOBAZAR MERN stack project.

## 🌿 About ECOBAZAR

ECOBAZAR is a full-stack MERN application designed to promote sustainable and eco-friendly products. The platform connects conscious consumers with sustainable brands and products while providing an intuitive shopping experience.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Redux Toolkit** - State management

### Backend (Separate Repository)
- **Node.js & Express** - Server framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Mongoose** - ODM for MongoDB

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running (see backend repository)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/maiar38/capstone_front.git
cd capstone_front
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=ECOBAZAR
```

## 💻 Development

### Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
```

### Run ESLint
```bash
npm run lint
```

## 📁 Project Structure

```
capstone_front/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Redux store configuration
│   ├── services/         # API calls and services
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── .env.local            # Environment variables (not in git)
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## 🔑 Key Features

- **Product Browsing** - Explore sustainable products with filtering and search
- **Shopping Cart** - Add/remove products with quantity management
- **User Authentication** - Register and login with JWT
- **Order Management** - Place orders and track history
- **Product Reviews** - Leave ratings and reviews
- **Wishlist** - Save favorite products
- **Responsive Design** - Mobile-friendly interface
- **Dark Mode** - Theme toggle support

## 🔗 API Integration

This frontend connects to a Node.js/Express backend API. Key endpoints include:

- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Get product details
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

For backend documentation, see the [backend repository](https://github.com/maiar38/capstone_back).

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in with credentials
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in API request headers
5. Automatic token refresh on expiration

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |

## 🎨 Styling

This project uses **Tailwind CSS** for styling. Customize the theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Custom colors
      },
    },
  },
};
```

## 🚨 Error Handling

- Network errors are caught and displayed to users
- Form validation on client and server side
- Unauthorized requests redirect to login
- API errors displayed in user-friendly messages

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px and above

## 🔄 State Management

Uses Redux Toolkit for global state:

- User authentication state
- Shopping cart items
- Product filters
- UI state (modals, notifications)

## 🌐 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/YourFeature`
2. Commit changes: `git commit -m 'Add YourFeature'`
3. Push to branch: `git push origin feature/YourFeature`
4. Open a Pull Request

## 📝 Commit Convention

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Clear cache and reinstall
```bash
rm -rf node_modules
npm install
```

### CORS errors
Ensure backend is running and `VITE_API_URL` is correct in `.env.local`

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**maiar38** - [GitHub Profile](https://github.com/maiar38)

## 🙏 Acknowledgments

- Vite team for the amazing build tool
- React community for best practices
- Tailwind CSS for utility-first styling
- All contributors and testers

---

**Happy coding! 🚀** 

For questions or support, please open an issue in the repository.
