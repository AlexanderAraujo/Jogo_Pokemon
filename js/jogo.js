var altura = 0;
var largura = 0;
var pokebolasJogadas = 0;
var tempo = 60;
var criaPokemonTempo = 1500;
var pokebolasTotais = 0;
var numPokCapturar = 10;
var tabelaPCapturados = 0;
var imgVitoria = 'vitoria.png';
var imgGameOver = 'game_over.gif';
var cenario;
var pokemonsCapturados = [];
var resultJogo = '';
var botaoProxFase = 'Próxima Fase';
var botaoReiniciar = 'Jogar Novamente';
var personagemEscolhido = '';
var nomePersonagem = '';
var audioVitoria = new Audio();
var audioGameOver = new Audio();
var nivel = window.location.search;
var personagemEscolhido = window.location.search;

audioVitoria.src = "audios/win_sound.mp3";
audioGameOver.src = "audios/game_over_sound.mp3";

nivel = nivel.replace('?', '');
nivel = nivel.split('?', 1);
nivel = nivel[0];

personagemEscolhido = personagemEscolhido.replace('?', '');
personagemEscolhido = personagemEscolhido.split('?');
personagemEscolhido = personagemEscolhido[1];

document.getElementById('avatarPersonagem').innerHTML = '<img src="imagens/' + personagemEscolhido + '.png"/>';

function proximaFase() {	
	if (resultJogo === 'venceu') {
		window.location.href = "app.html?" + nivelProxFase + '?' + personagemEscolhido;
	} else if (resultJogo === 'perdeu') {
		window.location.reload();
	}
}

function sairDoJogo() {
	window.location.href = "index.html";
}	

switch(nivel) {
	case 'fase1':
		criaPokemonTempo = 1500;
		pokebolasTotais = 18;
		document.body.style.backgroundImage = "url(imagens/cenarios/1floresta.jpg)";
		cenario = 'floresta/';
		nivelProxFase = 'fase2';
		break;
	case 'fase2':
		criaPokemonTempo = 1400;
		pokebolasTotais = 17;
		document.body.style.backgroundImage = "url(imagens/cenarios/2oceano.jpg)";
		cenario = 'oceano/';
		nivelProxFase = 'fase3';
		break;
	case 'fase3':
		criaPokemonTempo = 1350;
		pokebolasTotais = 16;
		document.body.style.backgroundImage = "url(imagens/cenarios/3caverna.jpg)";
		cenario = 'caverna/';
		nivelProxFase = 'fase4';
		break;
	case 'fase4':
		criaPokemonTempo = 1300;
		pokebolasTotais = 15;
		document.body.style.backgroundImage = "url(imagens/cenarios/4campo.jpg)";
		cenario = 'campo/';
		nivelProxFase = 'fase5';
		break;
	case 'fase5':
		criaPokemonTempo = 1200;
		pokebolasTotais = 14;
		document.body.style.backgroundImage = "url(imagens/cenarios/5planices.jpg)";
		cenario = 'planice/';
		nivelProxFase = 'fase6';
		break;
	case 'fase6':
		criaPokemonTempo = 1150;
		pokebolasTotais = 13;
		document.body.style.backgroundImage = "url(imagens/cenarios/6montanha.jpg)";
		cenario = 'montanha/';
		nivelProxFase = 'fase7';
		break;
	case 'fase7':
		criaPokemonTempo = 1100;
		pokebolasTotais = 13;
		document.body.style.backgroundImage = "url(imagens/cenarios/7ilha.jpg)";
		cenario = 'ilha/';
		break;		
}

var criaPokemon = setInterval(function() {
	posicaoRandomica();
}, criaPokemonTempo);	

function ajustaTamanhoPalcoJogo() {		
	altura = window.innerHeight;
	largura = window.innerWidth;		
}	

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {
	tempo -= 1;

	if (tabelaPCapturados < numPokCapturar && tempo < 0) {
		fimDeJogo(imgGameOver, audioGameOver, botaoReiniciar);
		resultJogo = 'perdeu';	
	} else {
		document.getElementById('cronometro').innerHTML = tempo;	
	}
}, 1000);

