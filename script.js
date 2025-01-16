let isAuthenticated = false;

// Simulated user database
const users = {};

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

// Adding destinations to wishlist with images
document.getElementById('addBtn').addEventListener('click', function() {
    if (!isAuthenticated) return;

    const input = document.getElementById('destinationInput');
    const imageInput = document.getElementById('imageInput');
    
    const destination = input.value.trim();
    
     if (destination && imageInput.files.length > 0) {
         addDestination(destination, imageInput.files[0]);
         input.value = ''; // Clear input field
         imageInput.value = ''; // Clear file input
         input.focus();
         
      } else {
          alert('Please enter a destination and select an image!');
      }
});

function addDestination(destination, imageFile) {
    
     const li = document.createElement('li');
    
     li.textContent = destination;

     const img = document.createElement('img');
     img.src = URL.createObjectURL(imageFile); // Create a URL for the uploaded image

     const removeBtn = document.createElement('button');
     removeBtn.textContent = 'Remove';
     
     removeBtn.addEventListener('click', function() {
         li.remove();
     });

     li.appendChild(img); // Add the image to the list item
     li.appendChild(removeBtn);
     
     document.getElementById('wishlist').appendChild(li);
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
   isAuthenticated = false; 
   document.getElementById('wishlistSection').style.display = 'none';
   document.getElementById('authSection').style.display = 'block';
   alert("Logged out successfully!");
});
