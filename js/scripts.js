/*- main-nav -*/
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.main-nav__small-text');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parentItem = trigger.closest('.main-nav__item');
            const internalList = parentItem.querySelector('.main-nav__internal-list');
            const isActive = parentItem.classList.contains('active');

            if (internalList) {
                if (isActive) {
                    internalList.style.height = internalList.scrollHeight + 'px';
                    internalList.offsetHeight;
                    internalList.style.height = '0px';

                    internalList.addEventListener('transitionend', function handler() {
                        internalList.style.removeProperty('height');
                        internalList.removeEventListener('transitionend', handler);
                    });

                    parentItem.classList.remove('active');
                } else {
                    internalList.classList.add('pre-open');
                    internalList.style.height = '0px';

                    parentItem.classList.add('active');

                    requestAnimationFrame(() => {
                        internalList.style.height = internalList.scrollHeight + 'px';
                    });

                    internalList.addEventListener('transitionend', function handler() {
                        internalList.style.removeProperty('height');
                        internalList.classList.remove('pre-open');
                        internalList.removeEventListener('transitionend', handler);
                    });
                }
            }
        });
    });
});

/*- main-nav__item-in -*/
document.addEventListener("DOMContentLoaded", function () {
    const toggleElements = document.querySelectorAll(".main-nav__item-in.down-arrow");

    toggleElements.forEach(item => {
        item.addEventListener("click", function () {
            const dropdown = this.nextElementSibling;

            if (!dropdown || !dropdown.classList.contains("main-nav__dropdown")) return;

            const isOpen = dropdown.classList.contains("show");

            if (isOpen) {
                dropdown.style.height = dropdown.scrollHeight + 'px';

                dropdown.offsetHeight;

                dropdown.style.height = '0px';
                dropdown.classList.remove("show");

                dropdown.addEventListener("transitionend", function handler() {
                    dropdown.style.removeProperty('height');
                    dropdown.removeEventListener("transitionend", handler);
                });
            } else {
                dropdown.classList.add("show");

                dropdown.style.height = '0px';

                requestAnimationFrame(() => {
                    dropdown.style.height = dropdown.scrollHeight + 'px';
                });

                dropdown.addEventListener("transitionend", function handler() {
                    dropdown.style.removeProperty('height');
                    dropdown.removeEventListener("transitionend", handler);
                });
            }

            this.classList.toggle("open");
        });
    });
});

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

/*- sidebar-scroll -*/
document.addEventListener("DOMContentLoaded", function () {
    var viewport = document.querySelector(".sidebar-scroll__viewport");
    var thumb = document.querySelector(".sidebar-scroll__thumb");
    var track = document.querySelector(".sidebar-scroll__track");

    if (viewport && thumb && track) {
        function updateScrollBar() {
            var scrollHeight = viewport.scrollHeight;
            var clientHeight = viewport.clientHeight;
            var scrollRatio = viewport.scrollTop / (scrollHeight - clientHeight);
            var thumbHeight = Math.max(track.clientHeight * (clientHeight / scrollHeight), 50);
            var thumbPosition = scrollRatio * (track.clientHeight - thumbHeight);

            thumb.style.height = thumbHeight + "px";
            thumb.style.top = thumbPosition + "px";

            track.style.opacity = scrollHeight > clientHeight ? "1" : "0";
        }

        viewport.addEventListener("scroll", updateScrollBar);
        window.addEventListener("resize", updateScrollBar);

        var resizeObserver = new ResizeObserver(() => {
            updateScrollBar();
        });

        resizeObserver.observe(viewport);

        setInterval(() => {
            updateScrollBar();
        }, 300);

        updateScrollBar();
    }
});

/*- editor1 -*/
var editor1 = document.querySelector('#editor1');
var toolbar1 = document.querySelector('#toolbar1');
if (editor1 && toolbar1) {
    var quill1 = new Quill(editor1, {
        theme: 'snow',
        modules: {
            toolbar: toolbar1
        }
    });
}

/*- editor2 -*/
var editor2 = document.querySelector('#editor2');
var toolbar2 = document.querySelector('#toolbar2');
if (editor2 && toolbar2) {
    var quill2 = new Quill(editor2, {
        theme: 'snow',
        modules: {
            toolbar: toolbar2
        }
    });
}

/*- choose-file-input -*/
document.addEventListener('DOMContentLoaded', function () {
    const chooseFileInputs = document.querySelectorAll('.choose-file-input');

    chooseFileInputs.forEach(wrapper => {
        const input = wrapper.querySelector('input[type="file"]');
        const textSpan = wrapper.querySelector('.choose-file-input__text');

        if (input && textSpan) {
            input.addEventListener('change', function () {
                if (input.files.length > 0) {
                    const fileNames = Array.from(input.files).map(file => file.name).join(', ');
                    textSpan.textContent = fileNames;
                } else {
                    textSpan.textContent = 'No File Chosen';
                }
            });
        }
    });
});