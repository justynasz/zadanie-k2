const Main = function() {
    const main = document.querySelector('[data-js="main"]');
    const mainContainer = document.querySelector('[data-js="main-container"]');
    const loginSection = document.querySelector('[data-js="content-login"]');
    const registerSection = document.querySelector('[data-js="content-register"]');
    const loginBtn = document.querySelectorAll('[data-js="login-btn"]');
    const registerBtn = document.querySelectorAll('[data-js="register-btn"]');
    const loginForm = document.querySelector('[data-js="login-form"]');
    const registerForm = document.querySelector('[data-js="register-form"]');
    const sendLoginFormButton = document.querySelector('[data-js="send-login-form"]');
    const sendRegisterFormButton = document.querySelector('[data-js="send-register-form"]');

    if(main) {
        loginBtn.forEach(item => {
            item.addEventListener('click', showLoginSection);

            sendLoginFormButton.addEventListener('click', function(e) {
                e.preventDefault();
                let isError = false;
                let surveyInputs = loginForm.querySelectorAll("[required]");
                surveyInputs.forEach(item => {
                    let inputError = document.querySelector('[data-js="'+item.id+'-error"]');
                    if (!item.checkValidity() || item.value.trim() == "") {
                        isError = true;
                        item.classList.add('error');
                        inputError.classList.add('is--show');
                    } else {
                        item.classList.remove('error');
                        inputError.classList.remove('is--show');
                    }
                });

                if(!isError) {
                    loginSection.innerHTML = '<p class="main__info">pomyślnie zalogowany</p>'
                }
            });
            registerBtn.forEach(item => {
                item.addEventListener('click', showRegisterSection);

                sendRegisterFormButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    let isError = false;
                    let surveyInputs = registerForm.querySelectorAll("[required]");
                    let surveyCheckbox = registerForm.querySelectorAll('input[type="checkbox"]');
                    surveyInputs.forEach(item => {
                        let inputError = document.querySelector('[data-js="'+item.id+'-error"]');
                        if (!item.checkValidity() || item.value.trim() == "") {
                            isError = true;
                            item.classList.add('error');
                            inputError.classList.add('is--show');
                        } else {
                            item.classList.remove('error');
                            inputError.classList.remove('is--show');
                        }
                    });
                    surveyCheckbox.forEach(item => {
                        let inputError = document.querySelector('[data-js="agree-error"]');
                        if(!item.checked) {
                            isError = true;
                            item.classList.add('error');
                            inputError.classList.add('is--show');
                        } else {
                            inputError.classList.remove('is--show');
                            item.classList.remove('error');
                        }
                    })
                    if(!isError) {
                        registerSection.innerHTML = '<p class="main__info">Rejestracja przebiegła pomyślnie</p>'
                    }
                });
            });
        });

        function showLoginSection(e) {
            e.preventDefault();
            mainContainer.querySelector('.is--active').classList.remove('is--active');
            loginSection.classList.add('is--active');
            document.getElementById("content-login").scrollIntoView();
        }

        function showRegisterSection(e) {
            e.preventDefault();
            mainContainer.querySelector('.is--active').classList.remove('is--active');
            registerSection.classList.add('is--active');
            document.getElementById("content-registe").scrollIntoView();
        }
    }
}
export default Main;
