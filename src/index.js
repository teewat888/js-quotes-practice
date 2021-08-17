const baseURL = "http://localhost:3000/";

function renderAllQuote() {
  const ul = document.getElementById("quote-list");
  fetchAllQuote().then((data) => {
    data.forEach((el) => {
      const li = document.createElement("li");
      const blockQuote = document.createElement("blockquote");
      const p = document.createElement("p");
      const footer = document.createElement('footer');
      const like = document.createElement('button');
      const del = document.createElement('button');
      like.className = 'btn-success';
      del.className = 'btn-danger';
      footer.className = 'blockquote-footer';
      p.className = "mb-0";
      blockQuote.className = "blockquote";
      li.className = "quote-card";
      like.innerHTML = 'Like:';
      del.innerText = 'Delete';
      footer.innerHTML = el.author+'<br>';
      p.innerText = el.quote;
      blockQuote.append(p, footer, like, del);
      li.appendChild(blockQuote);
      ul.appendChild(li);
    });
  });
}

//fetch
function fetchAllQuote() {
  return fetch(baseURL + "quotes").then((resp) => resp.json());
}

renderAllQuote();