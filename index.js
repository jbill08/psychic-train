import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Odds API Configuration
const API_KEY = process.env.ODDS_API_KEY;
const BASE_URL = 'https://api.the-odds-api.com/v4/sports';

// Function to fetch football odds
async function fetchFootballOdds(sport = 'soccer_epl') {
    try {
        const response = await axios.get(`${BASE_URL}/${sport}/odds`, {
        params: {
            apiKey: API_KEY,
            regions: 'us', // Betting regions
            markets: 'h2h,spreads', // Betting markets
            oddsFormat: 'decimal' // Odds format
        }
        });

    return response.data;
    } catch (error) {
        console.error('Error fetching football odds:', error.response ? error.response.data : error.message);
        return null;
    }
}

// Function to display odds in a readable format
function displayOdds(odds) {
    if (!odds || odds.length === 0) {
        console.log('No odds available.');
        return;
    }

    odds.forEach(event => {
        console.log('----------------------------');
        console.log(`Event: ${event.home_team} vs ${event.away_team}`);
        console.log(`Commence Time: ${new Date(event.commence_time * 1000).toLocaleString()}`);
        
        if (event.bookmakers && event.bookmakers.length > 0) {
        event.bookmakers.forEach(bookmaker => {
            console.log(`\nBookmaker: ${bookmaker.title}`);
            bookmaker.markets.forEach(market => {
            console.log(`Market: ${market.key}`);
            market.outcomes.forEach(outcome => {
                console.log(`${outcome.name}: ${outcome.price}`);
            });
            });
        });
        }
    });
}

// Main function to run the application
async function main() {
    console.log('Fetching Football Odds...');
    const footballOdds = await fetchFootballOdds();
    
    if (footballOdds) {
        displayOdds(footballOdds);
    }
}

// Run the main function
main();