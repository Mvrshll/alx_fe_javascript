const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

const quotes = [
  { text: 'The only way to do great work is to love what you do.', category: 'Work' },
  { text: 'In the middle of difficulty lies opportunity.', category: 'Life' },
  { text: 'Life is like a coin. You can spend it any way you wish, but you only spend it once.', category: 'Life'},
  { text: 'The best way to predict your future is to create it.', category: 'Work'},
  // Add more quotes here
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

newQuoteButton.addEventListener('click', showRandomQuote);

function addQuote() {
  const quoteText = newQuoteText.value;
  const quoteCategory = newQuoteCategory.value;

  if (quoteText && quoteCategory) {
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    newQuoteText.value = '';
    newQuoteCategory.value = '';
    showRandomQuote(); // Display a new quote, including the added one
  } else {
    alert('Please enter both quote and category');
  }
}

// Initial quote display
showRandomQuote();
