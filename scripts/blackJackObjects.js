let deck = [];
let suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
let cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let playersHand = [];
let dealersHand = [];


function Card(suit, rank, ptsValue) {
    this.suit = suit;
    this.rank = rank;
    this.ptsValue = ptsValue;
}

function createDeck() {
    deck = [];
    for (let i = 0; i < ranks.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let card = new Card(suits[j], ranks[i], cardValues[i]);
            deck.push(card);
        }
    }
    return deck;
}

//Works fine, no need to change
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

//Works fine, no need to change;
function dealFrom(deck) {
    playersHand.push(deck.pop());
    dealersHand.push(deck.pop());
}

//TODO: Randomly stops working, why?
function calculateHand(hand) {
    let result = 0;
    hand.forEach(card => result += card.ptsValue);
    return result;
}

function compareFinalHands(playerPts, dealerPts) {
    checkWinCondition(playerPts, dealerPts);
    if (playerPts > dealerPts) {
        if (confirm("You won! Another one?")) {
            location.reload(false);
        }
    } else {
        if (confirm("You lost! Another one?")) {
            window.location.reload(false);
        }
    }
}

function checkWinCondition(playerPts, dealerPts) {
    //TODO: Refactor checks, rough draft
    let isAnyoneOver21 = playerPts > 21 || dealerPts > 21;
    let isAnyoneHas21 = playerPts === 21 || dealerPts === 21;
    if (isAnyoneOver21) {
        if (playerPts > dealerPts) {
            if (confirm("You lost, another one?")) {
                location.reload(false);
            }
        } else {
            if (confirm("Dealer bust out! Another one?")) {
                location.reload(false);
            }
        }
    } else if (isAnyoneHas21) {
        if (playerPts === dealerPts) {
            if (confirm("Draw! Another one?")) {
                location.reload(false);
            } else if (playerPts > dealerPts){
                if (confirm("You won! Another one?")) {
                    window.location.reload(false);
                }
            } else {
                if (confirm("You lost! Another one?")) {
                    window.location.reload(false);
                }
            }
        }
    }
}

function displayHand(hand, side) {
    let cards = [];
    hand.forEach(card => cards.push(card.rank + " of " + card.suit));
    alert(`${side}'s hand is ${cards}`);
    console.log(`${side}'s hand is: ${cards}`);

}

function play() {
        let playDeck = shuffle(createDeck());

        dealFrom(playDeck);
        dealFrom(playDeck);

        displayHand(playersHand, "Player");
        displayHand(dealersHand, "Dealer");

        let playersPts = calculateHand(playersHand);
        let dealerPts = calculateHand(dealersHand);

        alert(`You have ${playersPts}, and Dealer has ${dealerPts}`);
        console.log(`You have ${playersPts}, and Dealer has ${dealerPts}`);

        checkWinCondition(playersPts, dealerPts);

        let hitMe = confirm("Do you want another card?");
        if (hitMe) {
            dealFrom(playDeck);
            displayHand(playersHand, "Player");
            displayHand(dealersHand, "Dealer");
            playersPts = calculateHand(playersHand);
            dealerPts = calculateHand(dealerPts);
            checkWinCondition(playersPts, dealerPts);
        } else {
            compareFinalHands(playersPts, dealerPts);
        }
}

play();


