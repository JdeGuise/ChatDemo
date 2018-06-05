// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var handle = document.getElementById('handle'),
	message = document.getElementById('message'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

// Emit events

btn.addEventListener('click', function() {
	if(message.value !== '' && handle.value !== '') {
		socket.emit('chat', {
			message: message.value,
			handle: handle.value
		});
	} else {
		console.log('Error: handle or message was empty');
	}
});

message.addEventListener('keypress', function() {
	socket.emit('typing', handle.value);
});


// Listen for events
socket.on('chat', function(data) {
	feedback.innerHTML = "";
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data) {
	feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});