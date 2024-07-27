function Dis() {
    let t1 = document.getElementById('pre_select');
    t1.style.display = "none";
    let section = document.getElementById('discover_new');
    section.style.display = 'inline';
}

async function fetchRecipes() {
    try {
        const response = await fetch(apiUrl);
        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

async function submitRecipe(recipe) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        });
        const newRecipe = await response.json();
        return newRecipe;
    } catch (error) {
        console.error('Error submitting recipe:', error);
    }
}

document.getElementById('recipe_form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let name = document.getElementById('recipe_name').value;
    let description = document.getElementById('recipe_description').value;
    let image = document.getElementById('recipe_image').value;

    if (name && description && image) {
        const newRecipe = await submitRecipe({ name, description, image });
        if (newRecipe) {
            displayRecipes([newRecipe]); // Display the newly added recipe
            document.getElementById('recipe_form').reset();
        }
    }
});

function displayRecipes(recipes) {
    let container = document.getElementById('recipes_container');
    container.innerHTML = '';

    recipes.forEach(recipe => {
        let recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';
        recipeDiv.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h4>${recipe.name}</h4>
            <p>${recipe.description}</p>
        `;
        container.appendChild(recipeDiv);
    });
}

// Fetch and display recipes on page load
window.onload = fetchRecipes;
