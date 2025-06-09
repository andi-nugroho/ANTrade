# 🚀 Deployment Guide - FarMint NFT Marketplace

## 🔧 **Quick Fix for Current Netlify Error**

The error is caused by an outdated `pnpm-lock.yaml`. Here are the solutions:

### **Solution 1: Use npm instead of pnpm (Recommended)**

Update your Netlify build settings:
```bash
# Build command:
cd farmint-fe && npm install && npm run build

# Publish directory:
farmint-fe/out
```

### **Solution 2: Fix pnpm lock file**

If you prefer to keep using pnpm:
```bash
# Build command:
cd farmint-fe && pnpm install --frozen-lockfile=false && pnpm build

# Publish directory:
farmint-fe/out
```

### **Solution 3: Update lock file locally (Already Done)**

The `pnpm-lock.yaml` has been updated and committed. You can now use:
```bash
# Build command:
cd farmint-fe && pnpm install && pnpm build

# Publish directory:
farmint-fe/out
```

## 📋 **Netlify Configuration**

### **Build Settings:**
- **Base directory**: `.` (root)
- **Build command**: `cd farmint-fe && npm run build`
- **Publish directory**: `farmint-fe/out`
- **Node version**: `18`

### **Environment Variables:**
Add these in Netlify dashboard:
```
NEXT_TELEMETRY_DISABLED=1
DISABLE_OPENCOLLECTIVE=1
NODE_VERSION=18
```

## 🌐 **Alternative Deployment Options**

### **1. Vercel (Recommended for Next.js)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from farmint-fe directory
cd farmint-fe
vercel --prod
```

### **2. GitHub Pages**
```bash
# Build the project
cd farmint-fe
npm run build

# Deploy the 'out' folder to gh-pages branch
npx gh-pages -d out
```

### **3. Firebase Hosting**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Build and deploy
cd farmint-fe
npm run build
firebase deploy
```

### **4. Surge.sh**
```bash
# Install Surge
npm install -g surge

# Build and deploy
cd farmint-fe
npm run build
cd out
surge . your-domain.surge.sh
```

## 🔍 **Troubleshooting**

### **Common Issues:**

#### **1. "Cannot install with frozen-lockfile"**
**Solution**: Use `--frozen-lockfile=false` or switch to npm

#### **2. "Build failed during Install dependencies"**
**Solution**: 
- Clear Netlify cache
- Use npm instead of pnpm
- Update Node.js version to 18+

#### **3. "Module not found" errors**
**Solution**: 
- Run `npm install` locally
- Commit updated lock files
- Ensure all dependencies are in package.json

#### **4. "Static export error"**
**Solution**: 
- Check next.config.js has `output: 'export'`
- Ensure no server-side features are used
- Remove any API routes

### **Build Commands That Work:**

```bash
# Option 1: npm (most reliable)
cd farmint-fe && npm ci && npm run build

# Option 2: pnpm with force
cd farmint-fe && pnpm install --frozen-lockfile=false && pnpm build

# Option 3: Clean install
cd farmint-fe && rm -rf node_modules && npm install && npm run build
```

## ✅ **Pre-deployment Checklist**

- [ ] `pnpm-lock.yaml` is up to date
- [ ] Build works locally: `npm run build`
- [ ] All dependencies are in `package.json`
- [ ] Environment variables are set
- [ ] `netlify.toml` is configured
- [ ] Static export is enabled in `next.config.js`

## 🎯 **Recommended Netlify Settings**

```toml
[build]
  command = "cd farmint-fe && npm install && npm run build"
  publish = "farmint-fe/out"
  base = "."

[build.environment]
  NODE_VERSION = "18"
  NEXT_TELEMETRY_DISABLED = "1"
```

## 🚀 **Deploy Now**

1. **Commit the updated lock file** (already done)
2. **Update Netlify build command** to use npm
3. **Trigger a new deploy**
4. **Check the build logs** for any remaining issues

The deployment should now work successfully! 🎉

## 📞 **Need Help?**

If you're still having issues:
1. Check the build logs in Netlify dashboard
2. Try deploying to Vercel as an alternative
3. Use the manual deployment option with the `out` folder
