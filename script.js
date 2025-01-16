let isAuthenticated = false;

// Simulated user database
const users = {};

// Authentication
document.getElementById('authBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simulated authentication
    if (users[username] && users[username] === password) {
        isAuthenticated = true;
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('wishlistSection').style.display = 'block';
        document.getElementById('authMessage').innerText = '';
        
        alert("Login successful!");
        
        // Clear input fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
    } else {
        document.getElementById('authMessage').innerText = 'Invalid username or password';
    }
});

// Registration
document.getElementById('registerBtn').addEventListener('click', function() {
    const regUsername = document.getElementById('regUsername').value.trim();
    const regPassword = document.getElementById('regPassword').value.trim();

    // Simple validation
    if (regUsername in users) {
        document.getElementById('regMessage').innerText = 'Username already exists';
        return;
    }

    if (regUsername && regPassword) {
        users[regUsername] = regPassword; // Store user credentials
        document.getElementById('regMessage').innerText = 'Registration successful! You can now log in.';
        
        // Clear input fields
        document.getElementById('regUsername').value = '';
        document.getElementById('regPassword').value = '';
        
        // Switch to login section
        toggleSections();
        
    } else {
        document.getElementById('regMessage').innerText = 'Please fill in all fields';
    }
});

// Toggle between login and registration sections
document.getElementById('showRegister').addEventListener('click', function() {
    toggleSections();
});

document.getElementById('showLogin').addEventListener('click', function() {
    toggleSections();
});

function toggleSections() {
    const authSection = document.getElementById('authSection');
    const registerSection = document.getElementById('registerSection');
    
    if (authSection.style.display === 'none') {
        authSection.style.display = 'block';
        registerSection.style.display = 'none';
    } else {
        authSection.style.display = 'none';
        registerSection.style.display = 'block';
    }
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    isAuthenticated = false;
    document.getElementById('wishlistSection').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
    alert("Logged out successfully!");
});

// Adding destinations to wishlist with category, date, and image
document.getElementById('addBtn').addEventListener('click', function() {
    if (!isAuthenticated) return;

    const input = document.getElementById('destinationInput');
    const imageInput = document.getElementById('imageInput');
    const dateInput = document.getElementById('dateInput');
    const categoryInput = document.getElementById('categoryInput');
    
    const destination = input.value.trim();
    const category = categoryInput.value;
    const date = dateInput.value;
    
    if (destination && imageInput.files.length > 0 && date) {
        addDestination(destination, imageInput.files[0], date, category);
        input.value = ''; // Clear input field
        imageInput.value = ''; // Clear file input
        dateInput.value = ''; // Clear date input
        input.focus();
    } else {
        alert('Please enter a destination, select an image, and choose a date!');
    }
});

// Add destination function with image, category, and date
function addDestination(destination, imageFile, date, category) {
    const wishlistContainer = document.getElementById('wishlist');
    const div = document.createElement('div');
    div.classList.add('wishlist-item');

    const img = document.createElement('img');
    img.src = URL.createObjectURL(imageFile);

    const destinationInfo = document.createElement('div');
    destinationInfo.classList.add('destination-info');
    destinationInfo.innerHTML = `<h4>${destination}</h4><p>${date}</p>`;

    const categoryBadge = document.createElement('div');
    categoryBadge.classList.add('category');
    categoryBadge.textContent = category;

    const visitedStatus = document.createElement('button');
    visitedStatus.classList.add('visited-btn');
    visitedStatus.innerHTML = '❌ Not Visited';  // Initially set to Not Visited
    visitedStatus.addEventListener('click', function() {
        if (visitedStatus.innerHTML.includes('❌')) {
            visitedStatus.innerHTML = '✔ Visited';  // Mark as Visited
            visitedStatus.style.color = 'green';
        } else {
            visitedStatus.innerHTML = '❌ Not Visited';  // Mark as Not Visited
            visitedStatus.style.color = 'red';
        }
    });

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function() {
        div.remove();
    });

    div.appendChild(img);
    div.appendChild(destinationInfo);
    div.appendChild(categoryBadge);
    div.appendChild(visitedStatus);  // Add visited button
    div.appendChild(removeBtn);

    wishlistContainer.appendChild(div);
}
