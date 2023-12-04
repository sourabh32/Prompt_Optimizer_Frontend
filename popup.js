const inputString = document.getElementById("promptInput");
const btn = document.getElementById("submitPrompt");
const res = document.getElementById("response");
const loadingMessage = document.getElementById("loadingMessage");

btn.addEventListener("click", () => {
  if (inputString.value.length > 0) {
    
    loadingMessage.textContent = "Loading...";

    const body = {
      query: inputString.value,
    };

    fetch("https://extension-backend-0oc8.onrender.com/optimize", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        displayList(response);
        loadingMessage.textContent = "click to copy any prompt"; 
      })
      .catch((err) => {
        console.error(err);
        loadingMessage.textContent = "Error occurred. Please try again.";
      });
  }
});

function displayList(items) {
  res.innerHTML = '';

  const ul = document.createElement('ul');

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;

    li.addEventListener('click', () => {
      copyToClipboard(item.text);
    });

    ul.appendChild(li);
  });

  res.appendChild(ul);
}

function copyToClipboard(text) {
  const copyInput = document.createElement('textarea');
  document.body.appendChild(copyInput);

  copyInput.value = text;
  copyInput.select();
  document.execCommand("copy");

  document.body.removeChild(copyInput);

  alert("Text copied to clipboard: " + text);
}





