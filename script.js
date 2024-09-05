document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name === '' || email === '' || message === '') {
        alert('Please fill out all fields.');
    } else {
        alert(`Thank you for your message, ${name}. We'll get back to you soon.`);
        // Reset the form
        document.getElementById('contactForm').reset();
    }
});
