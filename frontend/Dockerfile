FROM node:20-alpine AS build
WORKDIR /app

COPY package.json ./
COPY next.config.mjs ./
COPY src ./src

RUN npm install
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000
CMD ["npm", "start"]
