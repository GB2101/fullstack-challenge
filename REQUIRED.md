# Requisitos do Projeto

## Requisitos Funcionais

### Autenticação e Gateway

- [x] ~~**JWT** com **cadastro/login** (email, username, password) e **proteção de rotas no API Gateway**.~~ [04/10/2025]
- [x] ~~**Hash de senha** com **bcrypt** (ou argon2).~~ [04/10/2025]
- [x] ~~**Tokens:** `accessToken` (15 min) e `refreshToken` (7 dias) + **endpoint de refresh**.~~ [04/10/2025]
- [x] ~~**Swagger/OpenAPI** exposto no Gateway.~~ [05/10/2025]

### Tarefas (inclui comentários e histórico)

- [ ] **CRUD completo** com campos: **título**, **descrição**, **prazo**, **prioridade** e **status**.
- [ ] **Atribuição a múltiplos usuários**.
- [ ] **Comentários**: criar e listar em cada tarefa.
- [ ] **Histórico de alterações** (audit log simplificado).

### Notificações & Tempo Real

- [ ] Ao **criar/atualizar/comentar** uma tarefa, **publicar evento** no broker (**RabbitMQ**).
- [ ] Serviço de **notifications** consome da fila, **persiste** e **entrega via WebSocket**.
- [ ] WebSocket notifica quando:
    - [ ] a tarefa é atribuída ao usuário;
    - [ ] o **status** da tarefa muda;
    - [ ] há **novo comentário** em tarefa da qual participa.

### Docker

- [x] ~~**Obrigatório subir tudo com Docker Compose** (serviços do app, broker, dbs, etc.).~~ [04/10/2025]

## ⚡ HTTP Endpoints & WebSocket Events

### HTTP (Gateway)

- [x] ~~`POST /api/auth/register`~~ [04/10/2025]
- [x] ~~`POST /api/auth/login`~~ [04/10/2025]
- [x] ~~`POST /api/auth/refresh`~~ [04/10/2025]

---

- [ ] `GET /api/tasks?page=&size=`
- [x] ~~`POST /api/tasks`~~ [05/10/2025]
- [ ] `GET /api/tasks/:id`
- [ ] `PUT /api/tasks/:id`
- [x] ~~`DELETE /api/tasks/:id`~~ [05/10/2025]

---

- [ ] `POST /api/tasks/:id/comments`
- [ ] `GET /api/tasks/:id/comments?page=&size`

### WebSocket Events

- [ ] `task:created` – tarefa foi criada
- [ ] `task:updated` – tarefa foi atualizada
- [ ] `comment:new` – novo comentário

---

## Front-end

- [ ] **React.js** com **TanStack Router**.
- [ ] **UI:** mínimo 5 componentes com **shadcn/ui** + **Tailwind CSS**.
- [ ] **Páginas obrigatórias:**
    - [ ] Login/Register com validação (Pode ser um modal)
    - [ ] Lista de tarefas com filtros e busca
    - [ ] Detalhe da tarefa com comentários
- [ ] **Estado:** Context API ou Zustand para auth.
- [ ] **WebSocket:** conexão para notificações em tempo real.
- [ ] **Validação:** `react-hook-form` + `zod`.
- [ ] **Loading/Error:** Skeleton loaders (shimmer effect) e toast notifications.

#### **Diferencial:**

- [ ] TanStack Query.

---

## Back-end

- [x] ~~**Nest.js** com **TypeORM** (PostgreSQL).~~ [04/10/2025]
- [x] ~~**JWT** com Guards e estratégias Passport.~~ [04/10/2025]
- [x] ~~**Swagger** completo no Gateway (`/api/docs`).~~ [05/10/2025]
- [x] ~~**DTOs** com `class-validator` e `class-transformer`.~~ [04/10/2025]
- [ ] **Microsserviços** Nest.js com **RabbitMQ**.
- [ ] **WebSocket** Gateway para eventos real-time.
- [x] ~~**Migrations** com TypeORM.~~ [04/10/2025]
- [x] ~~**Rate limiting** no API Gateway (10 req/seg).~~ [04/10/2025]

#### **Diferencial:**

- [ ] Health checks.
- [ ] Logging com Winston ou Pino.
- [ ] Testes unitários.

---
