function generateMessages() {
  let names = document.getElementById("names").value.split("\n");
  let messageField = document.getElementById("message");
  let currentMessage = messageField.value;
  let baseLink = document.getElementById("link-undangan").value;

  return names.map((name) => {
    let trimmedName = name.trim();

    let boldTrimmedName = `*${trimmedName}*`;

    let personalizedLink = `${baseLink}?to=${encodeURIComponent(trimmedName)}`;
    let personalizedMessage = currentMessage
      .replace(/\[nama\]/g, boldTrimmedName || "[nama]")
      .replace(/\[link-undangan\]/g, personalizedLink || "[link-undangan]");
    return {
      name: trimmedName,
      message: personalizedMessage,
    };
  });
}

function generateTable() {
  let messages = generateMessages();
  let table = document.getElementById("messageTable");
  let tableTitle = document.querySelector(".table-title");
  let tbody = table.querySelector("tbody");

  // Clear previous rows
  tbody.innerHTML = "";

  messages.forEach((entry, index) => {
    let row = document.createElement("tr");

    let cellNo = document.createElement("td");
    cellNo.textContent = index + 1;
    row.appendChild(cellNo);

    let cellName = document.createElement("td");
    cellName.textContent = entry.name;
    row.appendChild(cellName);

    let cellAction = document.createElement("td");

    // Send Button
    let sendButton = document.createElement("button");
    sendButton.textContent = "Kirim Via Whatsapp";
    sendButton.className = "action-button";
    sendButton.onclick = function () {
      sendToWhatsapp(entry.message);
    };
    cellAction.appendChild(sendButton);

    // Copy Full Text Button
    let copyButton = document.createElement("button");
    copyButton.textContent = "Copy Full Text";
    copyButton.className = "copy-button action-button";
    copyButton.onclick = function () {
      copyToClipboard(entry.message);
    };
    cellAction.appendChild(copyButton);

    row.appendChild(cellAction);
    tbody.appendChild(row);
  });

  // Show the table
  table.style.display = "table";
  tableTitle.style.display = "inline";
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Message copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

function sendToWhatsapp(message) {
  let linkUndangan = document.getElementById("link-undangan").value;

  let url = "https://wa.me/?text=" + encodeURIComponent(message);

  // console.log(url, "url");

  // Uncomment the line below to open the WhatsApp URL
  window.open(url, "_blank").focus();
}
