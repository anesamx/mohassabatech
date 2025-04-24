document.addEventListener('DOMContentLoaded', function() {
    
    


    const dashboardLinks = document.querySelectorAll('.dashboard-link');
    const dashboardTitle = document.getElementById('dashboard-title');
    const dashboardContent = document.getElementById('dashboard-content');
    const contentSections = {
        'overview-content': document.getElementById('overview-content'),
        'accountants-content': document.getElementById('accountants-content'),
        'companies-content': document.getElementById('companies-content'),
        'managers-content': document.getElementById('managers-content'),
        'accountant-approval-content': document.getElementById('accountant-approval-content'),
        'announcements-content': document.getElementById('announcements-content'),
        'audit-log-content': document.getElementById('audit-log-content'),
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
                dashboardTitle.textContent = 'Admin Dashboard';
            }
        });
    });

    // Initially set active link based on URL hash (optional)
    if (window.location.hash) {
        const hashTarget = window.location.hash.substring(1);
        const linkToActivate = document.querySelector(`a[href="#${hashTarget}"]`);
        if (linkToActivate && linkToActivate.classList.contains('dashboard-link')) {
            linkToActivate.click(); // Trigger the click event
        }
    }
});