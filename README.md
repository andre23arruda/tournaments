# Aplicativo de Torneios

Uma aplicação web baseada em React para gerenciar e exibir informações de torneios, com foco em competições esportivas.

## 🚀 Funcionalidades

-   Exibição de detalhes e status do torneio
-   Acompanhamento de jogos em tempo real
-   Funcionalidade de busca de jogadores/times
-   Alternância entre tema claro/escuro
-   Design responsivo
-   Controles administrativos para gerentes de torneio
-   Rankings e estatísticas dos jogadores
-   Histórico e resultados das partidas

## 💻 Tecnologias

-   React
-   Vite
-   Tailwind CSS
-   React Router DOM

## 🏗️ Estrutura do Projeto

```
src/
├── App.jsx              # Componente principal da aplicação
├── Components.jsx       # Componentes UI compartilhados
├── index.css           # Estilos globais
├── main.jsx           # Ponto de entrada da aplicação
├── NotFound.jsx       # Página de erro 404
├── utils.js           # Funções utilitárias
├── League/            # Componentes da visualização de liga
│   └── index.jsx
└── Tournament/        # Componentes da visualização de torneio
    └── index.jsx
```

## 🛠️ Configuração

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` e adicione sua configuração de API:

```
VITE_APP_ROUTE_API=sua_url_api_aqui
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🔧 Variáveis de Ambiente

-   `VITE_APP_ROUTE_API`: URL base para a API do torneio

## 🌙 Detalhamento das Funcionalidades

### Alternância de Tema

-   Suporta modos claro e escuro
-   Persiste a preferência do usuário no localStorage

### Visualização do Torneio

-   Exibe nome e data do torneio
-   Mostra programação e resultados das partidas
-   Indicadores de status do jogo em tempo real
-   Funcionalidade de busca de jogadores/times

### Recursos Administrativos

-   Rotas protegidas para gerenciamento do torneio
-   Atualizações de placar dos jogos
-   Gerenciamento do status do torneio

## 📱 Design Responsivo

A aplicação é totalmente responsiva e otimiza a exibição para:

-   Dispositivos móveis
-   Tablets
-   Telas desktop

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/NovaFuncionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é open source e disponível sob a Licença MIT.
