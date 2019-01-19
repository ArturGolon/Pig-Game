/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
/*
ZASADY GRY:
- Gra ma 2 graczy, grających w rundach
- W każdej turze gracz rzuca kośćmi tyle razy, ile chce. Każdy wynik zostanie dodany do jego wyniku
- ALE, jeśli gracz wyrzuci 1, cały jego wynik zeruję się. Potem kolej na kolejnego gracza
- Gracz może wybrać opcję "Hold", co oznacza, że jego wynik zostanie dodany do jego wyniku. Potem kolej na kolejnego gracza
- Pierwszy gracz, który osiągnie 100 punktów w wyniku, wygrywa grę
*/

//Definiuje Zmienne
var scores, roundScore, activePlayer, gamePlaying;

init();//Funkcja zaczynajaca grę

//Wybiera div btn-roll (czyli przycisk rolujacy) i dodaje do niego event click oraz wykonuje funkcje która może być użyta tylko i wylacznie w środku tego pola.
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // 1.Losuje randomowy numer z przedziału od 1 do 6
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Wyświetla wynik
    var diceDOM = document.querySelector('.dice'); // utworzylem zmienna żeby nie powtarzac czynności
    diceDOM.style.display = 'block'; // wyświetla div dice(kostke do gry)
    diceDOM.src = 'dice-' + dice + '.png'; // Wybiera ten numer obrazka który został wyloswany

    //Aktualizuje bierzacy wynik jeżeli rolowany numer nie wyniósł 1.
    if(dice !== 1){ //Nie dodawaj numeru 1
        //Dodaj wylosowany numer do wyniku
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else{
        nextPlayer();
    }
    }
});


//Wybieram klase przycisku hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        scores[activePlayer] += roundScore; //Dodaje aktualnie wylosowany numer do wyniku

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];//Aktualizuje UI
    
    //Sprawdza czy player wygrał grę.
    if(scores[activePlayer] >= 100){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';//Po osiągnięciu 100 pkt wyswietla WINNER
        document.querySelector('.dice').style.display = 'none';//Nie wyświetla klasy dice
        document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');//Dodaje klase winner
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');//Usówa klase active 
        gamePlaying = false;
    } else{
        nextPlayer();
    }
    }
    
})

//Dodałem ten element w funkcji by się nie powtarzać. 
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //Jezeli activePlayer to 0 to activePlayer to 1 ,w innym przypadku activePlayer 0.
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';//Resetuj wynik jesli wypadnie 0
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');//Usuwa klase 'active'
        document.querySelector('.player-1-panel').classList.toggle('active');//Dodaje klass 'active'

        document.querySelector('.dice').style.display = 'none';//Nie wyświetlaj klasy dice
}

document.querySelector('.btn-new').addEventListener('click', init);//Po kliknieciu przycisku resetujemy ustawienia do początkowych

//Funkcja zaczynajaca grę
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
//Wybiera klase dice(kostke do gry ktora jest pośrodku) i nie wyswietla go.
    document.querySelector('.dice').style.display = 'none';

// Zmienia wszystkie liczby w klasach score i current na 0.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
//Ustawia nazwy spowrotem na Player
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
//Usuwa klase winner i active
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
//Dodaje aktywnego gracza nr 1 
    document.querySelector('.player-0-panel').classList.add('active');
}