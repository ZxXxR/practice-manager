# Practice Manager
## Installation. Part 1.

System requires [Node.js](https://nodejs.org/) v16+ to run.

Copy .env file from example

```sh
cd ./practice-manager/server
cp .env.example .env
```

File preview:

> // DB connection link, specifying the connection table in ./schemas/*.prisma \
> DB_URL_POSTGRES=postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require&pgbouncer=true&statement_cache_size=0
> 
> // Server settings \
> SERVER_HOSTNAME=example.com \
> SERVER_HOST=0.0.0.0 \
> SERVER_PORT=3000 \
> SERVER_LOGGER=false \
> SERVER_HTTPS_MODE=false \
> SERVER_CA_KEY_PATH=./example.key \
> SERVER_CA_CERT_PATH=./example.crt \
> 
> // Project settings \
> JWT_SECRET_KEY="secretkey" \
> JWT_ALIVE_TIME=24h \
> COOKIE_SECRET_KEY="secretkey"

**Important "changeme" settings:**
- **DB_URL_POSTGRES** - Connection string to database
- **SERVER_HOSTNAME** - Used to generate cookies
- **SERVER_HOST** - Interface for listening. (127.0.0.1 for local connections, 0.0.0.0 for listening to all interfaces)
- **SERVER_PORT** - Listening port

## Installation. Part 2. (Option to start from node)
Install the dependencies and devDependencies and start the server

```sh
cd ./practice-manager/server
npm i
```

Generate Prisma schema and deploy it to database
```sh
npm run prisma:postgres
npx prisma migrate deploy --schema /app/schemas/postgres.prisma
```

Run the installation script to create default entries in the database and launch the project
```sh
npm run install-system
npm start
```

## Installation. Part 2. (Option to start from docker compose)

Entry direction and run command:
```sh
cd ./practice-manager
docker compose up -d
```

The server will be available at **http://127.0.0.1** with a reverse proxying system from nginx.
The API part is also available at **http://127.0.0.1:3000/api/**.

## License

MIT License

Copyright (c) 2023 ZxXxR

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.