const fullURL = route => 'https://deckofcardsapi.com/api/deck/' + route ;

// shuffle and get a new deck
let deckId;
fetch(fullURL('new/shuffle/?deck_count=1'))
.then(res => res.json())
.then(function(data) {
    deckId = data.deck_id;
});

$button = $('#draw-card');
$button.on('click', function() {
    fetch(fullURL(deckId + '/draw/?count=1'))
    .then(res => res.json())
    .then(function(data) {
        if (data.remaining === 0) {
            $button.remove();
            return;
        }

        let card = data.cards[0];
        let angle = Math.random() * 40 - 20;   // between -20 and 20
        let randomX = Math.random() * 20 - 10; // between -10 and 10
        let randomY = Math.random() * 20 - 10; // between -10 and 10
        
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
});