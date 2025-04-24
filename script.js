/* JavaScript for index.html header */
if (window.location.pathname.includes('index.html')) {
    const header = document.getElementById('header');
    if (header) {
        let showHeaderTimeout;
        function showHeaderOnScroll() {
            if (window.scrollY > 50) {
                header.classList.add('show');
            } else if (window.scrollY <= 0) {
                header.classList.remove('show');
            }
        }
       //  comment the mouse event
        //function showHeaderOnMousemove(event) {
        //    if (event.clientY <= 50) {
        //         header.classList.add('show');
        //        clearTimeout(showHeaderTimeout);
        //    } else if (window.scrollY <= 50) {
        //        showHeaderTimeout = setTimeout(() => {
        //             header.classList.remove('show');
        //        }, 100);
        //   }
        //}

        window.addEventListener('scroll', showHeaderOnScroll);
       // window.addEventListener('mousemove', showHeaderOnMousemove);    
        const getStartedButtons = document.querySelectorAll('.get-started-button');
        if (getStartedButtons) {
           getStartedButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                   window.location.href = "pages/auth/signup.html"
                });
           });
        }
    }
}
