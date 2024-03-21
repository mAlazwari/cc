// Set the release date and time in the desired time zone (e.g., EST)
const now = new Date();
const releaseDate = new Date(now.getTime() + 1 * 6000); // Adds 1 minute (60000 milliseconds) to the current time

// Update the countdown every second
const countdownInterval = setInterval(function() {
    // Get the current date and time in the user's local time zone
    const now = new Date();

    // Calculate the remaining time
    const remainingTime = releaseDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Update the countdown values
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    // Clear the interval when the countdown reaches zero and reveal new content
    if (remainingTime < 0) {
        clearInterval(countdownInterval);
        
        // Hide the countdown
        document.querySelector('.countdown').style.display = 'none';
  
        // Reveal new content
        revealNewContent();
    }
}, 1000);

// Function to reveal new content once the countdown ends
function revealNewContent() {
// Make a request to the backend to get the new content
fetch('http://de2.bot-hosting.net:20435/get-content')
.then(response => response.json())
.then(data => {
  if (data.success) {
    // If the backend confirms the content is available, display it
    const newContentDiv = document.createElement('div');
    newContentDiv.classList.add('new-content');
    newContentDiv.innerHTML = data.content; // Set the new content from the backend
    document.querySelector('.hero-content').appendChild(newContentDiv);
  } else {
    // If the content is not yet available, show a message on the page
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('content-unavailable-message');
    messageDiv.textContent = 'Content is not available yet. Please wait until the release time.';
    document.querySelector('.hero-content').appendChild(messageDiv);
  }
})
.catch(error => {
  console.error('There was an error fetching the new content:', error);
});
  }

// Toggle the visibility of the menu
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    const logo = document.querySelector('logo-small');
    if (nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }if (logo.style.display === 'block') {
        logo.style.display = 'none';
    } else {
        logo.style.display = 'block';
    }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

// Event listener for the hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.addEventListener('click', toggleMenu);
});