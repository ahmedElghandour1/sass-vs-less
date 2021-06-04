import "./less/main.less";
// import "./scss/main.scss";


/* counter
-------------------------------- */
(() => {
    window.initiateCounter = function(selector, options) {
        const container = document.querySelector(selector);
        if(container) {
            init(container, options)
        }
    }

    const init = (container, {comma = '.',step, min, max, isCurrency } = {}) => {
        const inc = container.querySelector('[data-target=increment]'),
            dec = container.querySelector('[data-target=decrement]'),
            input = container.querySelector('[data-target=counter-input]'),
            _isCurrency = isCurrency ||container.getAttribute('data-type') === 'currency';
        let _min, _max;
        if (!input) {
            return;
        }
        _min = min || parseFloat(input.min);
        _max = max || parseFloat(input.max);
        const countBy = +step || +input.getAttribute('data-count-by') || 1;
        const handleButtonStatus = () => {
            +input.value == _min ? dec.setAttribute('disabled', true) : dec.removeAttribute('disabled');
            +input.value == _max ? inc.setAttribute('disabled', true) : inc.removeAttribute('disabled');
        }
        const setInputValue = (input, count = 0) => {
            let val = +input + count;
            val = parseFloat(val);
            console.log(val)
            if (_isCurrency) {
                if (parseInt(val.toString()) === val) {
                    val = `${val}${comma}00`;
                }
            }
            return val;
        }
        handleButtonStatus();
        input.value = setInputValue(input.value);
        inc?.addEventListener('click', () => {
            if (+input.value + countBy <= _max) {
                input.value = setInputValue(input.value, countBy);
            } else {
                input.value = setInputValue(_max);
            }
            handleButtonStatus();
        });

        dec?.addEventListener('click', () => {
            if (+input.value - countBy >= _min) {
                input.value = setInputValue(input.value, -countBy);
            } else {
                input.value = setInputValue(_min);

            }
            handleButtonStatus();
        });

        input?.addEventListener('input', () => {
            if (+input.value < _min) input.value = _min;
            if (+input.value > _max) input.value = _max;
            handleButtonStatus();
        });
    }
    const counters = document.querySelectorAll('[data-target=counter][data-init=true]');
    counters.forEach((counterContainer) => {
        init(counterContainer);
    })
})();

initiateCounter('#test-counter', {
    comma: ".",
    min: 100,
    max: 220,
    step: 10,
    isCurrency: true
});

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
            if (!target.closest(`[data-select-dropdown="${selectInstance.getAttribute('data-select-dropdown')}"]`)) {
                dropdownWrapper.classList.remove('active');
            }
        });

        selectDropdown.after(selectInstance);
        console.log(selectInstance);


    })
})();