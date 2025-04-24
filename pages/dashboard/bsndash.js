/* JavaScript from bsndash.js */
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');    
    let showHeaderTimeout;

    function showHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('show');
        } else {
            header.classList.remove('show');
        }
    }

    function showHeaderOnMousemove(event) {
        if (event.clientY <= 50) {
            header.classList.add('show');
            clearTimeout(showHeaderTimeout);
        } else if (window.scrollY <= 50) {
            showHeaderTimeout = setTimeout(() => {
                header.classList.remove('show');
            }, 100);
        }
    }

    window.addEventListener('scroll', showHeaderOnScroll);
    window.addEventListener('mousemove', showHeaderOnMousemove);


    const dashboardLinks = document.querySelectorAll('.dashboard-link');
    const dashboardTitle = document.getElementById('dashboard-title');
    const dashboardContent = document.getElementById('dashboard-content');
    const contentSections = {
        'overview-content': document.getElementById('overview-content'),
        'jobs-content': document.getElementById('jobs-content'),
        'applications-content': document.getElementById('applications-content'),
        'candidates-content': document.getElementById('candidates-content'),
        'company-content': document.getElementById('company-content'),
        'settings-content': document.getElementById('settings-content')
    };

    // Initially show the overview content and set the active link
    dashboardContent.classList.add('hidden');
    contentSections['overview-content'].classList.remove('hidden');
    dashboardTitle.textContent = 'Overview';
    document.querySelector('a[data-content="overview-content"]').classList.add('active-link');

    dashboardLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetContentId = this.getAttribute('data-content');

            // Remove active class from all links
            dashboardLinks.forEach(lnk => lnk.classList.remove('active-link'));

            // Add active class to the clicked link
            this.classList.add('active-link');

            // Hide the default dashboard content
            dashboardContent.classList.add('hidden');

            // Hide all content sections
            Object.values(contentSections).forEach(section => {
                section.classList.add('hidden');
            });

            // Show the target content section
            if (contentSections[targetContentId]) {
                contentSections[targetContentId].classList.remove('hidden');
                dashboardTitle.textContent = this.textContent; // Update the title
            } else {
                // If no specific content, show the default and reset title
                dashboardContent.classList.remove('hidden');
                dashboardTitle.textContent = 'Company Dashboard';
            }
        });
    });

    // Initially set active link based on URL hash
    if (window.location.hash) {
        const hashTarget = window.location.hash.substring(1);
        const linkToActivate = document.querySelector(`a[href="#${hashTarget}"]`);
        if (linkToActivate && linkToActivate.classList.contains('dashboard-link')) {
            linkToActivate.click(); // Trigger the click event to load content and set active class
        }
    }

});