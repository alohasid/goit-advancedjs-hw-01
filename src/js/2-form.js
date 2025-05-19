const feedbackForm = document.querySelector('.feedback-form');
const emailField = document.querySelector('input[name=email]');
const messageField = document.querySelector('textarea[name=message]');

const feedbackData = {
  email: "",
  message: "",
};

// Save form data to localStorage on input
feedbackForm.addEventListener('input', event => {
  feedbackData[event.target.name] = event.target.value;

  try {
    localStorage.setItem("feedback-form-data", JSON.stringify(feedbackData));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
});

// Load saved data from localStorage on page load
try {
  const savedData = localStorage.getItem("feedback-form-data");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    feedbackData.email = parsedData.email || "";
    feedbackData.message = parsedData.message || "";
    emailField.value = feedbackData.email;
    messageField.value = feedbackData.message;
  }
} catch (err) {
  console.error("Error reading from localStorage:", err);
}

// Handle form submission
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  if (Object.values(feedbackData).some(value => value.trim() === "")) {
    return alert("Please fill in all fields.");
  }

  console.log("Submitted data:", feedbackData);
  localStorage.removeItem('feedback-form-data');
  feedbackForm.reset();
});