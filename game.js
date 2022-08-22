// X = Jogador
// O = Máquina
// N = Nenhum
// D = Empate (Draw)
let slotsCfg = { // configura as variaveis como se fossem os slots
    slot1: 'N', slot2: 'N', slot3: 'N',
    slot4: 'N', slot5: 'N', slot6: 'N',
    slot7: 'N', slot8: 'N', slot9: 'N',
}
let vitorias = { // configura as vitórias das letras
    X: 0,
    O: 0,
}
let rodada = 0; // o número de rodadas jogadas
let ganhador = 'N'; // inicializa a variável ganhador como N (Ninguém)
let slots = document.getElementsByClassName('slot'); // seleciona todos os elementos com a classe slot
let podeJogar = true; // variavel que define se o jogador pode clicar na tela

for (let i = 0; i < slots.length; i++) {
    slots[i].onclick = (() => { // atribui a função "jogar" em todos os elementos com a classe slot
        jogar(slots[i].id);
    })
}

function jogar(id) {
    if (ganhador === 'N' && podeJogar) { // checa se ainda não possuí um ganhador, caso não tiver checa se o slot clicado está vazio, e se estiver ele atribui X a caixa adiciona +1 ao número de rodadas e checa se este movimento ocasiona uma vitória e pede pra máquina jogar
        if (slotsCfg[id] === 'N') {
            slotsCfg[id] = 'X';
            document.getElementById(id).innerHTML = 'X';
            rodada++;
            verificarGanhador('X');
            podeJogar = false;
            setTimeout(() => {
                maquinaJogar();
            }, 50);
        }
    }
}

function maquinaJogar() {
    if (ganhador === 'N') { // se não possui um ganhador, roda um loop para encontrar o primeiro slot vazio para jogar, quando jogar, atribui O a caixa adiciona +1 ao número de rodadas e checa se este movimento ocasiona uma vitória
        let decidido = false;
        while (!decidido) {
            let jogada = Math.ceil(Math.random() * 9);
            let id = 'slot' + jogada;
            if (slotsCfg[id] === 'N') {
                slotsCfg[id] = 'O';
                document.getElementById(id).innerHTML = 'O';
                rodada++;
                decidido = true;
                podeJogar = true;
                verificarGanhador('O');
            }
        }
    }
}

function verificarGanhador(jogador) { // verifica se há 3 casas consecutivas com a mesma letra, caso tenha, esta letra ganha a partida, caso a rodada seja 9 e não possuí um ganhador o jogo impõe um empate
    if ([slotsCfg.slot1, slotsCfg.slot2, slotsCfg.slot3].every(slots => slots === jogador) || [slotsCfg.slot4, slotsCfg.slot5, slotsCfg.slot6].every(slots => slots === jogador) || [slotsCfg.slot7, slotsCfg.slot8, slotsCfg.slot9].every(slots => slots === jogador) || [slotsCfg.slot1, slotsCfg.slot4, slotsCfg.slot7].every(slots => slots === jogador) || [slotsCfg.slot2, slotsCfg.slot5, slotsCfg.slot8].every(slots => slots === jogador) || [slotsCfg.slot3, slotsCfg.slot6, slotsCfg.slot9].every(slots => slots === jogador) || [slotsCfg.slot3, slotsCfg.slot5, slotsCfg.slot7].every(slots => slots === jogador) || [slotsCfg.slot1, slotsCfg.slot5, slotsCfg.slot9].every(slots => slots === jogador)) {
        ganhador = jogador;
        vitorias[jogador]++;
        document.getElementById(jogador).innerHTML = vitorias[jogador];
        if (ganhador === 'X') {
            document.getElementById('ganhadorprompt').innerHTML = '<span style="color:green;">Parabéns! Você venceu!</span>';
        } else if (ganhador === 'O') {
            document.getElementById('ganhadorprompt').innerHTML = '<span style="color:red;">Você perdeu... Mais sorte da próxima vez.</span>';
        }
    }

    if (rodada == 9 && ganhador === 'N') {
        console.log('Empate');
        ganhador = 'D';
        document.getElementById('ganhadorprompt').innerHTML = '<span style="color:black;">A partida empatou :/</span>';
    }
}

function restaurarJogo() { // função para restaurar as variáveis do jogo para poder jogar novamente
    slotsCfg = {
        slot1: 'N', slot2: 'N', slot3: 'N',
        slot4: 'N', slot5: 'N', slot6: 'N',
        slot7: 'N', slot8: 'N', slot9: 'N',
    }
    rodada = 0;
    ganhador = 'N';
    podeJogar = true;
    for (let i = 0; i < slots.length; i++) {
        slots[i].innerHTML = '';
    }
    document.getElementById('ganhadorprompt').innerHTML = 'Clique em um quadrado para jogar';
}

function abrirModal() { // função para abrir o modal e perguntar se tem certeza
    document.getElementById('modalresetar').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalresetar').style.display = 'none';
}

function zerarPlacar() { // função para resetar as vitórias
    vitorias = {
        X: 0,
        O: 0,
    }
    document.getElementById('X').innerHTML = 0; // zera na UI
    document.getElementById('O').innerHTML = 0; // zera na UI
    fecharModal();
}

document.getElementById('modalresetar').onclick = (e => { // se o usuário clicar fora do modal ele fecha
    if (e.target.id == 'modalresetar') { // checa se o id de onde foi clicado é exatamente igual a modalrestar (id mãe do modal)
        fecharModal();
    }
})
