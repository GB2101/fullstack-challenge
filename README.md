# Fullstack Challenge

### Gabriel Braz Cavalcante Silva

## Arquitetura

### Auth Service

- auth-register
- auth-login
- auth-refresh

### Tasks Service

- tasks-create
- tasks-delete
- tasks-update

## Decisões Técnicas

- Os campos de Prioridade e Status são referencias para uma tabela propria. Pois isso tras mais flexibilidade para alterar estes campos depois, sem a necessidade de alterar o codigo fonte.
- Usar apenas um único banco de dados, por questões de simplicidade. Porém, para aplicações maiores, um banco por serviço pode vir a ser mais interessante.
- Gateway descriptografa o token JWT, para isso, ele tem uma cópia da chave privada. Uma alternativa seria o serviço de autenticação possuir uma rota de validação, porém este serviço seria acessado em toda requisição.
- Alguns tipos estão duplicados entre serviços, porém por serem poucos, não vi necessidade de centralizar todos em um unico pacote

## Dúvidas

- Como deve ser enviado o projeto?
- Pode implementar rotas e funcionalidades extras?
- Vcs querem um sistema kanban ou isso é opcional?
