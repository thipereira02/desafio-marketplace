# Marketplace de Produtos

Este projeto consiste em um sistema Fullstack de Marketplace, permitindo o gerenciamento de produtos (CRUD), adição ao carrinho e finalização de compra com validação de estoque em tempo real.

O projeto foi desenvolvido focando em **Clean Code**, princípios **SOLID** e arquitetura em camadas.

## 🚀 Tecnologias Utilizadas

### Backend (API)
- **Java 17** (Spring Boot 3.5.8)
- **Spring Data JPA** (PostgreSQL)
- **Bean Validation** (Regras de negócio e consistência)
- **JUnit 5 & Mockito** (Testes Unitários de regra de estoque)
- **Swagger / OpenAPI** (Documentação automática)
- **Docker** (Containerização do Banco)

### Frontend (Web)
- **React** (Vite + TypeScript)
- **Styled Components** (Estilização CSS-in-JS)
- **Axios** (Consumo de API)
- **Vitest & React Testing Library** (Testes Unitários de Interface)
- **ESLint + Prettier** (Padronização de código)

---

## ⚙️ Pré-requisitos

- Docker & Docker Compose
- Java 17
- Node.js (v18 ou superior)

---

## 🏃‍♂️ Como Rodar o Projeto (Localmente)

### 1. Subir o Banco de Dados
Na raiz do projeto, inicie o container do PostgreSQL:
```bash
docker-compose up -d postgres
```

### 2. Rodar o Backend
```bash
cd backend
# Comando recomendado (Linux/Mac - Garante Java 17)
JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 mvn spring-boot:run

# Windows
mvn spring-boot:run
```
A API estará disponível em: http://localhost:8080

#### 🔗 Swagger (Docs): http://localhost:8080/swagger-ui/index.html

### 2. Rodar o Frontend
```bash
cd frontend
npm install
npm run dev
```
Acesse a aplicação em: http://localhost:5173

## ✅ Funcionalidades & Regras de Negócio
### 1. Gestão de Produtos:

- Listagem e Cadastro de produtos.

- Validação: Preço > 0 e Estoque não negativo.

### 2. Carrinho de Compras:

- Adição dinâmica de itens.

- Cálculo automático do total no Frontend.

- Validação visual de estoque esgotado.

### 3. Checkout (Venda):

- Validação transacional de estoque no Backend ("Se não tem estoque, bloqueia").

- Baixa automática no estoque após sucesso.

- Persistência do Pedido (Order) e Itens (OrderItem).

## 🧪 Executando os Testes
O projeto possui cobertura de testes tanto no Backend (Regras de Negócio) quanto no Frontend (Renderização).

#### Backend (JUnit):
```bash
cd backend
mvn test
```

#### Frontend (Vitest):
```bash
cd frontend
npm test
```

## 📂 Estrutura do Projeto
```text
/
├── backend/                     # API Spring Boot
│   ├── src/main/java/com/desafio/marketplace
│   │   ├── config/              # Configuração CORS Global
│   │   ├── controller/          # Endpoints (Product, Cart)
│   │   ├── dto/                 # Transferência de Dados (CartItemDTO)
│   │   ├── model/               # Entidades (Product, Order)
│   │   ├── repository/          # Acesso ao Banco
│   │   └── service/             # Regra de Estoque e Checkout
│   └── src/test                 # Testes Unitários
│
├── frontend/                    # Aplicação React
│   ├── src/
│   │   ├── components/          # UI Kit (SharedStyles)
│   │   ├── pages/               # Página Principal (ProductPage)
│   │   ├── styles/              # GlobalStyles (CSS Reset)
│   │   └── tests/               # Testes Unitários (Vitest)
│   └── package.json
│
├── docker-compose.yml           # Banco de Dados
└── README.md                    # Documentação
```
