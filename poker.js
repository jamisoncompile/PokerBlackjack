var $ = function (id) {
    return document.getElementById(id); 
};

var deck = ["AC", "AD", "AH", "AS", "2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "TC", "TD", "TH", "TS", "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS"];
var hand = [];
var cardRanks = [];
var cardSuits = [];
var suitCount = {};
var valueCount = {};
var points = 0;
var threePair = 0;
var twoPair = 0;
var twoPairHand;
var threePairHand;

function findCardValues() {
    for(var i = 0; i < 5; i++) {
        var cardNum = "card" + (i + 1);
        var filename = $(cardNum).src
        var lastfive = filename.substr(filename.length - 6);
        var value = lastfive.substr(0, 2);
        hand[i] = value;
    }
}

function cardDeal() {
    
    var anArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
    for(var j = 0; j < anArray.length; ++j) {
        var randomNum = Math.floor(Math.random() * anArray.length);
        var temp = anArray[j];
        anArray[j] = anArray[randomNum];
        anArray[randomNum] = temp;
    }    

    var filename;
    var cards = document.getElementsByClassName("card");
    for(var i = 0; i < 5; ++i) {
        filename = "images/" + deck[anArray[i]] + ".png";
        cards[i].setAttribute("src", filename);
    }
}

var deal = function() {
    cardDeal();
    
    $("handscore").innerHTML = "<p></p>";
    
    findCardValues();
    findPair();
    find3ofAKind();
    find4ofAKind();
    findFullHouse();
    findFlush();
    findStraight();
    findStraightFlush();
    
    $("points").innerHTML = "<p>Points: " + points + " </p>";
    
    cardRanks = [];
    cardSuits = [];
    suitCount = {};
    valueCount = {};
}

function findPair() {
    for(var i = 0; i < 5; i++) {
        var value = hand[i].charAt(0);
        switch(value) {
            case 'J':
                value = '11';
                break;
            case 'Q':
                value = '12';
                break;
            case 'K':
                value = '13';
                break;
            case 'T':
                value = '10';
                break;
            case 'A':
                value = '1';
                break;
        }
        value = parseInt(value);
        cardRanks[i] = value;
    }
    
    for(var k = 0; k < 5; k++) {
        var value2 = hand[k].charAt(1);
        cardSuits[k] = value2;
    }
    
    cardRanks.sort(function(a, b) { return a - b; });
    for(var j = 0; j < 5; j++) { 
        if(cardRanks[j] == cardRanks[j + 1]) {
            points = points + 2;
            twoPair = 1;
            twoPairHand = cardRanks[j];
            if(cardRanks[j] == 11) {
                $("handscore").innerHTML = "<p>You got a pair of Jack's!</p>";
            }
            else if(cardRanks[j] == 12){
                $("handscore").innerHTML = "<p>You got a pair of Queen's!</p>";
            }
            else if(cardRanks[j] == 13){
                $("handscore").innerHTML = "<p>You got a pair of King's!</p>";
            }
            else if(cardRanks[j] == 1){
                $("handscore").innerHTML = "<p>You got a pair of Ace's!</p>";
            }
            else {
                $("handscore").innerHTML = "<p>You got a pair of " + cardRanks[j] + "'s!</p>";  
            }
        }
    }
}

function find3ofAKind() {
    cardSuits.forEach(function(i) { suitCount[i] = (suitCount[i]||0) + 1;});
    cardRanks.forEach(function(i) { valueCount[i] = (valueCount[i]||0) + 1;});
    console.log(suitCount);
    console.log(valueCount);  
    for(var i = 2; i <= 10; i++) {
        if(valueCount[i] == 3) {
            $("handscore").innerHTML = "<p>You got a 3 of " + i + "'s!</p>";
            threePair = 1;
            threePairHand = valueCount[i];
            points = points + 5;
        }
    }
    if(valueCount['1'] == 3) {
        $("handscore").innerHTML = "<p>You got a 3 of Aces!</p>";
        threePair = 1;
        threePairHand = valueCount[i];
        points = points + 5;
    }
    else if(valueCount['11'] == 3) {
        $("handscore").innerHTML = "<p>You got a 3 of Jack's!</p>";
        threePair = 1;
        threePairHand = valueCount[i];
        points = points + 5;
    }
    else if(valueCount['12'] == 3) {
        $("handscore").innerHTML = "<p>You got a 3 of Queen's!</p>";
        threePair = 1;
        threePairHand = valueCount[i];
        points = points + 5;
    }
    else if(valueCount['13'] == 3) {
        $("handscore").innerHTML = "<p>You got a 3 of King's!</p>";
        threePair = 1;
        threePairHand = valueCount[i];
        points = points + 5;
    }
}

function find4ofAKind() {
    for(var i = 2; i <= 10; i++) {
        if(valueCount[i] == 4) {
            $("handscore").innerHTML = "<p>You got a 4 of " + i + "'s!</p>";
            points = points + 25;
        }
    }
    if(valueCount['1'] == 4) {
        $("handscore").innerHTML = "<p>You got a 4 of Aces!</p>";
        points = points + 25;
    }
    else if(valueCount['11'] == 4) {
        $("handscore").innerHTML = "<p>You got a 4 of Jack's!</p>";
        points = points + 25;
    }
    else if(valueCount['12'] == 4) {
        $("handscore").innerHTML = "<p>You got a 4 of Queen's!</p>";
        points = points + 25;
    }
    else if(valueCount['13'] == 4) {
        $("handscore").innerHTML = "<p>You got a 4 of King's!</p>";
        points = points + 25;
    }
}

function findFullHouse() {
    if(twoPair == 1 && threePair == 1 && parseInt(twoPairHand) != threePairHand) {
        $("handscore").innerHTML = "<p>You got a Full House!</p>";
        points = points + 15;
    }
}

function findFlush() {
    if(suitCount['H'] == 5 | suitCount['C'] == 5 | suitCount['D'] == 5 | suitCount['S'] == 5) {
        $("handscore").innerHTML = "<p>You got a Flush!</p>";
    }
}

function findStraight() {
    for(var j = 0; j < 5; j++) { 
        if(cardRanks[j] == cardRanks[j + 1] == cardRanks[j + 2] == cardRanks[j + 3] == cardRanks[j + 4]) {
            points = points + 15;
            $("handscore").innerHTML = "<p>You got a Straight!</p>";
        }
    }
}

function findStraightFlush() {
    for(var j = 0; j < 5; j++) { 
        if(cardRanks[j] == cardRanks[j + 1] == cardRanks[j + 2] == cardRanks[j + 3] == cardRanks[j + 4]) {
            if(suitCount['H'] == 5 | suitCount['C'] == 5 | suitCount['D'] == 5 | suitCount['S'] == 5) {
                points = points + 50;
                $("handscore").innerHTML = "<p>You got a Straight Flush!</p>";
            }
        }
    }
}

var shuffle = function() {
    var i = 0, j = 0, temp = null;
    for(i = 0; i < deck.length; i++) {
        j = Math.floor(Math.random() * (i + 1));
        temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

window.onload = function () {
    $("dealPoker").onclick = deal;
    $("shuffleDeck").onclick = shuffle;
}