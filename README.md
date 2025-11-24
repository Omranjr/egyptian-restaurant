# 𓂀 Fata Morgana - Egyptian Restaurant 𓂀

A modern Egyptian restaurant website built with Next.js 14, featuring authentic cuisine ordering with Google/Apple authentication.

## Features

- 🏺 **Authentic Egyptian Menu** - Browse traditional dishes like Koshari, Mixed Grills, and desserts
- 🔐 **Email Authentication** - Simple sign in/sign up with email
- 🛒 **Shopping Cart** - Add items and manage your order
- 👤 **User Profiles** - Save delivery details for faster checkout
- 📧 **Email Notifications** - Automatic order emails sent to restaurant owner
- 💰 **Payment Options** - Cash on Delivery and Apple Pay (coming soon)
- 📱 **Responsive Design** - Beautiful Egyptian-themed UI that works on all devices
- ⚡ **Modern Stack** - Built with Next.js 15, Prisma, NextAuth.js, Resend, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Resend account (for email notifications) - **REQUIRED**
  - Sign up at [resend.com](https://resend.com)
  - Free tier: 100 emails/day

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
   - Copy `env.example` to `.env.local`
   - Fill in your credentials:

   ```env
   # Database
   DATABASE_URL="file:./prisma/dev.db"

   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-very-long-random-secret-key"

   # Resend Email API (REQUIRED for order notifications)
   RESEND_API_KEY="re_your_resend_api_key_here"
   ```

   **Important:** Get your Resend API key:
   1. Sign up at [resend.com](https://resend.com)
   2. Create an API key in the dashboard
   3. Add it to `.env.local`

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

### Email Notification Setup

**IMPORTANT: Resend API must be configured for order emails to work.**

See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed instructions.

Quick setup:
1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Create an API key in your dashboard
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY="re_your_actual_api_key_here"
   ```
4. Restart dev server

Orders will be emailed to: **mmmoo136@gmail.com**

### Testing the Application

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for complete testing instructions.

Quick test:
1. Start dev server: `npm run dev`
2. Sign in with your email
3. Add items to cart
4. Complete checkout with delivery details
5. Select payment method (Cash or Apple Pay)
6. Place order
7. Check email at mmmoo136@gmail.com

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
