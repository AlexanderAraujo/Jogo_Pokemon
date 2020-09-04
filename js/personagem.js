var personagemEscolhido = '';

function selecionaPersonagem(personagem) {
	personagemEscolhido = personagem.id;

	if (personagem.id === 'n1') {
		personagem.className = 'mudaEfeitoPersonagem';
		document.getElementById('n2').className = 'personagem';
	
	} else {
		personagem.className = 'mudaEfeitoPersonagem'
		document.getElementById('n1').className = 'personagem';
	}
}			

function iniciarJogo() {
	if (personagemEscolhido === '') {
		alert('Selecione um personagem para iniciar o jogo');
		return false;
	}
	window.location.href = "app.html?" + 'fase1?' + personagemEscolhido;
}