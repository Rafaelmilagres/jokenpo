$('.invencivel').click(function(){
	modo_invencivel = true;
});

$('.aleatorio').click(function(){
	modo_invencivel = false;
});

$('button').click(function(){
	$('.fundo').css('display', 'none');
	$('.menu').css('display', 'none');
	$('.container').removeClass('oculto');
	$('.ajuda').removeClass('oculto');
	$('.reinicia').removeClass('oculto');
});

var classe = '<i class="fa fa-hand-{classe}-o botao"></i>';
var classes = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
modo_invencivel = true;
p1_life = 100;
p2_life = 100;

$('.op').click(function(){
	$('.op').removeClass("selecionado");
	$(this).addClass("selecionado");
	$('.opcoes').removeClass('aparece');
	$('.opcoes').addClass('esconde');

	var escolhido = $(this).attr("data-op");
	venceu = 1;

	if(modo_invencivel == true)
		invencivel(escolhido);
	else
		aleatorio();

	

	switch(escolhido){
		case "1":
			$('.mao1').html(classe.replace("{classe}", 'rock'));
			if($('.mao2').attr('data-op') == "5" || $('.mao2').attr('data-op') == "3")
				venceu = 1;
			else if($('.mao2').attr('data-op') == "1")
				venceu = 0;
			else
				venceu = -1;
			break;

		case "2":
			$('.mao1').html(classe.replace("{classe}", 'paper'));
			if($('.mao2').attr('data-op') == "1" || $('.mao2').attr('data-op') == "4")
				venceu = 1;
			else if($('.mao2').attr('data-op') == "2")
				venceu = 0;
			else
				venceu = -1;
			break;

		case "3":
			$('.mao1').html(classe.replace("{classe}", 'scissors'));
			if($('.mao2').attr('data-op') == "2" || $('.mao2').attr('data-op') == "5")
				venceu = 1;
			else if($('.mao2').attr('data-op') == "3")
				venceu = 0;
			else
				venceu = -1;
			break;

		case "4":
			$('.mao1').html(classe.replace("{classe}", 'spock'));
			if($('.mao2').attr('data-op') == "3" || $('.mao2').attr('data-op') == "1")
				venceu = 1;
			else if($('.mao2').attr('data-op') == "4")
				venceu = 0;
			else
				venceu = -1;
			break;

		case "5":
			$('.mao1').html(classe.replace("{classe}", 'lizard'));
			if($('.mao2').attr('data-op') == "2" || $('.mao2').attr('data-op') == "4")
				venceu = 1;
			else if($('.mao2').attr('data-op') == "5")
				venceu = 0;
			else
				venceu = -1;
			break;
	}

	if(venceu == 1){
		$('.mao2').addClass('perdeu');

		setTimeout(function(){
			/* faz a movimentação do vegeta e do goku */
			$('.vegeta').removeClass('movimento_basico');
			$('.vegeta').addClass('ataque');
			$('.at_vegeta').addClass('ataque_vegeta');
			$('.goku').removeClass('movimento_basico');
			$('.goku').addClass('receber_golpe');
		}, 1000);

		setTimeout(function(){
			$('.barra_p2 .life').css('width', p2_life-33 + "%");
			p2_life -= 33;
		}, 2500);

	}else{ 
		if(venceu == -1){
			$('.mao1').addClass('perdeu');

			setTimeout(function(){
				/* faz a movimentação do vegeta e do goku */
				$('.goku').removeClass('movimento_basico');
				$('.goku').addClass('ataque');
				$('.at_goku').addClass('ataque_goku');
				$('.vegeta').removeClass('movimento_basico');
				$('.vegeta').addClass('receber_golpe');
			}, 1000);

			setTimeout(function(){
				$('.barra_p1 .life').css('width', p1_life-33 + "%");
				p1_life -= 33;
			}, 2500);
		}else{
			setTimeout(function(){
				$('.mao1').addClass('perdeu');
				$('.mao2').addClass('perdeu');
			}, 3000);
			
		}
	}

	setTimeout(function(){
		animar();
	}, 250);
	

});

