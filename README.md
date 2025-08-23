Sistema de Agendamento para Barbearia
Este é um sistema de agendamento completo para barbearia, com interface responsiva e integração com JSON Server para armazenamento de dados.

📋 Funcionalidades
Sistema de abas para fácil navegação

Página inicial com apresentação dos barbeiros e serviços

Sistema de agendamento com seleção de barbeiro, serviço, data e hora

Verificação de horários disponíveis para evitar conflitos

Gestão de agendamentos com opção de cancelamento

Dashboard administrativo com estatísticas e gráficos

Design responsivo que funciona em mobile e desktop

Imagens dos barbeiros e serviços

🛠️ Tecnologias Utilizadas
HTML5

CSS3 (com Flexbox e Grid)

JavaScript (ES6+)

JSON Server (para simulação de API REST)

Font Awesome (ícones)

Chart.js (gráficos no dashboard)

📦 Estrutura do Projeto
text
/agendamento-barbeiro
│── index.html              # Página principal
│── styles.css              # Estilos principais
│── script.js               # Lógica da aplicação
│── db.json                 # Dados do JSON Server
├── assets/
│   ├── barbeiros/          # Imagens dos barbeiros
│   │   ├── joao.jpg
│   │   ├── carlos.jpg
│   │   ├── natalia.jpg
│   │   └── ricardo.jpg
│   ├── servicos/           # Imagens dos serviços
│   │   ├── corte.jpg
│   │   ├── barba.jpg
│   │   ├── feminino.jpg
│   │   ├── kids.jpg
│   │   ├── pigmentacao.jpg
│   │   └── combo.jpg
│   └── bg.jpg              # Imagem de fundo
└── README.md
🚀 Como Executar o Projeto
Pré-requisitos
Node.js instalado

NPM ou Yarn

Passo a Passo
Clone ou baixe os arquivos do projeto

Instale o JSON Server globalmente (se ainda não tiver):

bash
npm install -g json-server
Inicie o JSON Server:

bash
json-server --watch db.json --port 3000
Abra o arquivo index.html em um servidor local:

Se estiver usando o VSCode, instale a extensão "Live Server" e clique em "Go Live"

Ou execute um servidor local com Python:

bash
python -m http.server 8000
Ou com Node.js:

bash
npx http-server
Acesse a aplicação no navegador:

http://localhost:8000 (ou a porta configurada)

📁 Estrutura de Dados
Barbeiros
Cada barbeiro possui:

ID, nome, especialidade, experiência, imagem e bio

Serviços
Cada serviço possui:

ID, nome, duração, preço, imagem e descrição

Agendamentos
Cada agendamento possui:

ID, nome do cliente, telefone, ID do barbeiro, ID do serviço, data, hora, data de criação e preço

🎨 Personalização
Para adicionar mais barbeiros:
Adicione a imagem na pasta assets/barbeiros/

Atualize o array barbeiros no arquivo script.js

Atualize o db.json se necessário

Para adicionar mais serviços:
Adicione a imagem na pasta assets/servicos/

Atualize o array servicos no arquivo script.js

Para modificar o horário de funcionamento:
Edite o array horariosDisponiveis no arquivo script.js

📱 Responsividade
O sistema é totalmente responsivo e se adapta a:

Dispositivos móveis (até 480px)

Tablets (até 768px)

Desktop (acima de 768px)

📞 Suporte
Em caso de dúvidas ou problemas com a configuração, verifique:

Se o JSON Server está rodando na porta 3000

Se todas as imagens estão nas pastas corretas

Se o navegador não está bloqueando requisições CORS
