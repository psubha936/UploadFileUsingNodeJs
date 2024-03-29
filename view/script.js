function previewImage(event) {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
    const img = document.createElement('img');
    img.src = reader.result;
    img.style.maxWidth = '200px';
    preview.appendChild(img);
    }
    reader.readAsDataURL(file);
    }
    document.getElementById('contactForm').addEventListener('submit',
   submitForm);
   function submitForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    fetch('/submit-form', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        console.log(result);
        // Handle success, e.g., show a success message to the user
        alert("Success: " + result); // Show success message in alert
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors, e.g., show an error message to the user
        alert("Error: " + error.message); // Show error message in alert
    });
}

       async function fetchData() {
        const response = await fetch('/fetch-data');
        const data = await response.json();
       
        // Now you can use this data to update your frontend
         // For example, you could create a new div for each item and append it to the body
data.forEach(item => {
const div = document.createElement('div');
div.textContent = JSON.stringify(item);
document.body.appendChild(div);
});
console.log("data get",data);
}
fetchData(); 