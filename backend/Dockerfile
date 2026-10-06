FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache --virtual .build-deps python3 make g++ \
	&& npm ci \
	&& apk del .build-deps

COPY . .
RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npm run db:generate && npm run dev"]
