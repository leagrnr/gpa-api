const socket = io();

// Écoute les messages du serveur
socket.on("message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("messages").appendChild(li);
});

// Fonction pour envoyer un message
function sendMessage() {
  const input = document.getElementById("message");
  const message = input.value;
  socket.emit("message", message); // Envoie du message au serveur
  input.value = ""; // Efface le champ après l'envoi
}
