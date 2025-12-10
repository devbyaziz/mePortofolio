# Portfolio Project

Modern portfolio website built with React, TypeScript, and Three.js featuring 3D animations.

## Tech Stack

- React 19.1.1 + TypeScript 4.9.5
- Three.js 0.180.0 (React Three Fiber & Drei)
- Vite 5.0.0
- Node.js 20+

## Deploy to Netlify

### Automatic Deploy (Recommended)

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Connect to your GitHub repository
5. Netlify will automatically detect the build settings from `netlify.toml`
6. Click "Deploy site"

### Manual Deploy

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy dist folder to Netlify
# Option 1: Using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist

# Option 2: Drag and drop dist folder to Netlify dashboard
```

### Build Configuration

The project is pre-configured with:
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`
- ✅ Node version: 20 (specified in `.nvmrc`)
- ✅ SPA redirects configured
- ✅ Security headers enabled
- ✅ Asset caching optimized

### Environment Variables (if needed)

No environment variables required for basic deployment.

## Development

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

