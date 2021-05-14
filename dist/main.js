/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/less/main.less":
/*!****************************!*\
  !*** ./src/less/main.less ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://sass/./src/less/main.less?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _less_main_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./less/main.less */ \"./src/less/main.less\");\n\r\n// import \"./scss/main.scss\";\r\n\r\n/* counter\r\n-------------------------------- */\r\n(() => {\r\n    const counters = document.querySelectorAll('[data-target=counter]');\r\n    counters.forEach((counterContainer) => {\r\n        const inc = counterContainer.querySelector('[data-target=increment]'),\r\n            dec = counterContainer.querySelector('[data-target=decrement]'),\r\n            input = counterContainer.querySelector('[data-target=counter-input]'),\r\n            isCurrency = counterContainer.getAttribute('data-type') === 'currency';\r\n        let min, max;\r\n        if (!input) {\r\n            return;\r\n        }\r\n        min = parseFloat(input.min);\r\n        max = parseFloat(input.max);\r\n        const countBy = +input.getAttribute('data-count-by') || 1;\r\n        const handleButtonStatus = () => {\r\n            +input.value == min ? dec.setAttribute('disabled', true) : dec.removeAttribute('disabled');\r\n            +input.value == max ? inc.setAttribute('disabled', true) : inc.removeAttribute('disabled');\r\n        }\r\n        const setInputValue = (input, count = 0) => {\r\n            let val = +input + count;\r\n            if (isCurrency) {\r\n                if (parseInt(val.toString()) === val) {\r\n                    val = `${val}.00`;\r\n                }\r\n            }\r\n            return val;\r\n        }\r\n        handleButtonStatus();\r\n        input.value = setInputValue(input.value);\r\n        inc?.addEventListener('click', () => {\r\n            if (+input.value + countBy <= max) {\r\n                input.value = setInputValue(input.value, countBy);\r\n            } else {\r\n                input.value = setInputValue(max);\r\n            }\r\n            handleButtonStatus();\r\n        });\r\n\r\n        dec?.addEventListener('click', () => {\r\n            if (+input.value - countBy >= min) {\r\n                input.value = setInputValue(input.value, -countBy);\r\n            } else {\r\n                input.value = setInputValue(min);\r\n\r\n            }\r\n            handleButtonStatus();\r\n        });\r\n\r\n        input?.addEventListener('input', () => {\r\n            if (+input.value < min) input.value = min;\r\n            if (+input.value > max) input.value = max;\r\n            handleButtonStatus();\r\n        });\r\n    })\r\n})();\r\n\r\n\r\n(() => {\r\n    const selectDropdowns = document.querySelectorAll('select[select-dropdown]');\r\n    selectDropdowns?.forEach((selectDropdown) => {\r\n        let value = selectDropdown.value;\r\n        let text;\r\n        const options = [];\r\n        let isActive = false;\r\n        selectDropdown.style.width = 0;\r\n        selectDropdown.style.height = 0;\r\n        selectDropdown.style.border = 0;\r\n\r\n        selectDropdown.querySelectorAll('option')?.forEach(option => options.push({\r\n            value: option.value,\r\n            name: option.innerText,\r\n            active: option.value === value\r\n        }));\r\n\r\n        text = options[selectDropdown.selectedIndex].name;\r\n\r\n        const html = /* html */`\r\n        <div class=\"select-dropdown\" data-select-dropdown=\"${selectDropdown.getAttribute('select-dropdown')}\"> \r\n            <span data-selected='${value}' class=\"selected\">${text}</span>\r\n            <div dropdown-wrapper class=\"dropdown\">\r\n                <ul class=\"dropdown-list\">\r\n                    ${options.map(op => `\r\n                    <li data-dropdown-item=\"${op.value}\" \r\n                        data-active=\"${op.active}\" \r\n                        class=\"dropdown-item\">${op.name}</li>\r\n                    `).join('\\n')}\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        `;\r\n\r\n        const DOM = new DOMParser().parseFromString(html, \"text/html\");\r\n        const selectInstance = DOM.body.firstChild;\r\n        const dropdownSelectElm = selectInstance.querySelector('span[data-selected]');\r\n        const dropdownWrapper = selectInstance.querySelector('[dropdown-wrapper]');\r\n        const dropdownItemsElms = selectInstance.querySelectorAll('li[data-dropdown-item]');\r\n        dropdownSelectElm.addEventListener('click', () => {\r\n            isActive = !isActive;\r\n            dropdownWrapper.classList.toggle('active');\r\n        });\r\n        dropdownItemsElms.forEach((item, index, items) => {\r\n            item.addEventListener('click', () => {\r\n                dropdownItemsElms.forEach(i => i.setAttribute('data-active', 'false'))\r\n                item.setAttribute('data-active', 'true');\r\n                const val = item.getAttribute('data-dropdown-item');\r\n                dropdownSelectElm.setAttribute('data-selected', val);\r\n                dropdownSelectElm.innerText = item.innerText;\r\n                selectDropdown.value = val;\r\n                selectDropdown.dispatchEvent(new Event('change'));\r\n                // selectDropdown\r\n                dropdownWrapper.classList.toggle('active');\r\n            });\r\n        })\r\n\r\n        window.addEventListener('click', (e) => {\r\n            const target = e.target;\r\n            if(!target.closest(`[data-select-dropdown=\"${selectInstance.getAttribute('data-select-dropdown')}\"]`)) {\r\n                dropdownWrapper.classList.remove('active');\r\n            }\r\n        });\r\n\r\n        selectDropdown.after(selectInstance);\r\n        console.log(selectInstance);\r\n\r\n\r\n    })\r\n})();\n\n//# sourceURL=webpack://sass/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;