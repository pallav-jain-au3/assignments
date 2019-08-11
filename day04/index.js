let cities;
const input = $('input');

$.ajax({
    url: 'https://raw.githubusercontent.com/attainu-nightingale/nightingale-course-module/master/coding-challenges/data/cities.json',
    dataType: 'json',
    type: 'get',
    success: function (data) {
        cities = data;
        checkforInput();
    },
    fail: function () {
        console.log("Data not recieved");
    }
});


function checkforInput() {
    input.on('keyup', function () {
        let text = input.val();
        if (!text) {
            clearSuggestions();
        }
        else {
            findMatches(text);
        }
    });
}


function findMatches(text) {
    let regex = RegExp(`^${text}`, 'i');
    let matched = cities.filter(city => regex.test(city.name));
    displayMatch(matched);
}
function clearSuggestions() {
    $('ul').html('');
}

function displayMatch(matched) {
    let str = "";
    matched.forEach(
        city => {
            let url = 'https://en.wikipedia.org/wiki/' + city.name;
            str += `<li><a href = ${url} target="_blank">${city.name}, ${city.state}</li>`
        }
    )
    $('ul').html(str);
}