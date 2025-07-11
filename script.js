

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const quoteBtn = document.getElementById("new-quote");
const twitterBtn =document.getElementById("twitter");
const loader = document.getElementById("loader");


function showLoadingSpinner(){
  loader.classList.remove("hidden");
  quoteContainer.classList.add("hidden");

}


function removeLoadingSpinner(){
  loader.classList.add("hidden");
  quoteContainer.classList.remove("hidden");

}



async function getQuote() {

  showLoadingSpinner();
  const apiUrl = "quotes.json";


  try{

    await new Promise(resolve => setTimeout(resolve, 1000)); // ⏳ wait 1 sec
    const response = await fetch(apiUrl);
    const data = await response.json();

    const randomIndex = Math.floor(Math.random() *data.length);
    const quote = data[randomIndex];


    quoteText.textContent = quote.text;
    quoteAuthor.textContent =quote.author || "unknown";


    removeLoadingSpinner();

  }


  catch(error){

    console.log("error", error);
    quoteText.textContent = "Oops! Couldnt fetch the Quote";
    quoteAuthor.textContent ="";
    removeLoadingSpinner();

  } 
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} — ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}


quoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);


getQuote();





