const fullURL = route => 'http://numbersapi.com/' + route + '?json';
const number = 7;

// 1- first number fact
fetch(fullURL(number))
.then(res => res.json())
.then(function(data) {
    console.log(data);
    $('#app').append('<h2>First Fact</h2>');
    const p = document.createElement('p');
    p.innerHTML = `<b>For the number ${data.number}:</b> ${data.text}`;
    $('#app').append(p);

    // 2- list of number facts
    fetch(fullURL('13,37,42,69,420'))
    .then(res => res.json())
    .then(function(data) {
        console.log(data);
        $('#app').append('<h2>List of Number Facts</h2>');
        for (let num in data) {
            const p = document.createElement('p');
            p.innerHTML = `<b>For the number ${num}:</b> ${data[num]}`;
            $('#app').append(p);
        }

        // 3- 4 facts about a number
        const facts = [];
        for (let i = 0; i < 4; i++) {
            facts.push(fetch(fullURL(number)));
        }

        Promise.all(facts)
        .then(res => Promise.all(res.map(r => r.json())))
        .then(function(data) {
            console.log(data);
            $('#app').append(`<h2>4 Facts About the Number ${number}</h2>`);
            for (let fact of data) {
                const p = document.createElement('p');
                p.innerHTML = `<b>For the number ${fact.number}:</b> ${fact.text}`;
                $('#app').append(p);
            }
        })
    });
});


