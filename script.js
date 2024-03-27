const slider = document.querySelector('.slider');
const length = document.querySelector('.length');

// Function to update numerical value
const updateNumericalValue = () => {
    length.textContent = slider.value;
};

// Set initial numerical value
updateNumericalValue();

// Event listener for slider input
slider.addEventListener('input', () => {
    // Update numerical value when slider value changes
    updateNumericalValue();
});

const includeUppercase = document.querySelector('#upper');
const includeLowercase = document.querySelector('#lower');
const includeNumbers = document.querySelector('#numbers');
const includeSymbols = document.querySelector('#symbols');

const generateButton = document.querySelector('.btn-generate');
const passwordDisplay = document.querySelector('.password');
const copyButton = document.querySelector('.password-copy');

slider.addEventListener('input', () => {
    length.textContent = slider.value;
});

const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+[]{}|;:,.<>?',
};

const createPasswword = (options) => {
    let charset = '';

    if (options.uppercase) {
        charset += characters.uppercase
    }

    if (options.lowercase) {
        charset += characters.lowercase
    }

    if (options.numbers) {
        charset += characters.numbers
    }

    if (options.symbols) {
        charset += characters.symbols
    }

    if (charset.length === 0) {
        alert('Please select at least one character type')
        return '';
    }

    let password = '';
    for (let i = 0; i < options.length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        password += charset.charAt(randomIndex)
    }

    passwordDisplay.textContent = password;
    
    return password;
}

generateButton.addEventListener('click', () => {
    const passwordOptions = {
        length: slider.value,
        uppercase: includeUppercase.checked,
        lowercase: includeLowercase.checked,
        numbers: includeNumbers.checked,
        symbols: includeSymbols.checked,
    };

    const password = createPasswword(passwordOptions)
    passwordDisplay.textContent = password;
})

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordDisplay.textContent)
        .then(() => {
            // Show modal
            document.getElementById('copyModal').style.display = 'block';
            // Hide modal after 2 seconds
            setTimeout(() => {
                document.getElementById('copyModal').style.display = 'none';
            }, 2000);
        })
        .catch(err => {
            console.error('Could not copy password: ', err);
            alert('Failed to copy password. Please try again.');
        });
});

// Close the modal when the user clicks on the close button
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('copyModal').style.display = 'none';
});