function fimDeJogo(imagem, audio, botao) {	
	document.onclick = false;
	clearInterval(cronometro);
	clearInterval(criaPokemon);
	document.getElementById('campoVitoriaGameOver').innerHTML = '<img src="imagens/' + imagem + '"/>';						
	audio.play();    
	document.getElementById('pokemon').onclick = false;	
	
	if (nivel != 'fase7') {
		document.getElementById('botaoContinuar').innerHTML =  
		'<button type="button" class="btn btn-info btn-lg botaoContinue borda" onclick="proximaFase()">' + botao + '</button>' +
		'<button type="button" class="btn btn-danger btn-lg botaoContinue borda" onclick="sairDoJogo()">Sair do Jogo</button>';  
	} else {
		document.getElementById('botaoContinuar').innerHTML = 
		'<button type="button" class="btn btn-danger btn-lg botaoContinue borda" onclick="sairDoJogo()">Sair do Jogo</button>';
	}
}

function errouPokebola() {
	var audioErrouPokebola = new Audio();
	audioErrouPokebola.src = "audios/som_wrong_answer.mp3";			
	audioErrouPokebola.play();
}

function posicaoRandomica() {	
	document.onclick = function(e) {
		pokebolasJogadas++;
		document.getElementById('v' + pokebolasJogadas).src = "imagens/pokeball_vazia.png";							

		if (e.target.id != 'pokemon') {	
			errouPokebola();
		}			
		
		if (tabelaPCapturados === numPokCapturar) {				
			fimDeJogo(imgVitoria, audioVitoria, botaoProxFase);
			pokemon.remove();
			resultJogo = 'venceu';			
		} else if (pokebolasJogadas === pokebolasTotais && tabelaPCapturados < numPokCapturar) {			    
			fimDeJogo(imgGameOver, audioGameOver, botaoReiniciar);
			pokemon.remove();
			resultJogo = 'perdeu';			    
		}
	}
	
	//remover o pokemon anterior (caso exista)
	if (document.getElementById('pokemon')) {				
		document.getElementById('pokemon').remove();									
	}

	var posicaoX = Math.floor(Math.random() * largura) - 300;
	var posicaoY = Math.floor(Math.random() * altura) - 300;
	
	posicaoX = posicaoX < 0 ? 0 : posicaoX;
	posicaoY = posicaoY < 0 ? 0 : posicaoY;

	var variacaoPokemon = Math.ceil((Math.random() * 22));
	
	while (pokemonsCapturados.indexOf(variacaoPokemon) != -1 ) {
		variacaoPokemon = Math.ceil((Math.random() * 22));
		console.log(variacaoPokemon);
		
		if (tabelaPCapturados === numPokCapturar) {				
			fimDeJogo(imgVitoria, audioVitoria);
		} 
	}	

	//criar elemento HTML
	var pokemon = document.createElement('img');
	
	pokemon.src = 'imagens/pokemons/tipos/' + cenario + variacaoPokemon + '.gif';
	pokemon.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
	pokemon.style.left = posicaoX + 'px';
	pokemon.style.top = posicaoY + 'px';
	pokemon.style.position = 'absolute';
	pokemon.id = 'pokemon';

	//remove o pokemon ao clicar sobre
	pokemon.onclick = function() {
		pokemon.src = 'imagens/luz_vermelha.gif';
		pokemon.className += ' capturando';	
		
		if (pokemonsCapturados.indexOf(variacaoPokemon) != -1 ) {
			variacaoPokemon = Math.ceil((Math.random() * 22));			
		} else {
			pokemonsCapturados.push(variacaoPokemon);			

			document.getElementById('tabelaPokemons').innerHTML += '<img id="p1' 
				+ '"src="imagens/pokemons/tipos/' + cenario + pokemonsCapturados[pokemonsCapturados.length - 1] + '.png" />';
		}
		
		tabelaPCapturados++;

		document.getElementById('contPokemons').innerHTML = tabelaPCapturados;
			
		var audioCapturaPokemon = new Audio();
		
		audioCapturaPokemon.src = "audios/som_found_item.mp3";
		audioCapturaPokemon.play(); 		
	}

	document.body.appendChild(pokemon);			
}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3);

	switch(classe) {
		case 0:
			return 'pokemon1';
		case 1:
			return 'pokemon2';
		case 2:
			return 'pokemon3';
	}
}

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2);

	switch(classe) {
		case 0:
			return 'ladoA';
		case 1:
			return 'ladoB';
	}
}

document.getElementById('cronometro').innerHTML = tempo;

for (var z = 1; z <= pokebolasTotais; z++) {
	document.getElementById('totalPokebolas').innerHTML += '<img id="v' + z + '"src="imagens/pokeball_mini.png" />';
}

document.getElementById('numObjetivoCaptura').innerHTML = numPokCapturar;