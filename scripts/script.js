document.addEventListener('DOMContentLoaded', function() {
    // ----------------- Бургер-меню
    const burgerButton = document.querySelector('.header-burger');
    const menuList = document.querySelector('.menu-list');
    
    if (burgerButton && menuList) {
        burgerButton.addEventListener('click', function() {
            burgerButton.classList.toggle('active');
            menuList.classList.toggle('active');
        });
    }


    /*----------------- ФОРМА -----------------*/
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    // ------------------ МАСКА ДЛЯ ТЕЛЕФОНА ------------------

    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', maskPhone);
    phoneInput.addEventListener('focus', maskPhone);
    phoneInput.addEventListener('blur', maskPhone);

    function maskPhone() {
        let val = phoneInput.value.replace(/\D/g, ''); // только цифры
        if (val.startsWith('7')) val = val.substring(1); // убираем 7
        if (val.startsWith('9')) val = val.substring(1); // убираем фиксированную 9
        if (val.length > 9) val = val.substring(0,9);    // максимум 9 цифр после 9

        let part1 = '9' + val.substring(0,2).padEnd(2,' '); // 9 + 2 цифры
        let part2 = val.substring(2,5).padEnd(3,' ');       // 3 цифры
        let part3 = val.substring(5,7).padEnd(2,' ');       // 2 цифры
        let part4 = val.substring(7,9).padEnd(2,' ');       // 2 цифры

        phoneInput.value = `+7-(${part1})-(${part2})-(${part3})-(${part4})`;
    }






    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);

        let formData = new FormData(form);
        
        // Проверяем результат валидации
        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                //formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка при отправке формы');
                form.classList.remove('_sending');
            }

            // Форма валидна, можно отправлять
            console.log('Форма валидна, отправляем...');
            // Здесь код для отправки формы (например, fetch запрос)
            
            // form.submit(); // раскомментировать для реальной отправки
        } else {
            console.log('Ошибок в форме: ' + error);
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req')

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')) {
                if(emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            }else if(input.getAttribute("type") === "checkbox" && input.checked === false){
                formAddError(input);
                error++;
            }else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }

            

        }

        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error')
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    //----- Функция теста email 
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

});