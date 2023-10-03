// *dropdown function 

var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});

// *modal function 

var modalBtn = document.getElementById("modal-btn");
var modalCard = document.getElementById("modal-card");
var close = document.getElementById("close-modal");
 
modalBtn.onclick = function() {
    modalCard.style.display = "block"
}

close.onclick = function() {
    modalCard.style.display = "none"
}

window.onclick = function(event) {
    if (event.target.className == "modal-background") {
        modalCard.style.display = "none";
    }
}
