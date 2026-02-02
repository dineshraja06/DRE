document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LANGUAGE TOGGLE LOGIC ---
    let currentLang = 'en';

    // We use window.toggleLanguage so the HTML onclick can see it
    window.toggleLanguage = function() {
        const langBtn = document.getElementById('langBtn');
        
        // 1. Toggle the language variable
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        
        // 2. Find every element that has translation data and swap the text
        const translatable = document.querySelectorAll('[data-en]');
        translatable.forEach(el => {
            el.innerText = el.getAttribute(`data-${currentLang}`);
        });

        // 3. UI Updates: Keep layout fixed on the left (LTR)
        if (currentLang === 'ar') {
            langBtn.innerText = 'English';
            document.body.classList.add('arabic-font');
            // This is the most important part you asked for:
            // Keeps the "Booking Open" card on the left side
            document.documentElement.setAttribute('dir', 'ltr'); 
        } else {
            langBtn.innerText = 'العربية';
            document.body.classList.remove('arabic-font');
            document.documentElement.setAttribute('dir', 'ltr');
        }
    };

    // --- 2. AUTOMATIC BACKGROUND SWIPE ---
    let slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function startSlider() {
        if(slides.length > 0) { // Check if slides exist
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 4000);
        }
    }
    
    startSlider();

    // --- 3. MODAL CONTROLS ---
    window.openModal = function() {
        document.getElementById('brochureModal').style.display = 'flex';
    };

    window.closeModal = function() {
        document.getElementById('brochureModal').style.display = 'none';
    };

    window.onclick = function(event) {
        let modal = document.getElementById('brochureModal');
        if (event.target == modal) {
            closeModal();
        }
    };

    // --- 4. FORM & DOWNLOAD LOGIC ---
        const brochureForm = document.getElementById('brochureForm');

        if (brochureForm) {
            brochureForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents page reload

        // Get user data (you can send this to your email/database later)
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;

        alert(currentLang === 'en' ? "Thank you " + name + "! Your download is starting." : "شكراً لك " + name + "! يبدأ التحميل الآن.");

        // Trigger the hidden download link
        document.getElementById('downloadLink').click();

        // Close the modal
        closeModal();
        
        // Reset form
        brochureForm.reset();
    });
}
});