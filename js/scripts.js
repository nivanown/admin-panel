/*- tabs -*/
document.addEventListener("DOMContentLoaded", function () {
    const allTabs = document.querySelectorAll(".tabs");

    allTabs.forEach(tabsBlock => {
        const tabButtons = tabsBlock.querySelectorAll(".tabs__nav li");
        const tabItems = tabsBlock.querySelectorAll(".tabs__item");

        tabButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                tabButtons.forEach(btn => btn.classList.remove("active"));
                tabItems.forEach(item => item.classList.remove("active"));
                button.classList.add("active");
                tabItems[index].classList.add("active");
            });
        });
    });
});

/*- select -*/
document.addEventListener("DOMContentLoaded", () => {
    const allSelects = document.querySelectorAll(".select");

    if (!allSelects.length) return;

    function closeAll(event) {
        allSelects.forEach(select => {
            if (!select.contains(event.target)) {
                select.classList.remove("open");
                const dropdown = select.querySelector(".select__dropdown");
                const selectText = select.querySelector(".select__text");
                if (dropdown) dropdown.classList.remove("show");
                if (selectText) selectText.classList.remove("open");
            }
        });
    }

    allSelects.forEach(select => {
        const selectText = select.querySelector(".select__text");
        const dropdown = select.querySelector(".select__dropdown");
        const listItems = select.querySelectorAll(".select__dropdown li");
        const input = select.querySelector("input[type='text']");
        const placeholderText = select.querySelector(".select__placeholder-text");

        if (!selectText || !dropdown || !input || !listItems.length) return;

        function updateSelectTextFromItem(item) {
            selectText.innerHTML = "";

            const img = item.querySelector("img");
            if (img) {
                const clonedImg = img.cloneNode();
                selectText.appendChild(clonedImg);
                selectText.insertAdjacentText("beforeend", " ");
            }

            const text = item.textContent.trim();
            selectText.appendChild(document.createTextNode(text));
        }

        if (input.value) {
            const matchedItem = Array.from(listItems).find(item => item.textContent.trim() === input.value.trim());

            if (matchedItem) {
                listItems.forEach(li => li.classList.remove("active"));
                matchedItem.classList.add("active");

                updateSelectTextFromItem(matchedItem);

                if (placeholderText) {
                    placeholderText.classList.add("hidden");
                }

                select.classList.add("selected");
            }
        } else {
            input.value = selectText.textContent;
        }

        selectText.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = select.classList.contains("open");
            closeAll(event);
            select.classList.toggle("open", !isOpen);
            selectText.classList.toggle("open", !isOpen);
            dropdown.classList.toggle("show", !isOpen);
        });

        listItems.forEach(item => {
            item.addEventListener("click", (event) => {
                event.stopPropagation();
                listItems.forEach(li => li.classList.remove("active"));
                item.classList.add("active");

                updateSelectTextFromItem(item);
                input.value = item.textContent.trim();

                if (placeholderText) {
                    placeholderText.classList.add("hidden");
                }

                select.classList.add("selected");
                select.classList.remove("open");
                dropdown.classList.remove("show");
            });
        });
    });

    document.addEventListener("click", closeAll);
});

/*- vertical-scroll -*/
var swiper = new Swiper(".vertical-scroll", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    mousewheel: true,
});

/*- input-field -*/
document.querySelectorAll('.input-field').forEach(field => {
    const input = field.querySelector('input');
    const counterSpan = field.querySelector('.input-field__quantity span');
    const maxLength = 275;

    if (!input || !counterSpan) return;

    input.maxLength = maxLength;

    input.addEventListener('input', () => {
        if (input.value.length > maxLength) {
            input.value = input.value.slice(0, maxLength);
        }

        counterSpan.textContent = `${maxLength - input.value.length}`;
    });

    counterSpan.textContent = `${maxLength - input.value.length}`;
});

/*- textarea-field -*/
document.querySelectorAll('.textarea-field').forEach(field => {
    const textarea = field.querySelector('textarea');
    const counterSpan = field.querySelector('.textarea-field__quantity span');
    const maxLength = 1000;

    if (!textarea || !counterSpan) return;

    textarea.maxLength = maxLength;

    textarea.addEventListener('input', () => {
        if (textarea.value.length > maxLength) {
            textarea.value = textarea.value.slice(0, maxLength);
        }
        counterSpan.textContent = `${maxLength - textarea.value.length}`;
    });

    counterSpan.textContent = `${maxLength - textarea.value.length}`;
});

/*- mobile-menu -*/
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');

    function toggleShowClass() {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    }

    menuBtn.addEventListener('click', toggleShowClass);
    closeBtn.addEventListener('click', toggleShowClass);
    overlay.addEventListener('click', toggleShowClass);
});