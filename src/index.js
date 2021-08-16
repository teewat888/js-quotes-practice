const baseURL = "http://localhost:3000/";

function renderAllQuote() {
    const ul = document.getElementById('quote-list');
    fetchAllQuote().then((data) => {
        data.forEach(el => {
            
        });
    })
}

//fetch
function fetchAllQuote() {
    return fetch(baseURL + 'quotes').then((resp => resp.json()));
}

renderAllQuote();