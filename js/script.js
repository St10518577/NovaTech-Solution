
// 1. SERVICE SEARCH AND FILTERING


const serviceSearch = document.getElementById("serviceSearch");

if (serviceSearch) {

    const serviceCards = document.querySelectorAll(".service-card");
    const noResults = document.getElementById("noResults");

    serviceSearch.addEventListener("input", function () {

        const searchValue = serviceSearch.value.toLowerCase().trim();

        let visibleServices = 0;

        serviceCards.forEach(function (card) {

            const serviceName = card.textContent.toLowerCase();

            if (serviceName.includes(searchValue)) {

                card.style.display = "";
                visibleServices++;

            } else {

                card.style.display = "none";

            }

        });

        if (noResults) {

            if (visibleServices === 0) {

                noResults.textContent = "No matching services found.";

            } else {

                noResults.textContent = "";

            }

        }

    });

}



// 2. INTERACTIVE IMAGE GALLERY (LIGHTBOX)


const serviceImages = document.querySelectorAll(".service-image");

serviceImages.forEach(function (image) {

    image.style.cursor = "pointer";

    image.addEventListener("click", function () {

        // Create lightbox container
        const lightbox = document.createElement("div");

        lightbox.className = "lightbox";

        // Create enlarged image
        const enlargedImage = document.createElement("img");

        enlargedImage.src = image.src;
        enlargedImage.alt = image.alt;

        // Create close button
        const closeButton = document.createElement("button");

        closeButton.textContent = "×";
        closeButton.className = "lightbox-close";

        closeButton.setAttribute("aria-label", "Close image");

        // Add image and button to lightbox
        lightbox.appendChild(closeButton);
        lightbox.appendChild(enlargedImage);

        // Display lightbox
        document.body.appendChild(lightbox);

        // Close lightbox function
        function closeLightbox() {

            lightbox.remove();

            document.removeEventListener("keydown", handleEscape);

        }

        // Close using button
        closeButton.addEventListener("click", closeLightbox);

        // Close when clicking outside image
        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {

                closeLightbox();

            }

        });

        // Close using Escape key
        function handleEscape(event) {

            if (event.key === "Escape") {

                closeLightbox();

            }

        }

        document.addEventListener("keydown", handleEscape);

    });

});

// 3. ENQUIRY FORM VALIDATION


const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (event) {

        // Prevent default form submission
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const service = document.getElementById("service").value;

        const message = document.getElementById("message").value.trim();

        const response = document.getElementById("enquiryResponse");

        // Clear previous messages
        response.textContent = "";

        // Check required fields
        if (!name || !email || !phone || !service || !message) {

            response.textContent = "Please complete all required fields.";

            response.style.color = "red";

            return;

        }

        // Validate name
        if (name.length < 2) {

            response.textContent = "Please enter a valid full name.";

            response.style.color = "red";

            return;

        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            response.textContent = "Please enter a valid email address.";

            response.style.color = "red";

            return;

        }

        // Validate phone number
        const phonePattern = /^[0-9+\s()-]{7,20}$/;

        if (!phonePattern.test(phone)) {

            response.textContent = "Please enter a valid phone number.";

            response.style.color = "red";

            return;

        }

        // Validate message length
        if (message.length < 10) {

            response.textContent =
                "Your enquiry must contain at least 10 characters.";

            response.style.color = "red";

            return;

        }

        // Display successful validation message
        response.textContent =
            "Thank you, " + name +
            "! Your " + service.replaceAll("-", " ") +
            " enquiry has passed validation. This is a demonstration; your enquiry has not been sent.";

        response.style.color = "green";

        // Clear form after successful validation
        enquiryForm.reset();

    });

}
// CONTACT FORM WITH AJAX EMAIL SUBMISSION
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const phone = document.getElementById("contactPhone").value.trim();
        const messageType = document.getElementById("messageType").value;
        const message = document.getElementById("contactMessage").value.trim();
        const responseMessage = document.getElementById("contactResponse");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9+\s()-]{7,20}$/;

        // Validate the form
        if (name.length < 2) {
            responseMessage.textContent = "Please enter a valid name.";
            return;
        }

        if (!emailPattern.test(email)) {
            responseMessage.textContent = "Please enter a valid email address.";
            return;
        }

        if (!phonePattern.test(phone)) {
            responseMessage.textContent = "Please enter a valid phone number.";
            return;
        }

        if (messageType === "") {
            responseMessage.textContent = "Please select a message type.";
            return;
        }

        if (message.length < 10) {
            responseMessage.textContent = "Your message must contain at least 10 characters.";
            return;
        }

        responseMessage.textContent = "Sending your message...";

        // Prepare the email data
        const formData = {
            name: name,
            email: email,
            phone: phone,
            messageType: messageType,
            message: message,
            _subject: "New NovaTech Contact Enquiry",
            _replyto: email
        };

        try {
            const result = await fetch(
                "https://formsubmit.co/ajax/Sibiyalwazi49@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await result.json();

            if (String(data.success) === "true") {
                responseMessage.textContent =
                    "Thank you! Your message has been submitted successfully.";

                contactForm.reset();
            } else {
                responseMessage.textContent =
                    "Submission failed: " + (data.message || "Please try again.");
            }

        } catch (error) {
            responseMessage.textContent =
                "Unable to send your message. Please check your internet connection and try again.";
        }
    });
}



    

