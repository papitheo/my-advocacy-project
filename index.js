//toggle darkmode
let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  const body = document.body;
  body.classList.toggle("dark-mode");
};

// Register a 'click' event listener for the theme button
themeButton.addEventListener("click", toggleDarkMode);

// Count variable to keep track of signatures
let counter = 3; // Assuming you already have 3 signatures

const updateSignatureCount = () => {
  document.getElementById(
    "counter"
  ).textContent = `🖊️ ${counter} people have signed this petition and support this cause.`;
};

const addSignature = () => {
  //get input using the DOM methods
  const fullName = document.getElementById("full-name").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  const country = document.getElementById("country").value;
  const message = document.getElementById("message").value;

  // Create a signature text (format a new signature)
  const signatureText = `🖊️ ${fullName} from ${city} supports this.`;

  //find the signature section on the page using querySelecto
  const signaturesSection = document.querySelector(".signatures");

  // Create a new paragraph element
  const paragraph = document.createElement("p");

  // Set the text content of the paragraph to the signature text
  paragraph.textContent = signatureText;

  // Append the new paragraph to the existing signatures section
  signaturesSection.appendChild(paragraph);

  // Clear the input fields
  document.getElementById("full-name").value = "";
  document.getElementById("city").value = "";
  document.getElementById("email").value = "";
  document.getElementById("country").value = "";
  document.getElementById("message").value = "";

  counter++;
  updateSignatureCount();
};

//Query for sign-now-button
let signNowButton = document.getElementById("sign-now-button");

const validateForm = () => {
  let containsErrors = false;

  var petitionInputs = document.getElementById("sign-petition").elements;
  const email = document.getElementById("email");

  if (!email.value.includes("@")) {
    containsErrors = true;
    email.classList.add("error");
  } else {
    email.classList.remove("error");
  }

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add("error");
    } else {
      petitionInputs[i].classList.remove("error");
    }
  }
  if (containsErrors == false) {
    addSignature();
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
};

signNowButton.addEventListener("click", validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: "2s",
  transitionProperty: "all",
  transitionTimingFunction: "ease",
};

let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer =
      revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
    } else {
      revealableContainers[i].classList.remove("active");
    }
  }
};

window.addEventListener("scroll", reveal);

// Trigger the initial check on page load
document.addEventListener("DOMContentLoaded", reveal);

let reducedMotion = document.getElementById("Reduce-Motion");
let rMotion = true;

const reduceMotion = (event) => {
  rMotion = !rMotion;

  if (event.target.id === "Reduce-Motion") {
    if (rMotion) {
      document.documentElement.style.setProperty("--transition-duration", "0s");
      document.documentElement.style.setProperty("--transition-delay", "0s");
      document.documentElement.style.setProperty(
        "--transition-property",
        "none"
      );
      document.documentElement.style.setProperty(
        "--transition-timing-function",
        "none"
      );
      reducedMotion.textContent = "Disabled Reduce Motion";
    } else {
      document.documentElement.style.setProperty("--transition-duration", "2s");
      document.documentElement.style.setProperty("--transition-delay", "0s");
      document.documentElement.style.setProperty(
        "--transition-property",
        "all"
      );
      document.documentElement.style.setProperty(
        "--transition-timing-function",
        "ease"
      );
      reducedMotion.textContent = "Enabled Reduce Motion";
    }
  }
};

document.addEventListener("DOMContentLoaded", reduceMotion);
document.body.addEventListener("click", reduceMotion);
