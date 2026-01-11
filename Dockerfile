FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "npm run db:migrate && npm start"]
