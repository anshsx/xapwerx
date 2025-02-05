const API_URL = "https://rembgx-production.up.railway.app/remove-bg/"; // Replace with your actual API URL

async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    if (fileInput.files.length === 0) {
        alert("Please select an image.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        // Log response status
        console.log("Response Status:", response.status);
        console.log("Response Status Text:", response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error response:", errorText);
            alert("Error processing image: " + errorText);
            return;
        }

        const result = await response.blob(); // Process the blob
        const imageUrl = URL.createObjectURL(result); // Convert blob to image URL

        document.getElementById("processedImage").src = imageUrl; // Set the image source
        document.getElementById("downloadLink").href = imageUrl; // Set download link
        document.getElementById("downloadLink").style.display = "block"; // Show download link
        document.getElementById("output").style.display = "block"; // Show processed image section

    } catch (error) {
        // Catch network errors (e.g., fetch, CORS, etc.)
        console.error("Network Error:", error);
        alert("Error during the request. Please check your network connection.");
    }
}
