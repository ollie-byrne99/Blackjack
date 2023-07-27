const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function cardValue() {
    return Math.floor(Math.random() * 10) + 1;
}

function playGame() {
    let playerTotal = cardValue() + cardValue();
    console.log(`You start with: ${playerTotal}`);

    const question = () => {
        rl.question('Do you want to "hit" or "stay"? ', (answer) => {
            if(answer.toLowerCase() === 'hit') {
                playerTotal += cardValue();
                console.log(`Your total is now: ${playerTotal}`);
                if(playerTotal > 21) {
                    console.log('Bust! You lose.');
                    rl.close();
                } else {
                    question();
                }
            } else if(answer.toLowerCase() === 'stay') {
                let dealerTotal = cardValue() + cardValue();
                while(dealerTotal < 16) {
                    dealerTotal += cardValue();
                }

                console.log(`Dealer's total is: ${dealerTotal}`);
                
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
            } else {
                console.log('Please choose "hit" or "stay".');
                question();
            }
        });
    };

    question();
}

playGame();
