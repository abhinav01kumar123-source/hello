// 1. SOS Geolocation Handler
function sendSOS() {
  const status = document.getElementById('sosStatus');
  status.style.color = '#dc3545';
  status.innerText = "Locating device...";

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        status.style.color = '#198754';
        status.innerText = `🚨 SOS sent! Coords: [${lat}, ${lon}]. Medical team dispatched.`;
      },
      () => {
        status.style.color = '#198754';
        status.innerText = "🚨 SOS sent! Campus emergency team has been notified.";
      }
    );
  } else {
    status.innerText = "🚨 Emergency alert triggered!";
  }
}

// 2. Booking Form Handler
function handleBooking(event) {
  event.preventDefault();
  const name = document.getElementById('patientName').value;
  const dept = document.getElementById('department').value;
  const time = document.getElementById('slotTime').value;

  const status = document.getElementById('bookingStatus');
  status.style.color = '#198754';
  status.innerText = `Appointment booked for ${name} (${dept}) at ${time}!`;
  event.target.reset();
}

// 3. Mental Health Chat Handler
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  const chatBox = document.getElementById('chatBox');

  // Display user message
  const userMsg = document.createElement('div');
  userMsg.className = 'msg user';
  userMsg.innerText = text;
  chatBox.appendChild(userMsg);

  input.value = '';

  // Display bot response
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'msg bot';

    const lower = text.toLowerCase();
    if (lower.includes('stress') || lower.includes('anxious') || lower.includes('depressed')) {
      botMsg.innerText = "It sounds like you're carrying a heavy load right now. Take a deep breath. Would you like a guided relaxation tip or to connect with an on-campus counselor?";
    } else {
      botMsg.innerText = "Thank you for sharing. Remember to stay hydrated, take breaks, and reach out to our team whenever you need support.";
    }

    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 600);
}