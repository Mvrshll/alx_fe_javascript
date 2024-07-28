const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const categoryFilter = document.getElementById('categoryFilter');
const importFile = document.getElementById('importFile');

const STORAGE_KEY = 'quotes'; // Key for local storage
const FILTER_KEY = 'lastFilter';

const quotes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; // Load from storage or initialize empty array
let categories = [];

// const quotes = [
  // { text: 'The only way to do great work is to love what you do.', category: 'Work' },
  //{ text: 'In the middle of difficulty lies opportunity.', category: 'Life' },
  //{ text: 'Life is like a coin. You can spend it any way you wish, but you only spend it once.', category: 'Life'},
 //{ text: 'The best way to predict your future is to create it.', category: 'Work'},
  // Add more quotes here
//];

function createQuoteElement(quote) {
    const quoteElement = document.createElement('div');
    quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
    return quoteElement;
}
  
function displayQuotes() {
    quoteDisplay.innerHTML = ''; // Clear previous quotes
    quotes.forEach(quote => {
      const quoteElement = createQuoteElement(quote);
      quoteDisplay.appendChild(quoteElement);
    });
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = `"${randomQuote.text}"   
   - ${randomQuote.category}`;
  }
  
  newQuoteButton.addEventListener('click', showRandomQuote);
  
  function createAddQuoteForm() {
    const quoteText = newQuoteText.value;
    const quoteCategory = newQuoteCategory.value;
  
    if (quoteText && quoteCategory) {
      const newQuote = { text: quoteText, category: quoteCategory };
      quotes.push(newQuote);
      newQuoteText.value = '';
      newQuoteCategory.value = '';
      saveQuotes();
      updateCategories();
      filterQuotes();
      showRandomQuote(); // Display a new quote, including the added one
    } else {
      alert('Please enter both quote and category');
    }
  }
  
function saveQuotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

function updateCategories() {
    categories = Array.from(new Set(quotes.map(quote => quote.category)));
    populateCategories();
}
  
function populateCategories() {
    categoryFilter.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.text = 'All Categories';
    categoryFilter.appendChild(allOption);
  
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.text   
   = category;
      categoryFilter.appendChild(option);   
  
    });
  
    // Restore last selected filter
    const lastFilter = localStorage.getItem(FILTER_KEY);
    if (lastFilter) {
      categoryFilter.value = lastFilter;
    }
}
  
function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    displayQuotes(filteredQuotes);
    localStorage.setItem(FILTER_KEY, selectedCategory);
}
  
// Initial setup
updateCategories();
filterQuotes();

function importFromJsonFile (event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
}

const fileReader = new FileReader();
fileReader.onload = function(event) {
    try {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes); // Street operator for efficient addition
        savedQuotes();
        alert('Quotes imported successfully!');
        displayQuotes();
    } catch (error) {
        alert('Error importing quotes: ' + error.message);
    };
    fileReader.readAsText(file);
}

function exportQuotesToJSON() {
    const jsonData = JSON.stringify(quotes);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
  link.href = url;
  link.download   
 = 'quotes.json';
  link.click();

  URL.revokeObjectURL(url); // Clean up memory leak
}

// Initial display of quotes
displayQuotes();

newQuoteButton.addEventListener('click', showRandomQuote);
importFile.addEventListener('change', importFromJsonFile);

// Optional: Add button for export functionality
const exportButton = document.createElement('button');
exportButton.textContent = 'Export Quotes';
exportButton.addEventListener('click', exportQuotesToJSON);
// Add exportButton to your HTML

// Initial quote display
showRandomQuote();