document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000/";
  const ul = document.getElementById("quote-list");
  const quoteSubmit = document.querySelector('button[type="submit"]');

  quoteSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    addQuote();
  });

  function clearTags() {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }

  function renderAllQuote() {
    fetchAllQuote().then((data) => {
      data.forEach((el) => {
        const li = document.createElement("li");
        const blockQuote = document.createElement("blockquote");
        const p = document.createElement("p");
        const footer = document.createElement("footer");
        const like = document.createElement("button");
        const span = document.createElement("span");
        const del = document.createElement("button");
        like.className = "btn-success";
        del.className = "btn-danger";
        footer.className = "blockquote-footer";
        p.className = "mb-0";
        blockQuote.className = "blockquote";
        li.className = "quote-card";
        like.innerHTML = "Like:";
        del.innerText = "Delete";
        footer.innerHTML = el.author + "<br>";
        span.innerText = el.likes.length;
        p.innerText = el.quote;
        like.append(span);
        blockQuote.append(p, footer, like, del);
        li.appendChild(blockQuote);
        ul.appendChild(li);

        del.addEventListener("click", () => {
          delQuote(el.id);
        });
        like.addEventListener("click", () => {
          likeQuote(el.id);
        });
      });
    });
  }

  function likeQuote(idQ) {
      const confObj = {
          method: "POST",
          headers: {
              "content-type": "application/json",
              "accept": "application/json"
          },
          body: JSON.stringify({
              quoteId: parseInt(idQ),
              createAt: Date.now()
          })
      }
      fetchAddLike(confObj).then((data) => {
          console.log('data like: ',data);
          clearTags();
          renderAllQuote();
        })

  }

  function delQuote(idQ) {
    const confObj = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: idQ,
      }),
    };
    fetchDeleteQuote(idQ, confObj).then((data) => {
      console.log("data del:  ", data);
      clearTags();
      renderAllQuote();
    });
  }

  function addQuote() {
    const quote = document.getElementById("new-quote");
    const author = document.getElementById("author");
    const confObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        quote: quote.value,
        author: author.value,
      }),
    };
    console.log("confObj:  ", confObj);
    fetchAddQuote(confObj).then((data) => {
      console.log("data: ", data);
      clearTags();
      renderAllQuote();
    });
  }

  //fetch

  function fetchAddLike(confObj) {
      return fetch(baseURL + 'likes',confObj).then((resp) => resp.json());
  }

  function fetchDeleteQuote(id, confObj) {
    return fetch(baseURL + `quotes/${id}`, confObj).then((resp) => resp.json());
  }

  function fetchAddQuote(confObj) {
    return fetch(baseURL + "quotes", confObj).then((resp) => resp.json());
  }

  function fetchAllQuote() {
    return fetch(baseURL + "quotes?_embed=likes").then((resp) => resp.json());
  }

  renderAllQuote();
});
