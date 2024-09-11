// Function to set minimum date for date input
function setMinDate() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const minDate = yyyy + '-' + mm + '-' + dd;
    dateInput.min = minDate;
}

// Function to populate time options
function populateTimeOptions() {
    const timeSelect = document.getElementById('time');
    const startTime = 8 * 60; // 8:00 AM in minutes
    const endTime = 18 * 60; // 6:00 PM in minutes
    const increment = 15; // 15-minute increments

    // Clear existing options
    timeSelect.innerHTML = '<option value="">Select a time</option>';

    for (let i = startTime; i <= endTime; i += increment) {
        const hours = Math.floor(i / 60);
        const minutes = i % 60;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;
        
        const option = document.createElement('option');
        option.value = timeString;
        option.textContent = timeString;
        timeSelect.appendChild(option);
    }
}

// Function to handle date change
function handleDateChange() {
    const dateInput = document.getElementById('date');
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    
    // Reset time options
    populateTimeOptions();
    
    // If selected date is today, remove past time options
    if (selectedDate.toDateString() === today.toDateString()) {
        const timeSelect = document.getElementById('time');
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();
        
        Array.from(timeSelect.options).forEach(option => {
            if (option.value !== '') {
                const [time, period] = option.value.split(' ');
                let [hours, minutes] = time.split(':');
                hours = parseInt(hours);
                if (period === 'PM' && hours !== 12) hours += 12;
                if (period === 'AM' && hours === 12) hours = 0;
                
                if (hours < currentHour || (hours === currentHour && parseInt(minutes) <= currentMinute)) {
                    option.disabled = true;
                }
            }
        });
    }
}

// Call functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setMinDate();
    populateTimeOptions();
    
    // Add event listener for date change
    document.getElementById('date').addEventListener('change', handleDateChange);
});

// Form submission handler
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    if (name === '' || email === '' || phone === '' || date === '' || time === '' || service === '') {
        alert('Please fill out all required fields.');
    } else {
        alert(`Thank you for booking an appointment, ${name}. We'll confirm your ${service} appointment for ${date} at ${time} shortly.`);
        // Reset the form
        document.getElementById('appointmentForm').reset();
        // Reset time options after form submission
        populateTimeOptions();
    }
});