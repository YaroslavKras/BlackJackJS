let card1 = "Ace of Spades";
let card2 = "Ten of Hearts";
let deck = [];
let suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
let cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let playersHand = [];
let dealersHand = [];


function createDeck() {
    for (let i = 0; i < ranks.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let cards = [];
            cards[0] = ranks[i];
            cards[1] = suits[j];
            deck.push(cards);
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealFrom(deck) {
    playersHand.push(deck.pop());
    playersHand.push(deck.pop());

    dealersHand.push(deck.pop());
    dealersHand.push(deck.pop());
}

function calculateHand(hand) {
   return cardValues[ranks.indexOf(hand[0][0])] + cardValues[ranks.indexOf(hand[1][0])];
}

//
// console.log(createDeck());
// console.log(shuffle(deck));

let playDeck = shuffle(createDeck());
console.log(`You got a card: ${playDeck[Math.floor(Math.random() * (playDeck.length - 1))]}`);
dealFrom(playDeck);
console.log("Player's hand is: " + playersHand[0][0] + " of " + playersHand[0][1] + " and " + playersHand[1][0] + " of " + playersHand[1][1]);
console.log("Dealer's hand is: " + dealersHand[0][0] + " of " + dealersHand[0][1] + " and " + dealersHand[1][0] + " of " + dealersHand[1][1]);
let playersPts = calculateHand(playersHand);
let dealerPts = calculateHand(dealersHand);
console.log("You have " + playersPts);
console.log("Dealer has " + dealerPts);