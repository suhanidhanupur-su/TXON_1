/**
 * Suhani Kumari - Developer Portfolio Script
 * Pure Vanilla JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. Dynamic Year in Footer
    // ----------------------------------------------------
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // ----------------------------------------------------
    // 2. Navbar Scroll Effect
    // ----------------------------------------------------
    const navbarWrapper = document.querySelector(".navbar-wrapper");
    const handleScrollNavbar = () => {
        if (!navbarWrapper) return;
        if (window.scrollY > 30) {
            navbarWrapper.classList.add("scrolled");
        } else {
            navbarWrapper.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScrollNavbar, { passive: true });
    handleScrollNavbar();

    // ----------------------------------------------------
    // 3. Mobile Navigation Menu Toggle
    // ----------------------------------------------------
    const mobileToggle = document.getElementById("mobileToggle");
    const navLinks = document.getElementById("navLinks");
    const navLinkItems = document.querySelectorAll(".nav-link");

    const toggleMenu = (open) => {
        const isOpen = open !== undefined ? open : !navLinks.classList.contains("open");
        navLinks.classList.toggle("open", isOpen);
        mobileToggle.classList.toggle("open", isOpen);
        mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", () => {
            toggleMenu();
        });

        // Close mobile menu on clicking any navigation link
        navLinkItems.forEach(link => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("open")) {
                    toggleMenu(false);
                }
            });
        });

        // Close on clicking outside navbar
        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("open") &&
                !navbarWrapper.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    // ----------------------------------------------------
    // 4. Smooth Scrolling with Offset for Fixed Header
    // ----------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ----------------------------------------------------
    // 5. Active Section Indication on Scroll
    // ----------------------------------------------------
    const sections = document.querySelectorAll("section[id]");
    const updateActiveNavLink = () => {
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };
    window.addEventListener("scroll", updateActiveNavLink, { passive: true });
    updateActiveNavLink();

    // ----------------------------------------------------
    // 6. Lightweight Hero Typewriter Effect
    // ----------------------------------------------------
    const typedTextEl = document.getElementById("typedText");
    const phrase = "Building Digital Experiences with Code.";

    if (typedTextEl) {
        typedTextEl.textContent = "";
        let charIndex = 0;
        const typeSpeed = 55;

        const typeChar = () => {
            if (charIndex < phrase.length) {
                typedTextEl.textContent += phrase.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typeSpeed);
            }
        };

        // Slight initial delay before typing starts
        setTimeout(typeChar, 350);
    }

    // ----------------------------------------------------
    // 7. Scroll Reveal Animations (Intersection Observer)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(el => el.classList.add("active"));
    }

    // ----------------------------------------------------
    // 8. Contact Form Handling & Validation
    // ----------------------------------------------------
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submitBtn");
    const submitText = submitBtn ? submitBtn.querySelector(".btn-submit-text") : null;
    const responseBox = document.getElementById("response");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // Email validation regex
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Helper to display response status
    const displayFeedback = (type, message) => {
        if (!responseBox) return;
        responseBox.className = `response-message show ${type}`;
        responseBox.textContent = message;

        if (type === "success") {
            setTimeout(() => {
                responseBox.className = "response-message";
                responseBox.textContent = "";
            }, 6000);
        }
    };

    // Clear individual field errors on user input
    [nameInput, emailInput, messageInput].forEach(input => {
        if (!input) return;
        input.addEventListener("input", () => {
            input.classList.remove("input-error");
            if (input === nameInput && nameError) nameError.textContent = "";
            if (input === emailInput && emailError) emailError.textContent = "";
            if (input === messageInput && messageError) messageError.textContent = "";
            if (responseBox) {
                responseBox.className = "response-message";
                responseBox.textContent = "";
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Clear previous states
            let hasError = false;
            [nameInput, emailInput, messageInput].forEach(inp => inp.classList.remove("input-error"));
            if (nameError) nameError.textContent = "";
            if (emailError) emailError.textContent = "";
            if (messageError) messageError.textContent = "";
            if (responseBox) {
                responseBox.className = "response-message";
                responseBox.textContent = "";
            }

            const nameVal = nameInput ? nameInput.value.trim() : "";
            const emailVal = emailInput ? emailInput.value.trim() : "";
            const messageVal = messageInput ? messageInput.value.trim() : "";

            // Validate Name
            if (!nameVal) {
                hasError = true;
                nameInput.classList.add("input-error");
                if (nameError) nameError.textContent = "Please enter your name.";
            } else if (nameVal.length < 2) {
                hasError = true;
                nameInput.classList.add("input-error");
                if (nameError) nameError.textContent = "Name must be at least 2 characters.";
            }

            // Validate Email
            if (!emailVal) {
                hasError = true;
                emailInput.classList.add("input-error");
                if (emailError) emailError.textContent = "Please enter your email address.";
            } else if (!isValidEmail(emailVal)) {
                hasError = true;
                emailInput.classList.add("input-error");
                if (emailError) emailError.textContent = "Please enter a valid email (e.g., name@example.com).";
            }

            // Validate Message
            if (!messageVal) {
                hasError = true;
                messageInput.classList.add("input-error");
                if (messageError) messageError.textContent = "Please enter your message.";
            } else if (messageVal.length < 5) {
                hasError = true;
                messageInput.classList.add("input-error");
                if (messageError) messageError.textContent = "Message must be at least 5 characters.";
            }

            if (hasError) {
                displayFeedback("error", "Please correct the highlighted fields above.");
                return;
            }

            // Prepare payload
            const payload = {
                name: nameVal,
                email: emailVal,
                message: messageVal
            };

            // Loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add("loading");
            }
            if (submitText) {
                submitText.textContent = "Sending...";
            }

            try {
                const response = await fetch("/send-message", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json().catch(() => null);

                if (response.ok && data && data.success) {
                    displayFeedback("success", data.message || "Thank you! Your message has been received.");
                    contactForm.reset();
                } else {
                    const errorMsg = (data && data.message) ? data.message : "Failed to send message. Please try again.";
                    displayFeedback("error", errorMsg);
                }
            } catch (err) {
                console.error("Contact Form Error:", err);
                displayFeedback("error", "Unable to connect to the server. Please check your network and try again.");
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove("loading");
                }
                if (submitText) {
                    submitText.textContent = "Send Message";
                }
            }
        });
    }
});
