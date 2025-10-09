# Requisitos do Projeto

## Requisitos Funcionais

### Autenticação e Gateway

- [x] ~~**JWT** com **cadastro/login** (email, username, password) e **proteção de rotas no API Gateway**.~~ [04/10/2025]
- [x] ~~**Hash de senha** com **bcrypt** (ou argon2).~~ [04/10/2025]
- [x] ~~**Tokens:** `accessToken` (15 min) e `refreshToken` (7 dias) + **endpoint de refresh**.~~ [04/10/2025]
- [x] ~~**Swagger/OpenAPI** exposto no Gateway.~~ [05/10/2025]

### Tarefas (inclui comentários e histórico)

- [x] ~~**CRUD completo** com campos: **título**, **descrição**, **prazo**, **prioridade** e **status**.~~ [06/10/2025]
- [x] ~~**Atribuição a múltiplos usuários**.~~ [06/10/2025]
- [x] ~~**Comentários**: criar e listar em cada tarefa.~~ [06/10/2025]
- [x] ~~**Histórico de alterações** (audit log simplificado).~~ [06/10/2025]

### Notificações & Tempo Real

- [x] ~~Ao **criar/atualizar/comentar** uma tarefa, **publicar evento** no broker (**RabbitMQ**).~~ [09/10/2025]
- [x] ~~Serviço de **notifications** consome da fila, **persiste** e **entrega via WebSocket**.~~ [09/10/2025]
- [x] ~~WebSocket notifica quando:~~ [09/10/2025]
    - [x] ~~a tarefa é atribuída ao usuário;~~ [09/10/2025]
    - [x] ~~o **status** da tarefa muda;~~ [09/10/2025]
    - [x] ~~há **novo comentário** em tarefa da qual participa.~~ [09/10/2025]

### Docker

- [x] ~~**Obrigatório subir tudo com Docker Compose** (serviços do app, broker, dbs, etc.).~~ [04/10/2025]

## ⚡ HTTP Endpoints & WebSocket Events

### HTTP (Gateway)

- [x] ~~`POST /api/auth/register`~~ [04/10/2025]
- [x] ~~`POST /api/auth/login`~~ [04/10/2025]
- [x] ~~`POST /api/auth/refresh`~~ [04/10/2025]

---

- [x] ~~`GET /api/tasks?page=&size=`~~ [06/10/2025]
- [x] ~~`POST /api/tasks`~~ [05/10/2025]
- [x] ~~`GET /api/tasks/:id`~~ [06/10/2025]
- [x] ~~`PUT /api/tasks/:id`~~ [06/10/2025]
- [x] ~~`DELETE /api/tasks/:id`~~ [05/10/2025]

---

- [x] ~~`POST /api/tasks/:id/comments`~~ [06/10/2025]
- [x] ~~`GET /api/tasks/:id/comments?page=&size`~~ [06/10/2025]

### WebSocket Events

- [x] ~~`task:created` – tarefa foi criada~~ [09/10/2025]
- [x] ~~`task:updated` – tarefa foi atualizada~~ [09/10/2025]
- [x] ~~`comment:new` – novo comentário~~ [09/10/2025]

---

## Front-end

- [x] ~~**React.js** com **TanStack Router**.~~ [08/10/2025]
- [x] ~~**UI:** mínimo 5 componentes com **shadcn/ui** + **Tailwind CSS**.~~ [08/10/2025]
- [x] ~~**Páginas obrigatórias:**~~ [09/10/2025]
    - [x] ~~Login/Register com validação (Pode ser um modal)~~ [08/10/2025]
    - [x] ~~Lista de tarefas com filtros e busca~~ [08/10/2025]
    - [x] ~~Detalhe da tarefa com comentários~~ [08/10/2025]
- [x] ~~**Estado:** Context API ou Zustand para auth.~~ [09/10/2025]
- [x] ~~**WebSocket:** conexão para notificações em tempo real.~~ [09/10/2025]
- [x] ~~**Validação:** `react-hook-form` + `zod`.~~ [09/10/2025]
- [ ] Loading/Error: Skeleton loaders (shimmer effect) e toast notifications.

#### **Diferencial:**

- [x] ~~TanStack Query.~~ [09/10/2025]

---

## Back-end

- [x] ~~**Nest.js** com **TypeORM** (PostgreSQL).~~ [04/10/2025]
- [x] ~~**JWT** com Guards e estratégias Passport.~~ [04/10/2025]
- [x] ~~**Swagger** completo no Gateway (`/api/docs`).~~ [05/10/2025]
- [x] ~~**DTOs** com `class-validator` e `class-transformer`.~~ [04/10/2025]
- [x] ~~**Microsserviços** Nest.js com **RabbitMQ**.~~ [09/10/2025]
- [x] ~~**WebSocket** Gateway para eventos real-time.~~ [09/10/2025]
- [x] ~~**Migrations** com TypeORM.~~ [04/10/2025]
- [x] ~~**Rate limiting** no API Gateway (10 req/seg).~~ [04/10/2025]

#### **Diferencial:**

- [ ] Health checks.
- [ ] Logging com Winston ou Pino.
- [ ] Testes unitários.

---
