// Підключення функціоналу "Чертоги Фрілансера"
import { indexInParent, isMobile, menuClose } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

window.addEventListener('load', pageLoad)

function pageLoad() {
    const htmlTag = document.documentElement

    document.addEventListener('click', e => {
        const targetElement = e.target

        if (targetElement.closest('.menu__close')) {
            htmlTag.classList.contains("menu-open") ? menuClose() : null;
        }


        if (targetElement.closest('[data-category]')) {
            let itemCategory = targetElement.closest('[data-category]')
            let numberCategory = Number(itemCategory.getAttribute('data-category'))

            let categoryButton = document.querySelector(`[data-category-button="${numberCategory}"]`)

            if (categoryButton) {
                categoryButton.click()
            }

        }


        ///////


        if (targetElement.closest('[data-choose-title]')) {
            let chooseTitle = targetElement.closest('[data-choose-title]')
            let chooseGroop = document.querySelectorAll('[data-choose-groop]')
            let chooseSelect = document.querySelectorAll('[data-choose-select]')
            let parent = chooseTitle.parentNode
            let indexTitle = indexInParent(parent, chooseTitle)

            if (!chooseTitle.closest('._active')) {
                if (document.querySelector('[data-choose-title]._active')) {
                    document.querySelector('[data-choose-title]._active').classList.remove('_active')
                }
                chooseTitle.classList.add('_active')
                if (chooseSelect) {
                    chooseSelect.forEach(select => {

                        let parentSelect = select.closest('.select')
                        let selectContent = parentSelect.querySelector(`.select__content`)
                        let selecTrigerButtons = parentSelect.querySelectorAll(`button[data-value]`)

                        selecTrigerButtons[indexTitle].click()
                        selectContent.innerHTML = chooseTitle.innerHTML

                        select.selectedIndex = indexTitle
                    });
                }
                if (chooseGroop) {
                    chooseGroop.forEach(groop => {
                        let chooseContents = groop.querySelectorAll('[data-choose-content]')
                        if (chooseContents) {
                            chooseContents.forEach(element => {
                                if (element.classList.contains('_show')) {
                                    element.classList.remove('_show')
                                }
                            });
                        }
                        chooseContents[indexTitle].classList.add('_show')
                    });
                }
            }

        }

    })

    document.addEventListener('selectCallback', (select) => {
        let selectElem = select.detail.select
        let activeIndex = selectElem.selectedIndex
        let chooseGroop = document.querySelectorAll('[data-choose-groop]')

        let chooseTitle = document.querySelectorAll('[data-choose-title]')
        if (document.querySelector('[data-choose-title]._active')) {
            document.querySelector('[data-choose-title]._active').classList.remove('_active')
        }
        chooseTitle[activeIndex].classList.add('_active')

        if (chooseGroop) {
            chooseGroop.forEach(groop => {
                let chooseContents = groop.querySelectorAll('[data-choose-content]')
                if (chooseContents) {
                    chooseContents.forEach(element => {
                        if (element.classList.contains('_show')) {
                            element.classList.remove('_show')
                        }
                    });
                }
                chooseContents[activeIndex].classList.add('_show')
            });
        }
    })


}