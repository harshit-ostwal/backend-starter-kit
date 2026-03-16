# backend-starter-kit

Scaffold a production-ready backend project with a single command.

## Usage

```sh
bunx create-backend-starter-kit <project-name>
```

Or with npm:

```sh
npx create-backend-starter-kit <project-name>
```

## What's included

- **Bun** runtime for fast performance
- **Express.js** for routing and middleware
- **Prisma ORM** for PostgreSQL
- **Zod** for schema validation
- **Swagger UI** for API documentation
- **Winston** for structured logging
- **Biome** for formatting and linting
- **Helmet, CORS, JWT, cookie-parser** for security
- GitHub Actions CI workflow out of the box

## Project Structure

```
├── src/
│   ├── app.js
│   ├── index.js
│   ├── config/
│   ├── constants/
│   ├── core/
│   └── routes/
├── prisma/
│   └── schema.prisma
├── .env.example
└── package.json
```

## Requirements

- [Bun](https://bun.sh/) >= 1.3.4

## Repository

[github.com/harshit-ostwal/backend-starter-kit](https://github.com/harshit-ostwal/backend-starter-kit)

## License

MIT — Made by [Harshit Ostwal](https://github.com/harshit-ostwal)