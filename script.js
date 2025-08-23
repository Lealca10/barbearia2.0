document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navTabs = document.querySelectorAll('.nav-tabs li');
    const tabContents = document.querySelectorAll('.tab-content');
    const form = document.getElementById('agendamentoForm');
    const selectBarbeiro = document.getElementById('barbeiro');
    const selectServico = document.getElementById('servico');
    const inputData = document.getElementById('data');
    const selectHora = document.getElementById('hora');
    const mensagemDiv = document.getElementById('mensagem');
    const listaAgendamentos = document.getElementById('listaAgendamentos');
    const barbeirosHome = document.getElementById('barbeirosHome');
    const servicosHome = document.getElementById('servicosHome');
    const filtroTelefone = document.getElementById('filtroTelefone');
    const buscarAgendamentos = document.getElementById('buscarAgendamentos');
    
    // Elementos do Dashboard
    const agendamentosHoje = document.getElementById('agendamentosHoje');
    const agendamentosSemana = document.getElementById('agendamentosSemana');
    const barbeiroOcupado = document.getElementById('barbeiroOcupado');
    const servicoPopular = document.getElementById('servicoPopular');
    
    // URL base do JSON Server
    const API_URL = 'http://localhost:3000';
    
    // Dados iniciais
    const barbeiros = [
        { 
            id: 1, 
            nome: 'João Silva', 
            especialidade: 'Cortes modernos', 
            experiencia: '5 anos', 
            imagem: 'assets/barbeiros/joao.jpg',
            bio: 'Especialista em cortes modernos e estilos urbanos.'
        },
        { 
            id: 2, 
            nome: 'Carlos Mendes', 
            especialidade: 'Barba e bigode', 
            experiencia: '8 anos', 
            imagem: 'assets/barbeiros/carlos.jpg',
            bio: 'Mestre no cuidado com barbas e bigodes, com técnicas tradicionais.'
        },
        { 
            id: 3, 
            nome: 'Ricardo Oliveira', 
            especialidade: 'Cortes clássicos', 
            experiencia: '10 anos', 
            imagem: 'assets/barbeiros/ricardo.jpg',
            bio: 'Tradição e excelência em cortes clássicos desde 2010.'
        },
        { 
            id: 4, 
            nome: 'Natália Santos', 
            especialidade: 'Cortes kids e feminino', 
            experiencia: '7 anos', 
            imagem: 'assets/barbeiros/natalia.jpg',
            bio: 'Tradição e excelência em cortes clássicos desde 2010.'
        }
    ];
    
    const servicos = [
        { 
            id: 1, 
            nome: 'Corte de Cabelo', 
            duracao: 30, 
            preco: 40, 
            imagem: 'assets/servicos/corte.jpg',
            descricao: 'Corte profissional com técnicas modernas e acabamento perfeito.'
        },
        { 
            id: 2, 
            nome: 'Barba', 
            duracao: 20, 
            preco: 35, 
            imagem: 'assets/servicos/barba.jpg',
            descricao: 'Aparo e modelagem de barba com toalha quente e produtos premium.'
        },
        { 
            id: 3, 
            nome: 'Corte e Barba', 
            duracao: 50, 
            preco: 75, 
            imagem: 'assets/servicos/combo.jpg',
            descricao: 'Pacote completo com corte de cabelo e barba com desconto especial.'
        },
        { 
            id: 4, 
            nome: 'Pigmentação', 
            duracao: 40, 
            preco: 120, 
            imagem: 'assets/servicos/pigmentacao.jpg',
            descricao: 'Técnica avançada para cobrir fios brancos e uniformizar a cor.'
        }
        ,
        { 
            id: 5, 
            nome: 'Kids', 
            duracao: 30, 
            preco: 35, 
            imagem: 'assets/servicos/kids.jpg',
            descricao: 'Técnica avançada para cobrir fios brancos e uniformizar a cor.'
        },
        { 
            id: 6, 
            nome: 'Feminino', 
            duracao: 40, 
            preco: 80, 
            imagem: 'assets/servicos/feminino.jpg',
            descricao: 'Técnica avançada para cobrir fios brancos e uniformizar a cor.'
        }
    ];
    
    const horariosDisponiveis = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];
    
    // Navegação por tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove a classe active de todas as tabs
            navTabs.forEach(t => t.classList.remove('active'));
            // Adiciona a classe active apenas na tab clicada
            this.classList.add('active');
            
            // Esconde todos os conteúdos
            tabContents.forEach(content => content.classList.remove('active'));
            // Mostra apenas o conteúdo correspondente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Carrega dados específicos quando a tab é aberta
            if (tabId === 'meus-agendamentos') {
                carregarAgendamentos();
            } else if (tabId === 'dashboard') {
                carregarDashboard();
            }
        });
    });
    
    // Preencher selects e cards
    function preencherSelectBarbeiros() {
        selectBarbeiro.innerHTML = '<option value="">Selecione um barbeiro</option>';
        barbeiros.forEach(barbeiro => {
            const option = document.createElement('option');
            option.value = barbeiro.id;
            option.textContent = barbeiro.nome;
            selectBarbeiro.appendChild(option);
        });
    }
    
    function preencherSelectServicos() {
        selectServico.innerHTML = '<option value="">Selecione um serviço</option>';
        servicos.forEach(servico => {
            const option = document.createElement('option');
            option.value = servico.id;
            option.textContent = `${servico.nome} (${servico.duracao} min) - R$ ${servico.preco}`;
            selectServico.appendChild(option);
        });
    }
    
    function preencherBarbeirosHome() {
        barbeirosHome.innerHTML = '';
        barbeiros.forEach(barbeiro => {
            const card = document.createElement('div');
            card.className = 'barbeiro-card';
            card.innerHTML = `
                <img src="${barbeiro.imagem}" alt="${barbeiro.nome}" class="barbeiro-img">
                <div class="barbeiro-info">
                    <h4>${barbeiro.nome}</h4>
                    <p><strong>Especialidade:</strong> ${barbeiro.especialidade}</p>
                    <p><strong>Experiência:</strong> ${barbeiro.experiencia}</p>
                    <button class="btn-secondary" data-tab="agendar">
                        <i class="fas fa-calendar-plus"></i> Agendar
                    </button>
                </div>
            `;
            barbeirosHome.appendChild(card);
        });
        
        // Adiciona evento aos botões
        document.querySelectorAll('[data-tab="agendar"]').forEach(btn => {
            btn.addEventListener('click', function() {
                navTabs.forEach(t => t.classList.remove('active'));
                document.querySelector('[data-tab="agendar"]').classList.add('active');
                
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById('agendar').classList.add('active');
            });
        });
    }
    
    function preencherServicosHome() {
        servicosHome.innerHTML = '';
        servicos.forEach(servico => {
            const card = document.createElement('div');
            card.className = 'servico-card';
            card.innerHTML = `
                <img src="${servico.imagem}" alt="${servico.nome}" class="servico-img">
                <div class="servico-info">
                    <h4>${servico.nome}</h4>
                    <p><strong>Duração:</strong> ${servico.duracao} minutos</p>
                    <p><strong>Preço:</strong> R$ ${servico.preco}</p>
                    <button class="btn-secondary" data-tab="agendar">
                        <i class="fas fa-calendar-plus"></i> Agendar
                    </button>
                </div>
            `;
            servicosHome.appendChild(card);
        });
    }
    
    // Configurar data mínima (hoje)
    function configurarData() {
        const hoje = new Date();
        const dd = String(hoje.getDate()).padStart(2, '0');
        const mm = String(hoje.getMonth() + 1).padStart(2, '0');
        const yyyy = hoje.getFullYear();
        
        inputData.min = `${yyyy}-${mm}-${dd}`;
        inputData.value = inputData.min;
    }
    
    // Carregar horários disponíveis (com verificação de agendamentos existentes)
    async function preencherSelectHorarios() {
        const dataSelecionada = inputData.value;
        const barbeiroId = selectBarbeiro.value;
        const servicoId = selectServico.value;
        
        // Limpar horários existentes
        selectHora.innerHTML = '<option value="">Selecione um horário</option>';
        
        if (!dataSelecionada || !barbeiroId || !servicoId) {
            return;
        }
        
        try {
            // Obter agendamentos existentes para o barbeiro na data selecionada
            const response = await fetch(`${API_URL}/agendamentos?barbeiroId=${barbeiroId}&data=${dataSelecionada}`);
            const agendamentos = await response.json();
            
            // Obter serviço selecionado para saber a duração
            const servico = servicos.find(s => s.id === parseInt(servicoId));
            if (!servico) return;
            
            // Converter horários agendados para minutos para facilitar comparação
            const horariosOcupados = agendamentos.map(ag => {
                const [h, m] = ag.hora.split(':').map(Number);
                return {
                    inicio: h * 60 + m,
                    fim: h * 60 + m + 30 // Assumindo que todos os serviços têm 30min (simplificação)
                };
            });
            
            // Filtrar horários disponíveis
            const horariosDisponiveisFiltrados = horariosDisponiveis.filter(horario => {
                const [h, m] = horario.split(':').map(Number);
                const inicio = h * 60 + m;
                const fim = inicio + servico.duracao;
                
                // Verificar se o horário está disponível
                return !horariosOcupados.some(ocupado => 
                    (inicio >= ocupado.inicio && inicio < ocupado.fim) ||
                    (fim > ocupado.inicio && fim <= ocupado.fim) ||
                    (inicio <= ocupado.inicio && fim >= ocupado.fim)
                );
            });
            
            // Preencher select com horários disponíveis
            horariosDisponiveisFiltrados.forEach(horario => {
                const option = document.createElement('option');
                option.value = horario;
                option.textContent = horario;
                selectHora.appendChild(option);
            });
            
            if (horariosDisponiveisFiltrados.length === 0) {
                mostrarMensagem('Não há horários disponíveis para esta data. Por favor, escolha outra data.', 'erro');
            }
        } catch (error) {
            console.error('Erro ao verificar horários:', error);
            mostrarMensagem('Erro ao verificar horários disponíveis.', 'erro');
        }
    }
    
    // Carregar agendamentos do JSON Server
    async function carregarAgendamentos(telefone = '') {
        try {
            let url = `${API_URL}/agendamentos`;
            if (telefone) {
                url += `?telefone=${telefone}`;
            }
            
            const response = await fetch(url);
            const agendamentos = await response.json();
            
            listaAgendamentos.innerHTML = '';
            
            if (agendamentos.length === 0) {
                listaAgendamentos.innerHTML = '<p>Nenhum agendamento encontrado.</p>';
                return;
            }
            
            // Ordenar por data e hora
            agendamentos.sort((a, b) => {
                const dataA = new Date(`${a.data}T${a.hora}`);
                const dataB = new Date(`${b.data}T${b.hora}`);
                return dataA - dataB;
            });
            
            agendamentos.forEach(agendamento => {
                const barbeiro = barbeiros.find(b => b.id === agendamento.barbeiroId);
                const servico = servicos.find(s => s.id === agendamento.servicoId);
                
                const card = document.createElement('div');
                card.className = 'agendamento-card';
                card.innerHTML = `
                    <div class="agendamento-header">
                        <span class="agendamento-servico">${servico.nome}</span>
                        <span class="agendamento-status">Agendado</span>
                    </div>
                    <div class="agendamento-body">
                        <p><i class="fas fa-user-tie"></i> Barbeiro: ${barbeiro.nome}</p>
                        <p><i class="fas fa-calendar-day"></i> Data: ${formatarData(agendamento.data)}</p>
                        <p><i class="fas fa-clock"></i> Hora: ${agendamento.hora}</p>
                        <p><i class="fas fa-user"></i> Cliente: ${agendamento.nomeCliente}</p>
                        <p><i class="fas fa-phone"></i> Telefone: ${agendamento.telefone}</p>
                        <p><i class="fas fa-money-bill-wave"></i> Valor: R$ ${servico.preco}</p>
                    </div>
                    <div class="agendamento-footer">
                        <button class="btn-cancelar" onclick="cancelarAgendamento(${agendamento.id})">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    </div>
                `;
                
                listaAgendamentos.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
            mostrarMensagem('Erro ao carregar agendamentos.', 'erro');
        }
    }
    
    // Função para formatar data (dd/mm/aaaa)
    function formatarData(data) {
        const [yyyy, mm, dd] = data.split('-');
        return `${dd}/${mm}/${yyyy}`;
    }
    
    // Carregar dados do dashboard
    async function carregarDashboard() {
        try {
            // Obter todos os agendamentos
            const response = await fetch(`${API_URL}/agendamentos`);
            const agendamentos = await response.json();
            
            // Agendamentos hoje
            const hoje = new Date().toISOString().split('T')[0];
            const agendamentosHojeCount = agendamentos.filter(a => a.data === hoje).length;
            agendamentosHoje.textContent = agendamentosHojeCount;
            
            // Agendamentos esta semana
            const hojeObj = new Date();
            const inicioSemana = new Date(hojeObj.setDate(hojeObj.getDate() - hojeObj.getDay()));
            const fimSemana = new Date(inicioSemana);
            fimSemana.setDate(fimSemana.getDate() + 6);
            
            const agendamentosSemanaCount = agendamentos.filter(a => {
                const dataAgendamento = new Date(a.data);
                return dataAgendamento >= inicioSemana && dataAgendamento <= fimSemana;
            }).length;
            
            agendamentosSemana.textContent = agendamentosSemanaCount;
            
            // Barbeiro mais ocupado
            const barbeirosCount = {};
            agendamentos.forEach(a => {
                barbeirosCount[a.barbeiroId] = (barbeirosCount[a.barbeiroId] || 0) + 1;
            });
            
            const barbeiroMaisOcupadoId = Object.keys(barbeirosCount).reduce((a, b) => 
                barbeirosCount[a] > barbeirosCount[b] ? a : b
            );
            
            const barbeiro = barbeiros.find(b => b.id === parseInt(barbeiroMaisOcupadoId));
            barbeiroOcupado.textContent = barbeiro ? barbeiro.nome : '-';
            
            // Serviço mais popular
            const servicosCount = {};
            agendamentos.forEach(a => {
                servicosCount[a.servicoId] = (servicosCount[a.servicoId] || 0) + 1;
            });
            
            const servicoMaisPopularId = Object.keys(servicosCount).reduce((a, b) => 
                servicosCount[a] > servicosCount[b] ? a : b
            );
            
            const servico = servicos.find(s => s.id === parseInt(servicoMaisPopularId));
            servicoPopular.textContent = servico ? servico.nome : '-';
            
            // Gráfico de agendamentos por dia
            criarGraficoAgendamentos(agendamentos);
            
        } catch (error) {
            console.error('Erro ao carregar dashboard:', error);
        }
    }
    
    // Criar gráfico de agendamentos
    function criarGraficoAgendamentos(agendamentos) {
        const ctx = document.getElementById('graficoAgendamentos').getContext('2d');
        
        // Agrupar agendamentos por data
        const agendamentosPorData = {};
        agendamentos.forEach(a => {
            agendamentosPorData[a.data] = (agendamentosPorData[a.data] || 0) + 1;
        });
        
        // Ordenar por data
        const datasOrdenadas = Object.keys(agendamentosPorData).sort();
        const contagensOrdenadas = datasOrdenadas.map(d => agendamentosPorData[d]);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: datasOrdenadas.map(d => formatarData(d)),
                datasets: [{
                    label: 'Agendamentos por dia',
                    data: contagensOrdenadas,
                    backgroundColor: 'rgba(212, 175, 55, 0.7)',
                    borderColor: 'rgba(212, 175, 55, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    // Função para cancelar agendamento
    window.cancelarAgendamento = async function(id) {
        if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
            try {
                const response = await fetch(`${API_URL}/agendamentos/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    mostrarMensagem('Agendamento cancelado com sucesso!', 'sucesso');
                    carregarAgendamentos(filtroTelefone.value);
                } else {
                    throw new Error('Falha ao cancelar agendamento');
                }
            } catch (error) {
                console.error('Erro ao cancelar agendamento:', error);
                mostrarMensagem('Erro ao cancelar agendamento.', 'erro');
            }
        }
    };
    
    // Mostrar mensagens
    function mostrarMensagem(mensagem, tipo) {
        mensagemDiv.textContent = mensagem;
        mensagemDiv.className = tipo;
        mensagemDiv.style.display = 'block';
        
        setTimeout(() => {
            mensagemDiv.style.display = 'none';
        }, 5000);
    }
    
    // Evento de submit do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nomeCliente = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const barbeiroId = parseInt(selectBarbeiro.value);
        const servicoId = parseInt(selectServico.value);
        const data = inputData.value;
        const hora = selectHora.value;
        
        // Validação básica
        if (!nomeCliente || !telefone || !barbeiroId || !servicoId || !data || !hora) {
            mostrarMensagem('Por favor, preencha todos os campos.', 'erro');
            return;
        }
        
        try {
            // Verificar se o horário ainda está disponível
            const responseVerificacao = await fetch(`${API_URL}/agendamentos?barbeiroId=${barbeiroId}&data=${data}&hora=${hora}`);
            const agendamentosConflitantes = await responseVerificacao.json();
            
            if (agendamentosConflitantes.length > 0) {
                mostrarMensagem('Este horário já foi reservado. Por favor, escolha outro.', 'erro');
                preencherSelectHorarios(); // Atualizar horários disponíveis
                return;
            }
            
            // Criar agendamento
            const servico = servicos.find(s => s.id === servicoId);
            
            const response = await fetch(`${API_URL}/agendamentos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nomeCliente,
                    telefone,
                    barbeiroId,
                    servicoId,
                    data,
                    hora,
                    criadoEm: new Date().toISOString(),
                    preco: servico.preco
                })
            });
            
            if (response.ok) {
                mostrarMensagem('Agendamento realizado com sucesso!', 'sucesso');
                form.reset();
                configurarData();
                
                // Atualizar lista de agendamentos se estiver na tab correta
                if (document.querySelector('.nav-tabs li.active').getAttribute('data-tab') === 'meus-agendamentos') {
                    carregarAgendamentos(telefone);
                }
            } else {
                throw new Error('Falha ao agendar');
            }
        } catch (error) {
            console.error('Erro ao agendar:', error);
            mostrarMensagem('Erro ao realizar agendamento. Tente novamente.', 'erro');
        }
    });
    
    // Buscar agendamentos por telefone
    buscarAgendamentos.addEventListener('click', function() {
        carregarAgendamentos(filtroTelefone.value);
    });
    
    // Atualizar horários quando dados mudarem
    inputData.addEventListener('change', preencherSelectHorarios);
    selectBarbeiro.addEventListener('change', preencherSelectHorarios);
    selectServico.addEventListener('change', preencherSelectHorarios);
    
    // Inicialização
    preencherSelectBarbeiros();
    preencherSelectServicos();
    preencherBarbeirosHome();
    preencherServicosHome();
    configurarData();
    
    // Verificar se há parâmetro na URL para abrir uma tab específica
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && document.querySelector(`[data-tab="${tabParam}"]`)) {
        document.querySelector(`[data-tab="${tabParam}"]`).click();
    }
});