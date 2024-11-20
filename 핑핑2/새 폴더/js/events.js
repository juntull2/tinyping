document.addEventListener('DOMContentLoaded', function() {
    // Close button functionality
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            window.close();
        });
    }

    // Tab navigation
    const navButtons = document.querySelectorAll('.nav-button');
    const eventLists = document.querySelectorAll('.events-list');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and lists
            navButtons.forEach(btn => btn.classList.remove('active'));
            eventLists.forEach(list => list.classList.remove('active'));

            // Add active class to clicked button and corresponding list
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Event card click handling
    const eventButtons = document.querySelectorAll('.event-button');
    eventButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('h3').textContent;
            const eventPeriod = eventCard.querySelector('.event-period').textContent;

            // Here you would typically navigate to the event detail page
            // For now, we'll just show an alert
            alert(`${eventTitle}\n기간: ${eventPeriod}\n\n상세 페이지로 이동합니다.`);
        });
    });

    // Optional: Add animation when cards appear
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});