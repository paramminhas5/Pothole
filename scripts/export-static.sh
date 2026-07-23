#!/bin/bash
# ============================================
# Sahayata Static Export Script
# Generates offline-ready HTML for IPFS/Tor/mirror deployment
# ============================================

set -e

echo "🔨 Building Sahayata for static export..."
echo ""

# Build the Next.js app
npm run build

echo ""
echo "📦 Export complete. Output in .next/static/"
echo ""
echo "To deploy as a mirror:"
echo ""
echo "  1. Cloudflare Pages:"
echo "     npx wrangler pages deploy .next/static --project-name sahayata-mirror"
echo ""
echo "  2. IPFS (via Pinata or local node):"
echo "     ipfs add -r .next/static"
echo "     # Pin the resulting CID"
echo ""
echo "  3. Any VPS with Node.js:"
echo "     npm start  # serves on port 3000"
echo ""
echo "  4. Tor Hidden Service:"
echo "     # Configure torrc to point to localhost:3000"
echo "     # HiddenServiceDir /var/lib/tor/sahayata/"
echo "     # HiddenServicePort 80 127.0.0.1:3000"
echo ""
echo "✅ Done. The site can now survive anything."
