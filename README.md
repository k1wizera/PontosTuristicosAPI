# PontosTuristicosWeb

# Sobre
Aplicação desenvolvida com React Native consumindo a API em .NET 6.



 # Ferramentas
- **.NET 6** - Um framework criado pela Microsoft  voltado ao desenvolvimento web
- **Entity Framework** - O Entity Framework Core é um mapeador moderno de banco de dados de objeto para .NET
- ⚛️ **React** - Uma biblioteca JavaScript para criar interfaces de usuário
- 📄 **Axios** - Biblioteca Javascript para fazer requisições http



# Features
-[x] Criação, edição e exclusão de um Ponto Turístico

-[x] Listagem e pesquisa dos Pontos Turísticos



# Demonstração
![GIF](https://raw.githubusercontent.com/k1wizera/PontosTuristicosAPI/master/github/pontosturisticos.gif)



# Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), [.NET6](https://dotnet.microsoft.com/en-us/download), [VSCode](https://code.visualstudio.com/) e um Banco de Dados relacional de sua preferência.



# Rodando a Aplicação
```bash
# Clone este repositório
$ git clone https://github.com/k1wizera/PontosTuristicosAPI.git

# Abra a pasta do projeto com o VSCode
# Abra o termina, instale as dependências e execute a API
$ dotnet restore
$ dotnet run --project API

# Acesse a pasta com a aplicação front pelo terminal
$ cd PontosTuristicosFrontAPP

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm start

# A aplicação iniciará na porta:3000 - acesse <http://localhost:3000/>
```



# Informações Adicionais

 Caso seja necessário abra o arquivo appsettings.json dentro da pasta API e configure a sua <strong>DefaultConnection</strong> com a <strong>Connection String</strong> do seu Banco de Dados relacional.


 ![IMG](https://raw.githubusercontent.com/k1wizera/PontosTuristicosAPI/master/github/db.jpeg)
