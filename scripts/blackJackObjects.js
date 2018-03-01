let deck = [];
const suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let playersHand = [];
let dealersHand = [];

/**
 * @param suit -- Card's suit (look in suits array for possible values).
 * @param rank -- Card's rand (look in ranks array for possible values).
 * @param ptsValue -- Card's points value (look in cardValues array for possible values).
 * @constructor -- Card object constructor.
 */
function Card(suit, rank, ptsValue) {
    this.suit = suit;
    this.rank = rank;
    this.ptsValue = ptsValue;
}

/**
 * Populates deck array with Card objects. Cards are created dynamicly, by rank (4 Aces, 4 Kings, 4 Queens, etc...)
 * and are added in deck array in the same way.
 * @returns {Array} -- ordered array of Cards.
 */
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

/**
 * Randomly shuffles array of Card objects. Typically doesn't depend on size of deck array, but might encounter
 * some issues later if size changes (this issue was not tested).
 * @param deck -- array populated with Card objects.
 * @returns {Array} -- same array but instead of ordered (by rank -- 4 Aces, 4 Kings, 4 Queens, etc...), is now randomly shuffled.
 */
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

/**
 * Deals each player single card from deck. Both player and dealers hands arrays add a last (top) element from deck array.
 * It is assumed that deck array is shuffled before calling this function.
 * @param deck -- array populated with Card objects. Assumed that it has 52 cards and shuffled.
 */
function dealFrom(deck) {
    playersHand.push(deck.pop());
    dealersHand.push(deck.pop());
}

/**
 * Calculate number of points on given set of cards ("hand"). Writes it to console.
 * @param hand -- Array of cards.
 * @returns {number} -- total pts value.
 */
function calculateHand(hand) {
    let result = 0;
    console.log(hand);
    hand.forEach(card => result += card.ptsValue);
    return result;
}

/**
 * Checks final win conditions. Calls @function checkWinCondition inside but also just compares points
 * even if neither of players bust out or get 21 pts.
 * @param playerPts -- total Player points.
 * @param dealerPts -- total Dealer points.
 */
function compareFinalHands(playerPts, dealerPts) {
    checkWinCondition(playerPts, dealerPts);
    if (playerPts > dealerPts) {
        if (confirm("You won! Another one?")) {
            location.reload(false);
        } else {
            window.location = "http://localhost:63342/BlackJack/endGame.html";
        }
    } else {
        if (confirm("You lost! Another one?")) {
            window.location.reload(false);
        } else {
            window.location = "http://localhost:63342/BlackJack/endGame.html";
        }
    }
}

/**
    Checks if either player or dealer achieved win or lose condition: having 21 or over points.
    @param playerPts -- total Player points.
    @param dealerPts -- total Dealer points.
 */
//TODO: Still looks ugly
function checkWinCondition(playerPts, dealerPts) {
    let isAnyoneOver21 = playerPts > 21 || dealerPts > 21;
    let isAnyoneHas21 = playerPts === 21 || dealerPts === 21;
    if (isAnyoneOver21) {
        if (playerPts > dealerPts) {
            if (confirm("You lost, another one?")) {
                location.reload(false);
            } else {
                window.location = "http://localhost:63342/BlackJack/endGame.html";
            }
        } else {
            if (confirm("Dealer bust out! Another one?")) {
                location.reload(false);
            } else {
                window.location = "http://localhost:63342/BlackJack/endGame.html";
            }
        }
    } else if (isAnyoneHas21) {
        if (playerPts === dealerPts) {
            if (confirm("Draw! Another one?")) {
                location.reload(false);
            } else {
                window.location = "http://localhost:63342/BlackJack/endGame.html";
            }
        } else if (playerPts > dealerPts) {
            if (confirm("You won! Another one?")) {
                window.location.reload(false);
            } else {
                window.location = "http://localhost:63342/BlackJack/endGame.html";
            }
        } else {
            if (confirm("You lost! Another one?")) {
                window.location.reload(false);
            } else {
                window.location = "http://localhost:63342/BlackJack/endGame.html";
            }
        }
    }
}

/**
    Displays the hand to a player (Alert) and also prints it to console. Goes through hand array, takes each card suit
    and rank, adds ' of ' between them, to make it readable for a player (e.g. "Ace of Spades").
    Displays info to a player through alert and writes it to console.
    @param hand -- hand to be displayed.
    @param side -- Player or dealer to be logged correctly.
 */
function displayHand(hand, side) {
    let cards = [];
    hand.forEach(card => cards.push(card.rank + " of " + card.suit));
    alert(`${side}'s hand is ${cards}`);
    console.log(`${side}'s hand is: ${cards}`);

}

/**
 * Main function for this script. Calls @createDeck and @shuffle to get a playable shuffled deck of cards.
 * Deals two cards to both player and dealer @dealFrom (called two times).
 * Calculates both hands pts values @calculateHand.
 * Checks if any player achieved win, if not, suggests to continue dealing cards. Repeats the process.
 * At the moment supports only 2 stage games (typically that's enough, since it's super unlikely both players
 * will have under 21 pts with 3 cards on their hands, although this case should be covered in the future).
 */
//TODO: fix or enhance flow, no more than 2 steps ATM, also super simplified.
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
        dealerPts = calculateHand(dealersHand);
        checkWinCondition(playersPts, dealerPts);
    } else {
        compareFinalHands(playersPts, dealerPts);
    }
}

play();


