# 🌩️ Cloudflare Setup Guide

This guide shows how to integrate Cloudflare services while maintaining clean core/business separation.

## 🎯 **Recommended Implementation Order**

### Phase 1: Basic CDN (FREE) - Immediate bandwidth savings
### Phase 2: R2 Storage - Major cost reduction
### Phase 3: Cloudflare Images (Optional) - Advanced optimization

---

## 🚀 **Phase 1: Cloudflare CDN (FREE)**

### 1. Setup Cloudflare Proxy
1. Add your domain (`alias-buddy.com`) to Cloudflare
2. Update your DNS to point to Cloudflare nameservers
3. Enable proxy (orange cloud) for your domain
4. In Cloudflare dashboard → Caching → Configuration:
   - Browser Cache TTL: `Respect Existing Headers`
   - Edge Cache TTL: `2 hours` for images

**Result:** Immediate bandwidth reduction, faster global delivery

### 2. Optimize Caching Rules
```javascript
// In Cloudflare dashboard → Rules → Page Rules
// Rule 1: Cache static assets aggressively
alias-buddy.com/public/*
Cache Level: Everything
Edge Cache TTL: 1 month
Browser Cache TTL: 1 month

// Rule 2: Cache API responses briefly  
alias-buddy.com/api/*
Cache Level: Standard
Edge Cache TTL: 5 minutes
```

---

## 💾 **Phase 2: R2 Storage Setup**

### 1. Create R2 Bucket
```bash
# In Cloudflare dashboard → R2 Object Storage
# Create bucket: alias-buddy-assets
# Public access: Allow (for public assets)
```

### 2. Upload Assets to R2
```bash
# Upload your current public assets
wrangler r2 object put alias-buddy-assets/logo_alias_buddy.png --file=public/logo_alias_buddy.png
wrangler r2 object put alias-buddy-assets/og-image.png --file=public/og-image.png
wrangler r2 object put alias-buddy-assets/twitter-image.png --file=public/twitter-image.png

# Upload all PWA icons
for file in public/icon-*.png; do
  filename=$(basename "$file")
  wrangler r2 object put alias-buddy-assets/$filename --file=$file
done
```

### 3. Environment Variables
```bash
# Add to your Vercel environment variables
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_BUCKET=alias-buddy-assets
CLOUDFLARE_R2_ACCESS_KEY=your_access_key
CLOUDFLARE_R2_SECRET_KEY=your_secret_key
```

### 4. Custom Domain for R2 (Optional)
```javascript
// In Cloudflare → R2 → Settings → Custom Domains
// Add: assets.alias-buddy.com → alias-buddy-assets bucket
// This gives you: https://assets.alias-buddy.com/logo_alias_buddy.png
```

---

## 🖼️ **Phase 3: Cloudflare Images (Optional)**

### 1. Setup
```bash
# Enable Cloudflare Images in dashboard
# Note your account hash from dashboard
CLOUDFLARE_IMAGES_ACCOUNT_HASH=your_hash_here
```

### 2. Upload Images
```bash
# Upload via API or dashboard
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1" \
  -H "Authorization: Bearer {api_token}" \
  -F "file=@public/logo_alias_buddy.png" \
  -F "id=logo_alias_buddy"
```

### 3. Use Optimized URLs
```typescript
// Automatically handled by your asset helpers
assetHelpers.getLogo({ width: 64, height: 64 })
// Returns: https://imagedelivery.net/{hash}/logo_alias_buddy/w=64,h=64,q=90,f=webp
```

---

## 📊 **Expected Cost Savings**

### Current (Vercel only):
- Bandwidth: $0.12/GB (expensive for images)
- Storage: Included in deployment size

### With Cloudflare:
- **CDN (Free):** ~70% bandwidth reduction immediately
- **R2 Storage:** $0.015/GB (8x cheaper than Vercel bandwidth)
- **Images (Optional):** $1/month + $0.50/1000 images

### Example Monthly Savings:
```
100GB image traffic:
- Vercel: $12/month
- Cloudflare CDN: ~$3.60/month (70% cached)
- Cloudflare R2: $1.50/month + $0.36/1000 requests
```

---

## 🔧 **Implementation Timeline**

### Week 1: CDN Setup (2 hours)
- Add domain to Cloudflare
- Configure caching rules
- Test and verify

### Week 2: R2 Migration (4 hours)  
- Create bucket and upload assets
- Update environment variables
- Deploy and test

### Future: Images (Optional)
- Only when you need advanced optimization
- Or when adding user-generated content

---

## ✅ **Verification Checklist**

### CDN Working:
- [ ] Assets load from Cloudflare edge locations
- [ ] Response headers show `cf-cache-status: HIT`
- [ ] Page load speed improved globally

### R2 Working:
- [ ] Images load from R2 URLs
- [ ] Original public folder assets removed
- [ ] Bandwidth usage in Vercel decreased

### Images Working (if enabled):
- [ ] WebP format served to compatible browsers
- [ ] Different sizes generated automatically
- [ ] Load times improved on mobile

---

## 🛠️ **Template Usage**

When creating new SaaS projects:

1. **Copy core files:**
   - `lib/cloudflare.ts` 
   - Cloudflare parts of `constants/env.ts`

2. **Create business assets:**
   - New `constants/assets.ts` with your logo/images
   - Update image paths in your components

3. **Environment setup:**
   - Copy Cloudflare variables from `.env.example`
   - Create new R2 bucket for new project

**Clean separation maintained!** 🎯 