function animar(){
	$('.mao1').animate({
		left: "35%"
	}, 500, function(){
		$('.mao1').animate({
			left: "32%"
		}, 250, function(){
			$('.mao1').animate({
				left: "35%"
			}, 250);
			if(venceu == 1){
				$('.resultado').html("Player 1 Venceu");
				if(!$('.placar_p1 .1').hasClass('venceu')){
					$('.placar_p1 .1').addClass('venceu');
					return;
				}
				if(!$('.placar_p1 .2').hasClass('venceu')){
					$('.placar_p1 .2').addClass('venceu');
					return;
				}
				if(!$('.placar_p1 .3').hasClass('venceu')){
					$('.placar_p1 .3').addClass('venceu');
					return;
				}
			}else if(venceu == 0)
				$('.resultado').html("Empate");
		});
	});

	$('.mao2').animate({
		right: "45%"
	}, 500, function(){
		$('.mao2').animate({
			right: "40%"
		}, 250, function(){
			$('.mao2').animate({
				right: "45%",
				transform: "scale(3)"
			}, 250);

			if(venceu == -1){
				$('.resultado').html("Computador Venceu");
				if(!$('.placar_p2 .1').hasClass('venceu')){
					$('.placar_p2 .1').addClass('venceu');
					return;
				}
				if(!$('.placar_p2 .2').hasClass('venceu')){
					$('.placar_p2 .2').addClass('venceu');
					return;
				}
				if(!$('.placar_p2 .3').hasClass('venceu')){
					$('.placar_p2 .3').addClass('venceu');
					return;
				}
			}
		});
	});
	setTimeout(function(){
		$('.perdeu').css('opacity', '0.3');
	}, 500);

	setTimeout(function(){
		reseta();
		if(p1_life < 33){
			/* tela de resultado */
			$('.resultado_final .resultado_rsp').html("Computador Venceu!");
			$('.resultado_final').removeClass('oculto');
			$('.opcoes').addClass('esconde');
			$('.opcoes').removeClass('aparece');
			$('.maos_animadas').addClass('esconde');
		}
		if(p2_life < 33){
			/* tela de resultado */
			$('.resultado_final .resultado_rsp').html("Player 1 Venceu!");
			$('.resultado_final').removeClass('oculto');
			$('.opcoes').addClass('esconde');
			$('.opcoes').removeClass('aparece');
			$('.maos_animadas').addClass('esconde');
		}

	}, 3000);
}


/* RESETA AS ANIMAÇÕES */
function reseta(){
	/* vegeta */
	if($('.vegeta').hasClass('ataque'))
		$('.vegeta').removeClass('ataque');
	if($('.vegeta').hasClass('receber_golpe'))
		$('.vegeta').removeClass('receber_golpe');
	$('.vegeta').addClass('movimento_basico');

	/* ataque do vegeta */
	if($('.at_vegeta').hasClass('ataque_vegeta'))
		$('.at_vegeta').removeClass('ataque_vegeta');

	/* goku */
	if($('.goku').hasClass('ataque'))
		$('.goku').removeClass('ataque');
	if($('.goku').hasClass('receber_golpe'))
		$('.goku').removeClass('receber_golpe');
	$('.goku').addClass('movimento_basico');

	/* ataque do goku */
	if($('.at_goku').hasClass('ataque_goku'))
		$('.at_goku').removeClass('ataque_goku');

	$('.mao1').css("left", "30px");
	$('.mao1').css("display", "block");
	$('.mao1').css("opacity", "1");
	$('.mao1').html("");

	$('.mao2').css("right", "30px");
	$('.mao2').css("display", "block");
	$('.mao2').css("opacity", "1");
	$('.mao2').html("");

	$('.resultado').html("");

	$('.selecionado').removeClass('selecionado');

	$('.opcoes').removeClass('esconde');
	$('.opcoes').addClass('aparece');

	$('.perdeu').removeClass('perdeu');
}


/* MODOS PARA JOGAR */

function invencivel(escolhido){
	/* modo invencivel */
	var op;
	if(escolhido == "5")
		op = 1;
	else 
		op = parseInt(escolhido) + 1;

	$('.mao2').attr('data-op', op);
	$('.mao2').html(classe.replace('{classe}', classes[op-1]));
}

function aleatorio(){

	var op = Math.ceil(Math.random()*5);
	$('.mao2').attr('data-op', op);
	$('.mao2').html(classe.replace('{classe}', classes[op-1]));	
}

/* FIM DOS MODOS */


/* loop para movimentar as nuvens */

function loopN1(){
	$('.nuvem1').animate({
		left: "-100px"
	}, 20000, function(){
		$('.nuvem1').css("left", "1000px");
		loopN1();
	});
}
function loopN2(){
	$('.nuvem2').animate({
		left: "-100px"
	}, 16000, function(){
		$('.nuvem2').css("left", "1000px");
		loopN2();
	});
}

loopN1();
loopN2();

/* fim loop para nuvens */