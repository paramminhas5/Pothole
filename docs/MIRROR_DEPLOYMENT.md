# Mirror Deployment Guide

This document explains how to run your own mirror of Sahayata. The more mirrors exist, the harder it is to take down.

## Why Run a Mirror?

- **Censorship resistance**: If the primary domain is blocked, mirrors keep the platform accessible
- **Geographic distribution**: Faster load times for users in different regions
- **Redundancy**: If one hosting provider complies with a takedown, others remain
- **Community ownership**: The platform belongs to everyone, not one server

## Prerequisites

- Node.js 20+ (or use Docker)
- npm or pnpm
- A server, VPS, or free hosting account (Cloudflare Pages, Netlify, etc.)

## Option 1: Cloudflare Pages (Free, 5 minutes)

```bash
# Clone
git clone https://github.com/paramminhas5/Pothole.git
cd Pothole

# Install and build
npm install
npm run build

# Deploy (you'll need a Cloudflare account)
npx wrangler pages deploy .next/static --project-name sahayata-mirror
```

Your mirror will be at: `sahayata-mirror.pages.dev`

## Option 2: VPS (Any Linux Server)

```bash
# On your server (Ubuntu/Debian example)
sudo apt update && sudo apt install -y nodejs npm

# Clone and build
git clone https://github.com/paramminhas5/Pothole.git
cd Pothole
npm install
npm run build

# Run with process manager
npm install -g pm2
pm2 start npm --name sahayata -- start
pm2 save

# Optional: Nginx reverse proxy
# server {
#   listen 80;
#   server_name your-mirror-domain.com;
#   location / { proxy_pass http://localhost:3000; }
# }
```

### Recommended VPS Providers (Privacy-Focused)

| Provider | Location | Price | Notes |
|----------|----------|-------|-------|
| [Njalla](https://njal.la) | Sweden/Iceland | ~$5/mo | Privacy-first, no-log, accepts crypto |
| [1984hosting](https://1984hosting.com) | Iceland | ~$5/mo | Icelandic law, strong privacy |
| [OrangeWebsite](https://orangewebsite.com) | Iceland | ~$5/mo | Free speech focused |
| [BuyVM](https://buyvm.net) | Luxembourg | ~$3.50/mo | Cheap, DDoS protection |
| [Hetzner](https://hetzner.com) | Germany/Finland | ~€4/mo | EU jurisdiction, fast |

## Option 3: IPFS (Permanent, Uncensorable)

```bash
# Build static export
npm run build

# Install IPFS CLI
# See: https://docs.ipfs.tech/install/command-line/

# Add to IPFS
ipfs add -r .next/static
# Output: added Qm... sahayata-static/
# This CID (Qm...) is your permanent, uncensorable link

# Pin to keep it available
ipfs pin add Qm...

# Access via any IPFS gateway:
# https://dweb.link/ipfs/Qm...
# https://ipfs.io/ipfs/Qm...
# https://cloudflare-ipfs.com/ipfs/Qm...
```

### Pin with Pinata (keeps it online even when your node is off)
```bash
# Sign up at https://pinata.cloud (free tier: 1GB)
# Upload the .next/static directory via their web interface or API
```

## Option 4: Tor Hidden Service (.onion)

```bash
# Install Tor
sudo apt install tor

# Edit /etc/tor/torrc — add:
HiddenServiceDir /var/lib/tor/sahayata/
HiddenServicePort 80 127.0.0.1:3000

# Restart Tor
sudo systemctl restart tor

# Get your .onion address
cat /var/lib/tor/sahayata/hostname
# Output: something.onion

# Make sure the Next.js app is running on port 3000
npm start
```

Users can now access the site via Tor Browser at your `.onion` address.

## Option 5: Netlify (Free, Alternative CDN)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next/static
```

## Keeping Your Mirror Updated

```bash
# Add to crontab (updates every 6 hours)
# crontab -e
0 */6 * * * cd /path/to/Pothole && git pull && npm install && npm run build && pm2 restart sahayata
```

## Security Notes

- **Do not modify content** on your mirror — serve it as-is from the repo
- **Do not inject analytics** or tracking scripts
- **Do not require login** or collect user data beyond what the app already does
- **Do report issues** to the main repo if you find bugs
- **Do share your mirror URL** so it can be added to the mirrors list

## Cost Summary

| Method | Monthly Cost | Difficulty | Censorship Resistance |
|--------|-------------|------------|----------------------|
| Cloudflare Pages | $0 | Easy | Medium (CF complies with orders) |
| Netlify | $0 | Easy | Medium (same) |
| VPS (Iceland) | $5-10 | Medium | High (strong privacy laws) |
| IPFS | $0-5 | Medium | Very High (content-addressed, permanent) |
| Tor | $0 (on existing VPS) | Advanced | Maximum (anonymous, unblockable) |

## License

This project is AGPL-3.0. You can run mirrors freely. If you modify the code, share your changes.

---

**The more mirrors, the more resilient. Run one. Tell others. Be a cockroach. 🪳**
