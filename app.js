/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//Definiuje Zmienne
var scores, roundScore, activePlayer, gamePlaying;

init();//Funkcja zaczynajaca grę

var lastDice;
//Wybiera div btn-roll (czyli przycisk rolujacy) i dodaje do niego event click oraz wykonuje funkcje która może być użyta tylko i wylacznie w środku tego pola.
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // 1.Losuje randomowy numer z przedziału od 1 do 6
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Wyświetla wynik
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block'; // utworzylem zmienna żeby nie powtarzac czynności
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-1').src = 'dice-' + dice2 + '.png'; // Wybiera ten numer obrazka który został wyloswany
    /*
    //Po wylosowaniu 2 razy 6 przegrywasz gre
    if(dice === 6 && lastDice === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer;
    }
    */
    //Aktualizuje bierzacy wynik jeżeli rolowany numer nie wyniósł 1.
    if(dice1 !== 1 && dice2 !== 1){ //Nie dodawaj numeru 1
        //Dodaj wylosowany numer do wyniku
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else{
        nextPlayer();
    }
    lastDice = dice1 + dice2;
    }
});


//Wybieram klase przycisku hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        scores[activePlayer] += roundScore; //Dodaje aktualnie wylosowany numer do wyniku

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];//Aktualizuje UI
    //ustawiamy opcje final score do ilu gramy
    var input = document.querySelector('.final-score').value;
    var winningScore;
    
        if(input){
            winningScore = input;
        } else{
            winningScore = 100;
        }

    //Sprawdza czy player wygrał grę.
    if(scores[activePlayer] >= winningScore){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';//Po osiągnięciu 100 pkt wyswietla WINNER
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
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

        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';//Nie wyświetlaj klasy dice
}

document.querySelector('.btn-new').addEventListener('click', init);//Po kliknieciu przycisku resetujemy ustawienia do początkowych

//Funkcja zaczynajaca grę
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
//Wybiera klase dice(kostke do gry ktora jest pośrodku) i nie wyswietla go.
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

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