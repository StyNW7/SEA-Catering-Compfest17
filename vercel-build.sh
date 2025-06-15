#!/bin/bash
set -e

# Generate Prisma client
npx prisma generate

# Build Next.js
npx next build

# Create static 404 page
mkdir -p .next/server/pages
echo "404" > .next/server/pages/404.html