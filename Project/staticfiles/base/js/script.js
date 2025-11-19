// =========================== ASSIGN RANDOM IMAGES + HERO ROTATION =========================== //

document.addEventListener("DOMContentLoaded", () => {
    /*-----------------------------------------
       1) Assign random images to subnet cards
    -----------------------------------------*/
    const cards = document.querySelectorAll(".subnet_card");

    cards.forEach((card, index) => {
        const img = card.querySelector(".subnet_image");
        
        // Use modulo to wrap around if index exceeds shuffledImages length
        const imageIndex = index % window.shuffledImages.length;
        img.src = window.shuffledImages[imageIndex];
    });

    /*-----------------------------------------
       2) Hero image rotation every 7 seconds
    -----------------------------------------*/
    const heroImg = document.getElementById("hero-random-image");

    if (heroImg) {
        let currentIndex = 0;

        function changeHeroImage() {
            heroImg.classList.add("fade-out");

            setTimeout(() => {
                heroImg.src = window.subnetImages[currentIndex];
                currentIndex = (currentIndex + 1) % window.subnetImages.length;

                heroImg.classList.remove("fade-out");
            }, 600); // matches CSS transition
        }

        // Start rotation immediately
        changeHeroImage();

        // Change every 7 seconds
        setInterval(changeHeroImage, 7000);
    }
});

// =========================== SMOOTH SCROLL WHEN SUBNETS ARE GENERATED =========================== //

document.addEventListener("DOMContentLoaded", () => {
    const flagEl = document.getElementById("subnet-flag");
    const hasSubnets = parseInt(flagEl.dataset.hasSubnets) > 0;

    // Custom smooth scroll function
    function smoothScrollTo(element, duration = 2000) { // 2000ms = 2 seconds
        const targetPosition = element.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    if (hasSubnets) {
        const subnetSection = document.getElementById("subnets-section");
        if (subnetSection) {
            setTimeout(() => {
                smoothScrollTo(subnetSection, 2000); // Scroll slowly over 2 seconds
            }, 300);
        }
    }
});

// =========================== FORM ERRORS HANDLING =========================== //

document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.querySelector(".calculate_btn");
    const form = document.querySelector(".main_input");
    const ipInput = document.querySelector(".ip_input");
    const subnetInput = document.querySelector(".subnet_input");

    // Create error message container dynamically
    let errorContainer = document.createElement("div");
    errorContainer.classList.add("form_errors");
    form.parentNode.insertBefore(errorContainer, form.nextSibling);

    // Apply styling for right-aligned errors relative to the form
    errorContainer.style.color = "red";
    errorContainer.style.fontSize = "12px";
    errorContainer.style.marginTop = "10px";
    errorContainer.style.textAlign = "right";
    errorContainer.style.display = "block";
    errorContainer.style.width = (form.offsetWidth - 15) + "px"; // match form width
    errorContainer.style.boxSizing = "border-box";

    function isValidCIDR(ip) {
        const cidrRegex = /^(\d{1,3}\.){3}\d{1,3}\/([0-9]|[1-2][0-9]|3[0-2])$/;
        if (!cidrRegex.test(ip)) return false;

        const [addr] = ip.split("/");
        const octets = addr.split(".").map(Number);

        for (let octet of octets) {
            if (octet < 0 || octet > 255) return false;
        }
        return true;
    }

    function getPrefix(ip) {
        return parseInt(ip.split("/")[1], 10);
    }

    form.addEventListener("submit", (e) => {
        const errors = [];
        let valid = true;

        const ipValue = ipInput.value.trim();
        const subnetValue = parseInt(subnetInput.value);

        // Reset styles
        form.classList.remove("error");
        ipInput.style.color = "";
        subnetInput.style.color = "";
        errorContainer.innerHTML = "";

        // Validate IP
        if (!isValidCIDR(ipValue)) {
            valid = false;
            ipInput.style.color = "red";
            errors.push("Invalid IP address or CIDR notation.");
        }

        // Validate number of subnets
        if (!subnetValue || subnetValue < 1) {
            valid = false;
            subnetInput.style.color = "red";
            errors.push("Number of subnets must be at least 1.");
        }

        // Check max allowed subnets for the prefix
        if (isValidCIDR(ipValue) && subnetValue) {
            const prefix = getPrefix(ipValue);
            const maxSubnets = Math.pow(2, 32 - prefix);
            if (subnetValue > maxSubnets) {
                valid = false;
                subnetInput.style.color = "red";
                errors.push(`Number of subnets cannot exceed ${maxSubnets} for the given network.`);
            }
        }

        // Handle errors
        if (!valid) {
            e.preventDefault();
            calculateBtn.classList.add("muted");
            form.classList.add("error");

            // Join all errors in one line separated by a space
            errorContainer.textContent = errors.join(" ");
        } else {
            calculateBtn.classList.remove("muted");
            form.classList.remove("error");
        }
    });

    // Remove error styles on typing
    const removeError = () => {
        calculateBtn.classList.remove("muted");
        form.classList.remove("error");
        ipInput.style.color = "";
        subnetInput.style.color = "";
        errorContainer.innerHTML = "";
    };
    ipInput.addEventListener("input", removeError);
    subnetInput.addEventListener("input", removeError);
});
