document.addEventListener("DOMContentLoaded", () => {
  const snowflakesContainer = document.querySelector(".snowflakes");

 
  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❄"; 
    snowflakesContainer.appendChild(snowflake);
  }

  const snowflakes = document.querySelectorAll(".snowflake");

  snowflakes.forEach((snowflake) => {
   
    snowflake.style.left = `${Math.random() * 100}vw`;

    
    snowflake.style.animationDuration = `${3 + Math.random() * 7}s`; 
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
  
    snowflake.style.fontSize = `${1 + Math.random() * 2}rem`; 
  });
});
