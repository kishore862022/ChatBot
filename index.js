function getSolution() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const issues = document.getElementById('issues').value;

    // You can replace this with a more sophisticated logic to generate a solution
    const localSolution = `Dear ${name}, based on your input, it seems like you may need to consult with a healthcare professional regarding your ${issues}.`;

    // Google search API integration
    const googleSearchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(issues)}&key=YOUR_GOOGLE_API_KEY&cx=YOUR_CUSTOM_SEARCH_ENGINE_ID`;

    fetch(googleSearchUrl)
        .then(response => response.json())
        .then(data => {
            const googleSolution = data.items ? data.items[0].snippet : "No relevant information found on Google.";
            const finalSolution = `${localSolution}\n\nGoogle says: ${googleSolution}`;

            document.getElementById('page2').classList.add('hidden');
            document.getElementById('result').classList.remove('hidden');
            document.getElementById('solution').innerText = finalSolution;
        })
        .catch(error => {
            console.error('Error fetching Google search results:', error);
            // Proceed with local solution if there's an error with the Google search
            document.getElementById('page2').classList.add('hidden');
            document.getElementById('result').classList.remove('hidden');
            document.getElementById('solution').innerText = localSolution;
        });
}
