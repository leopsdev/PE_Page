# Programa Eficiência - Plataforma Web

Bem-vindo ao repositório oficial da plataforma web do **Programa EfiCiência**, uma aplicação full-stack moderna construída para exibir e gerenciar projetos organizacionais, parceiros e colaboradores através de uma interface elegante, performática e interativa.

A aplicação conta com um painel administrativo oculto (acessível via login) que permite o **gerenciamento completo (CRUD)** do conteúdo do site diretamente pelo navegador, atualizando a página em tempo real.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com ferramentas de última geração para garantir estabilidade, segurança e performance:

*   **[Next.js 16 (App Router)](https://nextjs.org/)** - Framework React utilizado tanto para o frontend dinâmico quanto para a construção rápida das rotas de API (Backend).
*   **[React 19](https://react.dev/)** - Biblioteca principal de interfaces.
*   **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilização utility-first focada na estética *Glassmorphism* (fundo transparente) adotada pelo projeto.
*   **[Framer Motion](https://www.framer.com/motion/)** - Motor avançado de animações suaves para interações com os modais e rolagem da página.
*   **[Prisma ORM](https://www.prisma.io/)** - ORM altamente tipado utilizado para ler e escrever no banco de dados com segurança.
*   **[SQLite](https://www.sqlite.org/)** - Banco de dados relacional leve e local embutido, ideal pela facilidade de configuração e deploy simplificado.
*   **[NextAuth.js (v4)](https://next-auth.js.org/)** - Solução completa de autenticação protegendo as rotas de backend e liberando acesso via sistema de credenciais seguras.

---

## ⚙️ Procedimentos e Como Rodar o Projeto (Localmente)

Para clonar e iniciar a aplicação no seu computador, certifique-se de que possui o [Node.js](https://nodejs.org/) instalado na versão 20+ e siga os passos abaixo no terminal.

### 1. Instalar as dependências
Navegue até a pasta local \`PE_Page\` e execute o instalador padrão:
\`\`\`bash
npm install
\`\`\`

### 2. Configurar as Variáveis de Ambiente
Na raiz do projeto (no mesmo nível do arquivo \`package.json\`), crie um arquivo chamado \`.env\` e defina as variáveis obrigatórias para o NextAuth utilizar como criptografia. Exemplo:

\`\`\`env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="uma-chave-secreta-muito-segura-aqui"
\`\`\`

### 3. Sincronizar o Banco de Dados (Prisma)
Para preparar o arquivo SQLite que receberá os dados do sistema, faça o mapeamento (push) dos esquemas do Prisma para criar as tabelas vazias:
\`\`\`bash
npx prisma db push
\`\`\`
*(Nota: O banco físico será gerado na pasta prisma sob o nome `dev.db`)*

### 4. Popular o Banco com os Dados Originais (Seeding)
Após criar as tabelas, utilize o script nativo em JS de Semeamento ("seed") para cadastrar automaticamente a equipe, os primeiros parceiros e os projetos iniciais (SIMAD, SIMEC, SIMED) no banco recém-criado:
\`\`\`bash
node prisma/seed.js
\`\`\`
Deverá retornar `✅ Banco de dados populado com sucesso!`.

### 5. Rodar o Servidor Local
Agora o projeto já está pronto com todas as funcionalidades visuais e lógicas disponíveis:
\`\`\`bash
npm run dev
\`\`\`
Acesse \`http://localhost:3000\` em seu navegador.

---

## 🛡️ Área de Administração Autenticada

A página inicial exibe apenas dados autorizados. No entanto, o sistema conta com Modais ocultos para administração que permitem adicionar, atualizar, colocar URL do projeto, foto de perfil, etc.

1. Na **barra de navegação principal (Navbar)** superior, há um pequeno botão de "Login" (ou pela tecla flutuante no rodape).
2. O sistema perguntará pelas credenciais.
3. Se concedido o acesso, um menu persistente e flutuante no canto inferior direito será liberado, contendo ferramentas para criar ou deletar Parceiros, Projetos e Colaboradores — todas as mudanças refletirão na aplicação e no banco de dados de maneira **imediata**, sem exigir atualizações de página.
