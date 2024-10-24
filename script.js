// Notes input box functionality
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load stored notes from localStorage
function showNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notesContainer.innerHTML = storedNotes;
  }
}

// Update notes in localStorage
function updateStorage() {
  const notesHTML = notesContainer.innerHTML;
  localStorage.setItem("notes", notesHTML);
}

// Show stored notes on page load
showNotes();

// Event listener for the "Create Notes" button
createBtn.addEventListener("click", () => {
  // Create new note with delete icon
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  
  img.src = "./assets/icons/delete.png";  // Add delete icon
  inputBox.appendChild(img);               // Append delete icon to new note
  
  notesContainer.appendChild(inputBox);    // Add note to container
  updateStorage();
});

// Add functionality for deleting notes
notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();  // Remove note on delete icon click
    updateStorage();
  } 
});

// Prevent adding multiple icons when typing inside a note
notesContainer.addEventListener("keydown", (e) => {
  if (e.target.tagName === "P") {
    const deleteIcon = e.target.querySelector("img");
    if (!deleteIcon) {  // Only add delete icon if it doesn't exist already
      const img = document.createElement("img");
      img.src = "./assets/icons/delete.png";
      e.target.appendChild(img);
    }
  }
});

// Handle new lines in contenteditable elements
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
