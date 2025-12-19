# ---------- Build stage ----------
FROM node:22-alpine AS build

WORKDIR /app

# Install deps first (better caching)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Choose the right installer automatically
RUN set -eux; \
  if [ -f package.json ]; then npm install --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
  elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile; \
  else npm install; fi

# Copy the rest of the project
COPY . .

# Build (Vite outputs to /app/dist by default)
RUN npm run build


# ---------- Run stage ----------
FROM nginx:1.27-alpine AS runtime

# Optional: Vite SPA routing support (React Router)
RUN rm -f /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
