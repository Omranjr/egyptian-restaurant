# 𓂀 Fata Morgana - Egyptian Restaurant 𓂀

A modern Egyptian restaurant website built with Next.js 14, featuring authentic cuisine ordering with Google/Apple authentication.

## Features

- 🏺 **Authentic Egyptian Menu** - Browse traditional dishes like Koshari, Mixed Grills, and desserts
- 🔐 **Social Authentication** - Sign in with Google or Apple
- 🛒 **Shopping Cart** - Add items and manage your order
- 👤 **User Profiles** - Save delivery details for faster checkout
- 📱 **Responsive Design** - Beautiful Egyptian-themed UI that works on all devices
- ⚡ **Modern Stack** - Built with Next.js 14, Prisma, NextAuth.js, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud Console account (for Google OAuth)
- Apple Developer account (for Apple OAuth, optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd egyptian-restaurant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your OAuth credentials:

   ```env
   # Database
   DATABASE_URL="file:./prisma/dev.db"

   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-very-long-random-secret-key"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Apple OAuth (optional)
   APPLE_ID="your-apple-id"
   APPLE_SECRET="your-apple-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

### OAuth Setup

#### Google OAuth Setup (Required for Sign-in)

**IMPORTANT: Google OAuth must be configured for authentication to work.**

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create or Select a Project**
   - Click "Select a project" dropdown
   - Either create a new project or select an existing one

3. **Enable APIs**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
   - Also enable "Google People API" if available

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - If prompted, configure the OAuth consent screen first:
     - Choose "External" user type
     - Fill in app name: "Fata Morgana Egyptian Restaurant"
     - Add your email as developer contact
     - Save and continue through all steps

5. **Configure OAuth Client**
   - Application type: "Web application"
   - Name: "Fata Morgana Local Development"
   - **Authorized JavaScript origins:**
     ```
     http://localhost:3000
     ```
   - **Authorized redirect URIs:**
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Click "Create"

6. **Copy Credentials**
   - Copy the "Client ID" and "Client Secret"
   - Add them to your `.env.local` file:
     ```env
     GOOGLE_CLIENT_ID="your-actual-google-client-id"
     GOOGLE_CLIENT_SECRET="your-actual-google-client-secret"
     ```

#### Apple OAuth Setup (Optional)

1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Create a new App ID and Service ID
3. Configure Sign in with Apple
4. Set redirect URI to `http://localhost:3000/api/auth/callback/apple`
5. Generate and download the private key
6. Add credentials to `.env.local`

#### Testing the Setup

1. Start the development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Sign In with Google" in the navbar
4. You should be redirected to Google's authentication page
5. After signing in, you should be redirected back to the app

If you see a "400: malformed request" error, double-check:
- Your Google Client ID and Secret are correct
- The authorized origins and redirect URIs match exactly
- Your `.env.local` file is properly formatted

## Project Structure

```
src/
├── app/                 # Next.js 14 app directory
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── cart/           # Shopping cart page
│   ├── checkout/       # Checkout page
│   └── menu/           # Menu page
├── components/         # React components
├── data/              # Static data (menu items)
├── lib/               # Utilities (auth config, Prisma)
└── store/             # Zustand store for cart management
```

## Authentication Flow

1. **Sign In**: Users click "Sign In with Google" in the navbar
2. **Profile Setup**: After first sign-in, users complete their profile (phone, address)
3. **Shopping**: Users browse menu and add items to cart
4. **Checkout**: Users review order and place it with saved profile info
5. **Order Confirmation**: Users receive confirmation with order details

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with Egyptian-themed design
- **Authentication**: NextAuth.js with Google/Apple providers
- **Database**: SQLite with Prisma ORM
- **State Management**: Zustand for cart state
- **UI Components**: Custom components with Egyptian theming

## Development

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View database
npx prisma studio
```

### Deployment

1. Deploy to Vercel, Netlify, or your preferred platform
2. Set up environment variables in production
3. Update OAuth redirect URIs for production domain
4. Configure production database (PostgreSQL recommended)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*"Experience the divine flavors of ancient Egypt"* 🏺
