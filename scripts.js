// Variables to manage slideshow and containers
var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");
var headerContainer = document.querySelector(".header-container");
var slideshowContainer = document.querySelector(".slideshow-container");
var tableContainer = document.querySelector(".table-container");
var infoContainer = document.querySelector(".info-container");

// Initial function to start the slideshow
showSlides();

// Function to show slides in a loop
function showSlides() {
  // Hide all slides
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // Move to the next slide
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  // Display the current slide
  slides[slideIndex - 1].style.display = "block";

  // Set a timeout to call the function again after 3000 milliseconds (3 seconds)
  setTimeout(showSlides, 3000);
}

// Function to display the navigation table
function tableDisplay() {
  // Hide unnecessary containers and display the table container
  playSound('welcome.mp3');
  infoContainer.style.display = 'none';
  headerContainer.style.display = 'flex';
  slideshowContainer.style.display = "none";
  tableContainer.style.display = "block";
  document.getElementById('mainHeader').style.display = 'block'; // Show the header for other contents
}

// Function to go back to the slideshow
function goHome() {
  // Hide the navigation table and display the slideshow
  headerContainer.style.display = 'none';
  tableContainer.style.display = 'none';
  slideshowContainer.style.display = 'block';
  document.getElementById('mainHeader').style.display = 'none'; // Hide the header during slideshow
}

// Function to handle the service page
function servicePage() {
  // Fetch and display the services page
  fetch(`pages/services.html`)
    .then(response => response.text())
    .then(htmlContent => {
      infoContainer.innerHTML = htmlContent;
      // Add a "Go Back" button to return to the navigation table
      var goBackButton = document.createElement('button');
      goBackButton.textContent = 'Back';
      goBackButton.addEventListener('click', tableDisplay);
      infoContainer.appendChild(goBackButton);
      // Event listeners for "See More" buttons within the services page
      document.querySelectorAll('.seemorebutton').forEach(button => {
        button.addEventListener('click', function () {
          const serviceId = this.getAttribute('data-services');
          showServiceInformation(serviceId);
        });
      });
    })
    .catch(error => {
      console.error(`Error fetching HTML for services page:`, error);
    });
}

// Function to show detailed information about a specific service
function showServiceInformation(serviceId) {
  switch (serviceId) {
    case '1':
    case '2':
    case '3':
      // Fetch and display the information for the selected service
      fetch(`pages/serviceinfo/service${serviceId}.html`)
        .then(response => response.text())
        .then(htmlContent => {
          infoContainer.innerHTML = htmlContent;
          // Add a "Go Back" button to return to the service page
          var goBackToServiceButton = document.createElement('button');
          goBackToServiceButton.textContent = 'Back';
          goBackToServiceButton.addEventListener('click', servicePage);
          infoContainer.appendChild(goBackToServiceButton);
        })
        .catch(error => {
          console.error(`Error fetching HTML for service ${serviceId}:`, error);
        });
      break;
    default:
      infoContainer.innerHTML = `Could not load information for service ${serviceId}`;
  }
}

// Function to display information based on the selected page
function showPageInformation(page) {
  // Display the header, hide the navigation table, and clear the info container
  headerContainer.style.display = 'flex';
  tableContainer.style.display = 'none';
  infoContainer.innerHTML = "";

  switch (page) {
    case 'about':
    case 'consultant':
    case 'contact':
    case 'faq':
    case 'robot':
      // Fetch and display information for standard pages
      fetch(`pages/${page.toLowerCase()}.html`)
        .then(response => response.text())
        .then(htmlContent => {
          infoContainer.innerHTML = htmlContent;
          // Add a "Go Back" button to return to the navigation table
          var goBackButton = document.createElement('button');
          goBackButton.textContent = 'Back';
          goBackButton.addEventListener('click', tableDisplay);
          infoContainer.appendChild(goBackButton);
        })
        .catch(error => {
          console.error(`Error fetching HTML for ${page}:`, error);
        });
      break;
    case 'services':
      // Play sound and navigate to the service page
      playSound('services.mp3');
      servicePage();
      break;
    default:
      infoContainer.innerHTML = `Could not load information for ${page}`;
  }

  // Display the information container
  infoContainer.style.display = "block";
}

// Function to play sounds
function playSound(soundFileName) {
  var audio = new Audio('sounds/' + soundFileName);
  audio.play();
}

// Event listeners for buttons within the navigation table
document.querySelector('.table-container button:nth-child(1)').addEventListener('click', function () {
  showPageInformation('about');
  playSound('about.mp3'); 
});
document.querySelector('.table-container button:nth-child(2)').addEventListener('click', function () {
  showPageInformation('consultant');
  playSound('consultant.mp3'); 
});
document.querySelector('.table-container button:nth-child(3)').addEventListener('click', function () {
  showPageInformation('services');
  playSound('services.mp3'); 
});
document.querySelector('.table-container button:nth-child(4)').addEventListener('click', function () {
  showPageInformation('contact');
  playSound('contact.mp3'); 
});
document.querySelector('.table-container button:nth-child(5)').addEventListener('click', function () {
  showPageInformation('faq');
  playSound('faq.mp3'); 
});
document.querySelector('.table-container button:nth-child(6)').addEventListener('click', function () {
  showPageInformation('robot');
  playSound('robot.mp3'); 
});

// Event listeners for additional buttons
document.querySelector('.table-container button:last-child').addEventListener('click', goHome);
document.querySelector('.slideshow-container button').addEventListener('click', function() {
  // Trigger the table display and play welcome sound
  tableDisplay();
  playSound('welcome.mp3');
});
document.querySelector('.info-container button').addEventListener('click', tableDisplay);
