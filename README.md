# Todo App (NestJS + Prisma + PostgreSQL)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with Prisma and PostgreSQL integration.

---

## Project setup

```bash
$ pnpm install
```

---

## Prisma usage

### 1. Init (초기 설정)

```bash
# Prisma 설치
$ pnpm add @prisma/client
$ pnpm add -D prisma

# 초기화 (schema.prisma, .env 생성)
$ pnpm prisma init
```

`.env` 예시:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo?schema=public"
```

### 2. Create (DB 반영 & 클라이언트 생성)

모델 작성: `prisma/schema.prisma`

```prisma
model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  is_done   Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
}
```

DB 반영 및 Prisma Client 생성:

```bash
$ pnpm prisma migrate dev --name init
```

데이터 탐색 GUI:

```bash
$ pnpm prisma studio
```

### 3. Update (모델 변경 후 반영)

모델 변경 시 예시:

```prisma
model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  is_done   Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

DB 반영:

```bash
$ pnpm prisma migrate dev --name add_priority_to_todo
```

Prisma Client 다시 생성:

```bash
$ pnpm prisma generate
```

DB 초기화(개발용):

```bash
$ pnpm prisma migrate reset
```

---

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

---

## Useful scripts

```bash
# Prisma 관련
$ pnpm prisma:dev     # prisma migrate dev
$ pnpm prisma:studio  # prisma studio
$ pnpm prisma:reset   # prisma migrate reset
$ pnpm prisma:deploy  # prisma migrate deploy
```

---

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
