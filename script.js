
window.onload = function() {
    fetch('modal.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            setupModalSwitching(); 
            setupFormValidation(); 
        })
        .catch(error => console.error('Error loading modal:', error));
};


function setupModalSwitching() {
    const toggleToSignUp = document.getElementById('toggleToSignUp');
    const toggleToSignIn = document.getElementById('toggleToSignIn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    
    loginForm.classList.remove('d-none');
    signupForm.classList.add('d-none');

    
    toggleToSignUp.style.display = 'inline-block';
    toggleToSignIn.style.display = 'none';

  
    toggleToSignUp.addEventListener('click', function() {
        loginForm.classList.add('d-none');
        signupForm.classList.remove('d-none');
        toggleToSignUp.style.display = 'none';
        toggleToSignIn.style.display = 'inline-block';
    });

   
    toggleToSignIn.addEventListener('click', function() {
        loginForm.classList.remove('d-none');
        signupForm.classList.add('d-none');
        toggleToSignUp.style.display = 'inline-block';
        toggleToSignIn.style.display = 'none';
    });
}


function setupFormValidation() {
    
    document.getElementById("signupForm").addEventListener("submit", function (e) {
        e.preventDefault(); 

        const username = document.getElementById("username").value;
        const email = document.getElementById("signupEmail").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("signupPassword").value;
        const repeatPassword = document.getElementById("repeatPassword").value;

       
        const phonePattern = /^\+?[0-9]{10,15}$/;
        if (!phone.match(phonePattern)) {
            alert("Please enter a valid phone number (format: +1234567890)");
            return;
        }

        
        if (password !== repeatPassword) {
            alert("Passwords do not match!");
            return;
        }

      
        if (!username || !email || !phone || !password || !repeatPassword) {
            alert("Please fill in all the fields!");
            return;
        }

       
        alert("Signup successful!");

    });

   
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault(); 

        
        const username = document.getElementById("floatingInput").value;
        const password = document.getElementById("floatingPassword").value;

       
        if (!username || !password) {
            alert("Please enter both username and password!");
            return;
        }

        
        alert("Login successful! Redirecting...");
        
       
        window.location.href = "menu.html"; 
    });
}
