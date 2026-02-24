
window.addEventListener("load", function () {
    const hero = document.querySelector(".fade-in");

    if (hero) {
        hero.classList.remove("show");
        setTimeout(() => {
            hero.classList.add("show");
        }, 100);
    }
});


const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

if (form) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const nameRegex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]+(\s[A-ZČĆŽŠĐ][a-zčćžšđ]+)+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener("input", () => validateField(input));
    });

    function validateField(input) {
        const error = input.parentElement.querySelector(".error");
        error.style.opacity = 0;
        input.style.borderColor = "#ccc";

        let message = "";

        if (input === nameInput && !nameRegex.test(input.value.trim())) {
            message = "Unesite ime i prezime (npr. Marko Marković)";
        }
        if (input === emailInput && !emailRegex.test(input.value.trim())) {
            message = "Unesite ispravan email";
        }
        if (input === subjectInput && input.value.trim().length < 3) {
            message = "Predmet mora imati bar 3 karaktera";
        }
        if (input === messageInput && input.value.trim().length < 10) {
            message = "Poruka mora imati bar 10 karaktera";
        }

        if (message) {
            error.textContent = message;
            error.style.opacity = 1;
            input.style.borderColor = "red";
            return false;
        } else {
            error.textContent = "";
            input.style.borderColor = "green";
            return true;
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;

        successMessage.textContent = "";
        successMessage.style.opacity = 0;

        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            if (!validateField(input)) isValid = false;
        });

        if (isValid) {
            successMessage.style.color = "green";
            successMessage.textContent = "Poruka je uspešno poslata!";
            successMessage.style.opacity = 1;

            form.reset();
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                input.style.borderColor = "#ccc";
            });
        }
    });
}


const filter = document.getElementById("model-filter");
const modelCards = document.querySelectorAll(".model-card");

if (filter && modelCards.length > 0) {
    filter.addEventListener("change", function() {
        const value = this.value; 

        modelCards.forEach(card => {
            if (value === "all" || card.classList.contains(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const moreButtons = document.querySelectorAll(".more-btn");

    moreButtons.forEach(button => {
        button.addEventListener("click", function(e){
            e.preventDefault();  

            const card = this.closest(".model-card");

           
            document.querySelectorAll(".model-card").forEach(c => {
                if(c !== card) {
                    c.classList.remove("show-more");
                }
            });

            
            card.classList.toggle("show-more");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.querySelector(".gallery-grid");

    
    const images = [
        { src: "Img/slika20.jpg", alt: "Mercedes GLC" },
        { src: "Img/slika6.jpg", alt: "Mercedes E-Class" },
        { src: "Img/slika16.jpg", alt: "Mercedes AMG GT" },
        { src: "Img/slika17.jpg", alt: "Mercedes GLE" },
        { src: "Img/slika19.jpg", alt: "Mercedes S-Class" },
        { src: "Img/slika18.jpg", alt: "Mercedes SL" }
    ];

    
    images.forEach(image => {
        const link = document.createElement("a");
        link.href = "#";

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt;

        link?.appendChild(img);
        galleryGrid?.appendChild(link);
    });
});


const testDriveModal = document.getElementById("testDriveModal");
const testDriveButtons = document.querySelectorAll(".test-drive-btn");
const testDriveForm = document.getElementById("testDriveForm");
const tdMessage = document.getElementById("tdMessage");

if (testDriveModal && testDriveForm) {

    const closeBtn = testDriveModal.querySelector(".close-btn");

   
    testDriveButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            testDriveModal.classList.add("show");
            tdMessage.textContent = "";
            testDriveForm.reset();
        });
    });

    
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            testDriveModal.classList.remove("show");
        });
    }

    
    window.addEventListener("click", (e) => {
        if (e.target === testDriveModal) {
            testDriveModal.classList.remove("show");
        }
    });

    
    testDriveForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("tdName").value.trim();
        const email = document.getElementById("tdEmail").value.trim();
        const date = document.getElementById("tdDate").value;
        const model = document.getElementById("tdModel").value;

        let errors = [];

        const nameRegex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]+(\s[A-ZČĆŽŠĐ][a-zčćžšđ]+)+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(name)) errors.push("Unesite ime i prezime (npr. Marko Marković).");
        if (!emailRegex.test(email)) errors.push("Unesite ispravan email.");
        if (!date) errors.push("Izaberite datum test vožnje.");
        if (!model) errors.push("Izaberite model automobila.");

        if (errors.length > 0) {
            tdMessage.style.color = "red";
            tdMessage.innerHTML = errors.join("<br>");
        } else {
            tdMessage.style.color = "green";
            tdMessage.textContent = `Zahtev za test vožnju uspešno poslat! Hvala, ${name}.`;
            testDriveForm.reset();
        }
    });
}


const tdDateInput = document.getElementById("tdDate");

if(tdDateInput){
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    
    tdDateInput.min = `${yyyy}-${mm}-${dd}`;
}