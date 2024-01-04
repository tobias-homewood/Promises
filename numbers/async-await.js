const fullURL = route => 'http://numbersapi.com/' + route + '?json';
const number = 7;

const numberFacts = async () => {
    
    // 1- first number fact
    let res = await fetch(fullURL(number));
    let data = await res.json();

    console.log(data);

    $('#app').append('<h2>First Fact</h2>');
    let p = document.createElement('p');
    p.innerHTML = `<b>For the number ${data.number}:</b> ${data.text}`;
    $('#app').append(p);


    // 2- list of number facts
    res = await fetch(fullURL('13,37,42,69,420'));
    data = await res.json();

    console.log(data);

    $('#app').append('<h2>List of Number Facts</h2>');
    for (let num in data) {
        const p = document.createElement('p');
        p.innerHTML = `<b>For the number ${num}:</b> ${data[num]}`;
        $('#app').append(p);
    }

    // 3- 4 facts about a number
    $('#app').append(`<h2>4 Facts About the Number ${number}</h2>`);
    for (let i = 0; i < 4; i++) {
        res = await fetch(fullURL(number));
        data = await res.json();

        console.log(data);

        const p = document.createElement('p');
        p.innerHTML = `<b>For the number ${data.number}:</b> ${data.text}`;
        $('#app').append(p);
    }
}

numberFacts();