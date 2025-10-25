# RepoMusic

<!-- Sugestão: Tire um print da sua tela e substitua este link -->

## 🎵 Sobre o Projeto

RepoMusic é uma aplicação web para busca de informações sobre artistas e suas músicas, construída com as tecnologias mais recentes do ecossistema Angular. O projeto foi desenvolvido como uma Single Page Application (SPA) e consome a API pública TheAudioDB para obter os dados.

A interface possui um design moderno e responsivo, com um tema escuro inspirado em plataformas como GitHub e Spotify.

---

## ✨ Funcionalidades

-   **Autenticação de Usuário**: Sistema de login simples para acesso à aplicação.
-   **Busca de Artistas em Tempo Real**: Campo de busca na página inicial que consulta a API e exibe os resultados instantaneamente conforme o usuário digita.
-   **Histórico de Buscas**: Os artistas visitados são salvos no `localStorage` e exibidos na tela inicial para acesso rápido, persistindo entre as sessões.
-   **Página de Detalhes do Artista**: Exibe biografia (priorizando o português quando disponível), discografia completa e as músicas mais populares.
-   **Página de Detalhes do Álbum**: Mostra a capa, ano de lançamento e descrição do álbum (também priorizando o português).
-   **Navegação Intuitiva**: Roteamento completo entre todas as páginas da aplicação.

---

## 🚀 Tecnologias Utilizadas

-   **Angular (v20)**: Framework principal para a construção da interface.
-   **Componentes Standalone**: Arquitetura moderna do Angular para componentes mais modulares e independentes.
-   **TypeScript**: Superset do JavaScript que adiciona tipagem estática e melhora a manutenibilidade do código.
-   **RxJS**: Para gerenciamento de eventos e programação reativa, especialmente na funcionalidade de busca em tempo real com `debounceTime` e `switchMap`.
-   **SCSS**: Pré-processador CSS para uma estilização mais organizada, aninhada e poderosa.
-   **API TheAudioDB**: Fonte de todos os dados sobre artistas, álbuns e músicas.

---

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para rodar o RepoMusic em seu ambiente de desenvolvimento.

### Pré-requisitos

-   Node.js (versão 18.x ou superior)
-   Angular CLI (v20 ou superior)

### Instalação e Execução

1.  Clone o repositório para sua máquina local:
    ```bash
    git clone https://github.com/Felipe-JLima/RepoMusic.git
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd RepoMusic
    ```
3.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
4.  Inicie o servidor de desenvolvimento do Angular com a configuração de proxy:
    ```bash
    ng serve --proxy-config proxy.conf.json
    ```
5.  Abra seu navegador e acesse `http://localhost:4200`

---


### Credenciais para Login

Para fins de demonstração, utilize as seguintes credenciais para acessar a aplicação:

-   **Email**: `felipe@repomusic.com`
-   **Senha**: `123456`

---
