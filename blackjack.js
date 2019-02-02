var $ = function (id) {
    return document.getElementById(id); 
};

var deck = ["AC", "AD", "AH", "AS", "2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "TC", "TD", "TH", "TS", "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS"];
var i = 3;
var m = 1;
var playerTotal = 0;
var dealerTotal = 0;
var lose = 0;

function dealer() {
    var j = Math.floor(Math.random() * 10);
    var l = Math.floor(Math.random() * 10);
    dealerTotal = j + l;
    if(dealerTotal < 21) {
        var n = Math.floor(Math.random() * 10);
        dealerTotal = dealerTotal + n;
    }
    
    $("dealerTotal").innerHTML = "<p>Dealer total: " + dealerTotal + "</p>";
}

function calculateTotals() {
    var cardNum = "card" + m;
    var filename = $(cardNum).src
    var lastfive = filename.substr(filename.length - 6);
    var value = lastfive.charAt(0);

    if(value == 'J' || value == 'Q' || value == 'K' || value == 'T') {
        value = '10';
    }
    else if(value == 'A') {
        value = '1';
    }
    value = parseInt(value);
    playerTotal = playerTotal + value
    
    $("playerTotal").innerHTML = "<p>Player total: " + playerTotal + "</p>";
    
    if(playerTotal > 21) {
        lose = 1;
    }
    
    m++;
}

function shuffle(array) {
    var i = 0, j = 0, temp = null;
    for(i = 0; i < array.length; i++) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function cardDeal(card) {
    for(var i = 0; i < deck.length; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        var filename = "images/" + deck[j] + ".png";
        card.setAttribute("src", filename);
    }
}

var dealBlackjack = function() {
    shuffle(deck);
    var card1 = $("card1");
    var card2 = $("card2");
    cardDeal(card1);
    cardDeal(card2);
    calculateTotals();
    calculateTotals();
    dealer();
}

var hit = function() {
    var cardNum = "card" + i;
    var card = $(cardNum);
    cardDeal(card);
    i++;
    if(i > 5) {
        i = 3;
    }
    calculateTotals();
    if(lose == 1) {
        alert("You Lose!");
    }
}

var stand = function() {
    if(playerTotal < 21) {
        if(playerTotal < dealerTotal) {
            alert("You Won!");
        }
    }
}

window.onload = function () {
    $("dealBlackjack").onclick = dealBlackjack;
    $("hit").onclick = hit;
    $("stand").onclick = stand;
}