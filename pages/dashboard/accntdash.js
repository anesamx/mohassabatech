/* JavaScript from accntdash.js */
if (!window.location.pathname.includes('auth.html')){
document.addEventListener('DOMContentLoaded', function() {


    const dashboardLinks = document.querySelectorAll('.dashboard-link');
    const dashboardTitle = document.getElementById('dashboard-title');
    const dashboardContent = document.getElementById('dashboard-content');
    const contentSections = {
        'profile-content': document.getElementById('profile-content'),
        'applications-content': document.getElementById('applications-content'),
        'messages-content': document.getElementById('messages-content'),
        'settings-content': document.getElementById('settings-content')
    };

    // Initially show the profile content and set the active link
    dashboardContent.classList.add('hidden');
    contentSections['profile-content'].classList.remove('hidden');
    dashboardTitle.textContent = 'My Profile';
    const profileLink = document.querySelector('a[data-content="profile-content"]');
    if (profileLink) {
        profileLink.classList.add('active-link');
    }

    dashboardLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetContentId = this.getAttribute('data-content');

            dashboardLinks.forEach(lnk => lnk.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });
});
}