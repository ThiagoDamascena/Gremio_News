# Grêmio IFPE
Este é um projeto para um site do Grêmio estudantil do IFPE campus Paulista  
![Badge](https://img.shields.io/badge/Progresso-80%25-orange)
## Autores😎
* Líder: Thiago Damascena
* Luiz Carlos
* Matheus Henrique
* Thallys Regis

### Mentor
* Rodrigo Rocha

## Objetivo🎯
Esse site tem o intuito de servir como uma plataforma na qual os estudantes podem dar e receber ajuda um dos outros e do Grêmio.

Além disso também será utilizado como projeto  para a matéria de desenvolvimento web.

## Uso e Funcionalidades👨‍💻
### Página inicial
A página inicial conta com uma barra superior com um botão que leva para o Login, uma barra de pesquisa para conseguir achar informações antigas e um botão de redirecionamento para o instagram do Grêmio.  
Logo abaixo, está um carrosel com os eventos mais próximos e os mais recentes.  
Em seguida, estão 3 das Notícias mais recentes, seguidos dos últimos resumos enviados pelos alunos.

### Página de Login
A página de login conta com a opção de logar como Aluno ou administrador, além da opção de se cadastrar.  
Alunos podem apenas ver as informações da página inicial e enviar seus resumos para serem aprovados pelos Administradores.  
Os Admins no entanto, serão aqueles que gerenciarão o site, escolhendo tudo que será repassado pelo site, como notícias, resumos e eventos.

### Página de Admin
A página de Admin é onde eles poderão gerenciar os conteúdos do site.

## Contato✉️
Para enviar suas sugestões e reclamações contate-nos por meio do email:  
evagremioestudantil@gmail.com

## Como ligar o Server?
Para iniciar o servidor coloque o seguinte comando no terminal para iniciar o servirdor docker:
docker-compose up -build
ou
docker-compose up -d (para rodar em background e deixar o terminal livre)

OBS: Em versões mais recentes do docker é possível rodar o comando sem o ifem, ficando da seguinte forma:
docker compose up (modo que queira rodar: -d, -build, ou outro)

Para desligar o servidor digite o seguinte comando no terminal:
docker-compose down -v
ou
docker compose down -v (para versões mais recentes)

## Como acessar o Site?
Para acessar a página inicial do site acesse:
http://localhost:3000/

Para entrar direto na página de login:
http://localhost:3000/login

Para entrar direto na página de admin:
http://localhost:3000/admin

