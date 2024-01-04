// function to build the url for requests to the api
const fullURL = route => 'https://deckofcardsapi.com/api/deck/' + route ;

const main = async () => {
    // shuffle and get a new deck
    let res = await fetch(fullURL('new/shuffle/?deck_count=1'))
    let data = await res.json();
    const deckId = data.deck_id;

    // button onclick event listener
    $button = $('#draw-card');
    $button.on('click', async function() {
        const res = await fetch(fullURL(deckId + '/draw/?count=1'));
        const data = await res.json();

        // Once the deck is empty, remove the button
        if (data.remaining === 0) {
            $button.remove();
            return;
        }

        // get the card from the api, only 1 card is drawn
        const card = data.cards[0];

        // random angle and position of the card
        const angle = Math.random() * 40 - 20;   // between -20 and 20
        const randomX = Math.random() * 20 - 10; // between -10 and 10
        const randomY = Math.random() * 20 - 10; // between -10 and 10
        
        // create a card with the image from the api and set random position and angle
        $card = $('<img>', {
            src: card.image,
            css: {
                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
                zIndex: -data.remaining,
                position: 'absolute',
                top: '20%',
                left: '45%'
            }
        });

        $('#table').append($card);
    });

}

main();