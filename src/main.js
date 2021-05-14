import "./less/main.less";
// import "./scss/main.scss";

/* counter
-------------------------------- */
(() => {
    const counters = document.querySelectorAll('[data-target=counter]');
    counters.forEach((counterContainer) => {
        const inc = counterContainer.querySelector('[data-target=increment]'),
            dec = counterContainer.querySelector('[data-target=decrement]'),
            input = counterContainer.querySelector('[data-target=counter-input]'),
            isCurrency = counterContainer.getAttribute('data-type') === 'currency';
        let min, max;
        if (!input) {
            return;
        }
        min = parseFloat(input.min);
        max = parseFloat(input.max);
        const countBy = +input.getAttribute('data-count-by') || 1;
        const handleButtonStatus = () => {
            +input.value == min ? dec.setAttribute('disabled', true) : dec.removeAttribute('disabled');
            +input.value == max ? inc.setAttribute('disabled', true) : inc.removeAttribute('disabled');
        }
        const setInputValue = (input, count = 0) => {
            let val = +input + count;
            if (isCurrency) {
                if (parseInt(val.toString()) === val) {
                    val = `${val}.00`;
                }
            }
            return val;
        }
        handleButtonStatus();
        input.value = setInputValue(input.value);
        inc?.addEventListener('click', () => {
            if (+input.value + countBy <= max) {
                input.value = setInputValue(input.value, countBy);
            } else {
                input.value = setInputValue(max);
            }
            handleButtonStatus();
        });

        dec?.addEventListener('click', () => {
            if (+input.value - countBy >= min) {
                input.value = setInputValue(input.value, -countBy);
            } else {
                input.value = setInputValue(min);

            }
            handleButtonStatus();
        });

        input?.addEventListener('input', () => {
            if (+input.value < min) input.value = min;
            if (+input.value > max) input.value = max;
            handleButtonStatus();
        });
    })
})();


(() => {
    const selectDropdowns = document.querySelectorAll('select[select-dropdown]');
    selectDropdowns?.forEach((selectDropdown) => {
        let value = selectDropdown.value;
        let text;
        const options = [];
        let isActive = false;
        selectDropdown.style.width = 0;
        selectDropdown.style.height = 0;
        selectDropdown.style.border = 0;

        selectDropdown.querySelectorAll('option')?.forEach(option => options.push({
            value: option.value,
            name: option.innerText,
            active: option.value === value
        }));

        text = options[selectDropdown.selectedIndex].name;

        const html = /* html */`
        <div class="select-dropdown" data-select-dropdown="${selectDropdown.getAttribute('select-dropdown')}"> 
            <span data-selected='${value}' class="selected">${text}</span>
            <div dropdown-wrapper class="dropdown">
                <ul class="dropdown-list">
                    ${options.map(op => `
                    <li data-dropdown-item="${op.value}" 
                        data-active="${op.active}" 
                        class="dropdown-item">${op.name}</li>
                    `).join('\n')}
                </ul>
            </div>
        </div>
        `;

        const DOM = new DOMParser().parseFromString(html, "text/html");
        const selectInstance = DOM.body.firstChild;
        const dropdownSelectElm = selectInstance.querySelector('span[data-selected]');
        const dropdownWrapper = selectInstance.querySelector('[dropdown-wrapper]');
        const dropdownItemsElms = selectInstance.querySelectorAll('li[data-dropdown-item]');
        dropdownSelectElm.addEventListener('click', () => {
            isActive = !isActive;
            dropdownWrapper.classList.toggle('active');
        });
        dropdownItemsElms.forEach((item, index, items) => {
            item.addEventListener('click', () => {
                dropdownItemsElms.forEach(i => i.setAttribute('data-active', 'false'))
                item.setAttribute('data-active', 'true');
                const val = item.getAttribute('data-dropdown-item');
                dropdownSelectElm.setAttribute('data-selected', val);
                dropdownSelectElm.innerText = item.innerText;
                selectDropdown.value = val;
                selectDropdown.dispatchEvent(new Event('change'));
                // selectDropdown
                dropdownWrapper.classList.toggle('active');
            });
        })

        window.addEventListener('click', (e) => {
            const target = e.target;
            if(!target.closest(`[data-select-dropdown="${selectInstance.getAttribute('data-select-dropdown')}"]`)) {
                dropdownWrapper.classList.remove('active');
            }
        });

        selectDropdown.after(selectInstance);
        console.log(selectInstance);


    })
})();