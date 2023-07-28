const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const cardValue = () => Math.floor(Math.random() * 10) + 1;


function playGame() {
    let playerTotal = cardValue() + cardValue();
    console.log(`You start with: ${playerTotal}`);

    function createDealerTotal() {
        let dealerTotal = cardValue() + cardValue();
        while(dealerTotal < playerTotal) {
            dealerTotal += cardValue();
        }
        return dealerTotal
    }
    
    function whoWins(playerTotal,dealerTotal) {
        if(dealerTotal > 21) {
            console.log('Dealer busts! You win.');
        } else if(dealerTotal > playerTotal) {
            console.log('Dealer wins.');
        } else if(dealerTotal < playerTotal) {
            console.log('You win.');
        } else {
            console.log('It\'s a draw.');
        }
        rl.close();
    }

    const question = () => {
        rl.question('Do you want to "hit" or "stay"? ', (answer) => {
            if(answer.toLowerCase() === 'hit') {
                playerTotal += cardValue();
                console.log(`Your total is now: ${playerTotal}`);
                if(playerTotal > 21) {
                    console.log('Bust! You lose.');
                    rl.close();
                } else if (playerTotal === 21){
                    console.log("You got Blackjack!")
                    let dealerTotal = createDealerTotal();
                    console.log(`Dealer's total is: ${dealerTotal}`);
                    whoWins(playerTotal,dealerTotal);
                } else {
                    question();
                }
            } else if(answer.toLowerCase() === 'stay') {
                let dealerTotal = createDealerTotal();
                console.log(`Dealer's total is: ${dealerTotal}`);
                whoWins(playerTotal,dealerTotal);
            } else {
                console.log('Please choose "hit" or "stay".');
                question();
            }
        });
    };

    question();
}

playGame();
