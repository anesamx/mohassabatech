function initializeLanguage() {
    fetch('../../locales/en.json')
        .then(response => response.json())
        .then(englishTranslations => {
            fetch('../../locales/fr.json')
                .then(response => response.json())
                .then(frenchTranslations => {
                    fetch('../../locales/ar.json')
                        .then(response => response.json())
                        .then(arabicTranslations => {
                            i18next.init({
                                lng: localStorage.getItem('selectedLanguage') || 'en',
                                resources: {
                                    en: {
                                        translation: englishTranslations
                                    },
                                    fr: {
                                        translation: frenchTranslations
                                    },
                                    ar: {
                                        translation: arabicTranslations
                                    }
                                }
                            }).then(function () {
                                updateContent();
                                const languageSwitcher = document.getElementById('language-switcher');
                                if (languageSwitcher) {
                                    languageSwitcher.value = i18next.language;
                                    languageSwitcher.addEventListener('change', function () {
                                        const selectedLanguage = languageSwitcher.value;
                                        i18next.changeLanguage(selectedLanguage).then(() => {
                                            updateContent();
                                            localStorage.setItem('selectedLanguage', selectedLanguage);
                                        });
                                    });
                                }
                            });

                            function updateContent() {
                                document.querySelectorAll('[data-i18n]').forEach(function (element) {
                                    element.textContent = i18next.t(element.dataset.i18n);
                                });
                                if (i18next.language == "ar") {
                                    document.body.classList.add('arabic-layout');
                                } else {
                                    document.body.classList.remove('arabic-layout');
                                }
                            }
                        });
                });
        });
}
initializeLanguage();