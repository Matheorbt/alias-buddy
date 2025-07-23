# Alias Buddy - SaaS Template

A scalable Next.js SaaS template with a clear separation between **core reusable components** and **business logic**. This project serves as both a fully functional email alias management SaaS and a template for future projects.

## 🏗️ Architecture Philosophy

This template is designed with **template reusability** in mind:

- **`components/core/`** - Reusable across all your SaaS projects
- **`components/business/`** - Specific to Alias Buddy (remove/replace for new projects)
- **`lib/`** - Core services and utilities (mostly reusable)
- **`hooks/`** - Mix of core and business-specific hooks
- **`constants/`** - Separated into CORE and BUSINESS constants

## 📁 Project Structure

```
alias-buddy/
├── app/                         # Next.js App Router
│   ├── (marketing)/            # Landing page (public)
│   │   └── page.tsx
│   ├── dashboard/              # Private area after login
│   │   └── page.tsx
│   ├── api/                    # API routes (App Router)
│   │   ├── auth/               # Auth routes (sign-in, etc)
│   │   └── ...                 
│   └── layout.tsx             # Root layout
│
├── components/                
│   ├── ui/                     # Design system (buttons, inputs, etc.) ✅ REUSABLE
│   ├── core/                   # Components reusable across all SaaS ✅ REUSABLE
│   └── business/               # Components specific to this project ❌ PROJECT-SPECIFIC
│
├── lib/                       ✅ MOSTLY REUSABLE
│   ├── supabase/              # Supabase client
│   ├── auth/                  # Auth helpers
│   ├── posthog.ts             # PostHog analytics
│   ├── sentry.ts              # Error monitoring
│   ├── resend.ts              # Email service
│   ├── chatwoot.ts            # Customer support
│   └── utils.ts               # Utility functions
│
├── constants/                 # ✅ CORE constants + ❌ Business constants
│   ├── routes.ts              # App routes (core + business)
│   ├── featureFlags.ts        # Feature flags (core + business)
│   └── env.ts                 # Environment mapping
│
├── hooks/                    # ✅ CORE hooks + ❌ Business hooks
│   ├── useUser.ts
│   ├── useFeatureFlags.ts
│   ├── usePosthog.ts
│   └── ...
│
└── middlewares/             # ✅ REUSABLE
    └── authMiddleware.ts
```

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo>
cd alias-buddy
pnpm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
# Fill in your PostHog key and other services
```

### 3. Development

```bash
pnpm dev
```

## 🔧 Core Services Integrated

### ✅ Currently Configured

- **PostHog** - Analytics & Feature Flags
- **TailwindCSS** - Styling
- **TypeScript** - Type Safety
- **Shadcn/ui** - Component Library Base

### 🔄 Ready to Add (Uncomment in constants/env.ts)

- **Supabase** - Authentication & Database
- **Resend** - Email Service
- **Sentry** - Error Monitoring
- **Chatwoot** - Customer Support

## 📋 Using as a Template

### For a New SaaS Project:

1. **Clone this repository**
2. **Replace business logic:**
   - Delete contents of `components/business/`
   - Update `BUSINESS_ROUTES` in `constants/routes.ts`
   - Update `BUSINESS_FEATURE_FLAGS` in `constants/featureFlags.ts`
   - Replace business-specific environment variables in `.env.example`
3. **Update metadata:**
   - Change app name in `package.json`
   - Update metadata in `app/layout.tsx`
   - Update README title and description
4. **Keep everything in:**
   - `components/ui/` and `components/core/`
   - Core constants and utilities
   - Service configurations in `lib/`

### Development Best Practices

#### ✅ DO's

- **Use the core components** for common functionality
- **Separate business logic** into `components/business/`
- **Use constants** from `constants/` instead of hardcoding
- **Use hooks** for reusable logic
- **Follow naming conventions** (handle prefix for event functions)
- **Use TypeScript** strictly
- **Use Tailwind classes** only for styling

#### ❌ DON'Ts

- Don't put business-specific logic in core components
- Don't hardcode routes, feature flags, or environment variables
- Don't create duplicate functionality - check if it exists in core first
- Don't mix business and core concerns

## 🎯 Feature Flag Usage

```tsx
import { usePosthog } from '@/hooks/usePosthog'
import { FEATURE_FLAGS } from '@/constants/featureFlags'

const { isFeatureEnabled } = usePosthog()

// Use core flags
if (isFeatureEnabled(FEATURE_FLAGS.WELCOME_BANNER)) {
  // Show welcome banner
}

// Use business flags
if (isFeatureEnabled(FEATURE_FLAGS.NEW_ALIAS_EDITOR)) {
  // Show new editor
}
```

## 📊 Analytics Usage

```tsx
import { usePosthog } from '@/hooks/usePosthog'

const { identify, capture } = usePosthog()

// Identify user (usually after auth)
identify('user_123', { plan: 'pro' })

// Track events
capture('button_clicked', { 
  location: 'homepage',
  button_type: 'cta' 
})
```

## 🔐 Environment Variables

Core variables needed for the template to work:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

See `.env.example` for all available variables.

## 🧪 Adding New Services

When adding a new service (e.g., Stripe), follow this pattern:

1. **Add environment variables** to `constants/env.ts`
2. **Create service file** in `lib/stripe.ts`
3. **Create hooks** in `hooks/useStripe.ts`
4. **Add routes** to `constants/routes.ts` if needed
5. **Update .env.example**

## 📈 Scaling Strategy

### Repository Strategy Options:

#### Option 1: Single Repo (Recommended for now)
- Keep everything in one repo
- Create branches for different SaaS ideas
- Extract template when ready

#### Option 2: Template + Business Repos
- Create `saas-template` repo with only core components
- Keep `alias-buddy` with business logic
- More complex but cleaner separation

### Recommended Approach:

1. **Start with single repo** (current setup)
2. **Build alias-buddy** completely
3. **Extract template** when you have 2-3 SaaS projects
4. **Create template repo** with core components only

## 🤝 Contributing

1. Keep core and business logic separated
2. Update this README when adding new patterns
3. Document new services and integrations
4. Follow TypeScript strict mode
5. Use feature flags for experimental features

## 📝 License

MIT License - feel free to use for your SaaS projects!

---

**Ready to build your next SaaS?** This template gives you a solid foundation with proper separation of concerns, making it easy to reuse for future projects while building a complete SaaS today.
