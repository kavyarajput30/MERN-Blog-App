# ---------- Build Stage ----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_FIREBASE_API_KEY

ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY

RUN npm run build

# ---------- Production Stage ----------
FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve
#--------this is the build which comes from first step------------------
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]