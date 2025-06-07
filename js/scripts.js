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

/*- actions -*/
document.addEventListener('DOMContentLoaded', () => {
    const actionBlocks = document.querySelectorAll('.actions');

    let floatingDropdown = null;
    let sourceBtn = null;
    let sourceDropdown = null;

    function positionDropdownRelativeToButton(dropdown, btn) {
        const rect = btn.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        const dropdownWidth = dropdown.offsetWidth;
        const right = rect.right + scrollLeft;

        let left = right - dropdownWidth;

        if (left < scrollLeft + 10) {
            left = scrollLeft + 10;
        }

        dropdown.style.top = rect.bottom + scrollTop + 'px';
        dropdown.style.left = left + 'px';
    }

    actionBlocks.forEach(actions => {
        const btn = actions.querySelector('.actions__btn');
        const originalDropdown = actions.querySelector('.actions__dropdown');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            const isSameButton = (sourceBtn === btn);

            if (floatingDropdown) {
                floatingDropdown.remove();
                floatingDropdown = null;
            }

            if (sourceDropdown) {
                sourceDropdown.classList.remove('show');
                sourceDropdown.style.opacity = '';
                sourceDropdown.style.visibility = '';
            }

            if (isSameButton) {
                sourceBtn = null;
                sourceDropdown = null;
                return;
            }

            const clone = originalDropdown.cloneNode(true);
            clone.classList.add('floating-dropdown', 'show');
            clone.style.position = 'absolute';
            clone.style.zIndex = '9999';
            clone.style.minWidth = originalDropdown.offsetWidth + 'px';
            clone.style.opacity = '1';
            clone.style.visibility = 'visible';
            document.body.appendChild(clone);

            positionDropdownRelativeToButton(clone, btn);

            originalDropdown.classList.remove('show');
            originalDropdown.style.opacity = '0';
            originalDropdown.style.visibility = 'hidden';
            floatingDropdown = clone;
            sourceBtn = btn;
            sourceDropdown = originalDropdown;
        });
    });

    document.addEventListener('click', (e) => {
        if (
            (floatingDropdown && floatingDropdown.contains(e.target)) ||
            (sourceBtn && sourceBtn.contains(e.target))
        ) {
            return;
        }

        if (floatingDropdown) {
            floatingDropdown.remove();
            floatingDropdown = null;
        }

        if (sourceDropdown) {
            sourceDropdown.classList.remove('show');
            sourceDropdown.style.opacity = '';
            sourceDropdown.style.visibility = '';
            sourceDropdown = null;
        }

        sourceBtn = null;
    });

    window.addEventListener('scroll', () => {
        if (floatingDropdown) {
            floatingDropdown.remove();
            floatingDropdown = null;
        }

        if (sourceDropdown) {
            sourceDropdown.classList.remove('show');
            sourceDropdown.style.opacity = '';
            sourceDropdown.style.visibility = '';
            sourceDropdown = null;
        }

        sourceBtn = null;
    });

    window.addEventListener('resize', () => {
        if (floatingDropdown && sourceBtn) {
            positionDropdownRelativeToButton(floatingDropdown, sourceBtn);
        }
    });
});

/*- sort -*/
document.addEventListener('DOMContentLoaded', () => {
    const sortBlocks = document.querySelectorAll('.sort');

    if (!sortBlocks.length) return;

    sortBlocks.forEach(sort => {
        const btn = sort.querySelector('.btn');
        const dropdown = sort.querySelector('.sort__dropdown');
        const listItems = sort.querySelectorAll('.sort__list > li');

        if (!btn || !dropdown || !listItems.length) return;

        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!sort.contains(event.target)) {
                dropdown.classList.remove('show');
                closeAllSubmenus();
            }
        });

        listItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.stopPropagation();
                const sub = item.querySelector('.sort__dropdown-sub');

                if (sub) {
                    const isOpen = sub.classList.contains('show');
                    closeAllSubmenus();

                    if (!isOpen) {
                        sub.classList.add('show');
                    }
                } else {
                    closeAllSubmenus();
                }
            });
        });

        function closeAllSubmenus() {
            sort.querySelectorAll('.sort__dropdown-sub.show').forEach(openSub => {
                openSub.classList.remove('show');
            });
        }
    });
});

/*- filter -*/
document.addEventListener('DOMContentLoaded', function () {
    const filters = document.querySelectorAll('.filter');

    if (!filters.length) return;

    filters.forEach(filter => {
        const btn = filter.querySelector('.btn');
        const dropdown = filter.querySelector('.filter__dropdown');
        const clearBtn = filter.querySelector('.filter__clear');

        if (!btn || !dropdown) return;

        function closeDropdown() {
            dropdown.classList.remove('show');
        }

        btn.addEventListener('click', function (event) {
            event.stopPropagation();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', function (event) {
            if (!filter.contains(event.target)) {
                closeDropdown();
            }
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                const checkboxes = filter.querySelectorAll('.filter__list input[type="checkbox"]');
                checkboxes.forEach(cb => cb.checked = false);
            });
        }
    });
});

/*- image-file -*/
document.addEventListener('DOMContentLoaded', function () {
    const imageFile = document.querySelector('.image-file');
    if (!imageFile) return;

    const input = imageFile.querySelector('input[type="file"]');
    const fileText = imageFile.querySelector('.image-file__text');
    const fileBtn = imageFile.querySelector('.image-file__btn');
    const fileError = imageFile.querySelector('.image-file__error');
    const fileClose = imageFile.querySelector('.image-file__close');

    if (!input || !fileText || !fileBtn || !fileError || !fileClose) return;

    input.addEventListener('change', function () {
        fileError.classList.remove('show');

        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const fileName = file.name.toLowerCase();
            const fileSize = file.size;
            const allowedTypes = ['jpg', 'jpeg', 'png', 'svg'];
            const fileExtension = fileName.split('.').pop();

            const isValidType = allowedTypes.includes(fileExtension);
            const isValidSize = fileSize <= 3 * 1024 * 1024;

            if (isValidType && isValidSize) {
                fileText.textContent = file.name;
                fileText.classList.add('show');
                fileBtn.classList.add('hidden');
                fileClose.classList.add('show');
            } else {
                fileError.classList.add('show');
                input.value = '';
            }
        }
    });

    fileClose.addEventListener('click', function () {
        fileText.textContent = '';
        fileText.classList.remove('show');
        fileClose.classList.remove('show');
        fileBtn.classList.remove('hidden');
        fileError.classList.remove('show');
        input.value = '';
    });
});

/*- chart -*/
const stackedBarEl = document.querySelector("#chart");

if (stackedBarEl) {
    const stackedBarOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            height: 350,
            toolbar: { show: false },
            fontFamily: 'Inter, sans-serif'
        },
        colors: ['#F59E0B', '#FDE68A', '#E879F9'],
        plotOptions: {
            bar: {
                columnWidth: '80%',
                borderRadius: 2
            }
        },
        dataLabels: { enabled: false },
        series: [
            {
                name: 'Orange',
                data: [
                    5000, 5000, 5000, 7000, 5000, 20000, 8000, 6000, 5000, 20000,
                    8000, 6000, 5000, 20000, 8000, 6000, 5000, 20000, 8000, 6000,
                    5000, 20000, 8000, 6000, 5000, 20000, 8000, 6000, 5000, 20000
                ]
            },
            {
                name: 'Yellow',
                data: [
                    3000, 2000, 1000, 4000, 2000, 5000, 3000, 2000, 1000, 5000,
                    3000, 2000, 1000, 5000, 3000, 2000, 1000, 5000, 3000, 2000,
                    1000, 5000, 3000, 2000, 1000, 5000, 3000, 2000, 1000, 5000
                ]
            },
            {
                name: 'Purple',
                data: [
                    2000, 1000, 1000, 3000, 1000, 5000, 2000, 1000, 1000, 5000,
                    2000, 1000, 1000, 5000, 2000, 1000, 1000, 5000, 2000, 1000,
                    1000, 5000, 2000, 1000, 1000, 5000, 2000, 1000, 1000, 5000
                ]
            }
        ],
        xaxis: {
            categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString().padStart(2, '0')),
            labels: {
                style: {
                    colors: '#A8A29E',
                    fontFamily: 'Inter',
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            max: 80000,
            tickAmount: 4,
            labels: {
                formatter: val => `${val / 1000}k`,
                style: {
                    colors: '#A8A29E',
                    fontFamily: 'Inter',
                    fontSize: '12px'
                }
            }
        },
        tooltip: {
            y: {
                formatter: val => `${val.toLocaleString()}`
            }
        },
        legend: { show: false },
        grid: {
            borderColor: '#E5E7EB',
            strokeDashArray: 4
        }
    };

    const stackedBarChart = new ApexCharts(stackedBarEl, stackedBarOptions);
    stackedBarChart.render();
};

/*- chartDonut -*/
const chartDonutEl = document.querySelector("#chartDonut");

if (chartDonutEl) {
    const chartDonutOptions = {
        chart: {
            type: "donut",
            height: 380,
            fontFamily: "Inter, sans-serif",
            toolbar: {
                show: false
            }
        },
        series: [68000, 150000, 45000, 33642, 40000],
        labels: ["18-24", "25-31", "32-38", "39-45", "45+"],
        colors: ["#11428C", "#3FC8E4", "#FF9F0A", "#FFC90A", "#1DBF73"],
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            labels: {
                colors: "#6B7280"
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function () {
                return ["", ""];
            },
            dropShadow: {
                enabled: false
            },
            style: {
                fontFamily: "Inter, sans-serif"
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            offsetY: -10
                        },
                        value: {
                            offsetY: 10
                        },
                        total: {
                            show: false
                        }
                    }
                }
            }
        }
    };

    const chartDonut = new ApexCharts(chartDonutEl, chartDonutOptions);
    chartDonut.render();
};

/*- chartSingleBar -*/
const chartSingleBarEl = document.querySelector("#chartSingleBar");

if (chartSingleBarEl) {
    const chartSingleBarOptions = {
        chart: {
            type: "bar",
            height: 320,
            fontFamily: "Inter, sans-serif",
            toolbar: {
                show: false
            }
        },
        series: [{
            name: "Sessions",
            data: [
                5, 5, 15, 9, 7, 10, 11, 19, 15, 6,
                11, 14, 10, 13, 10, 19, 10, 12, 15, 7,
                5, 22, 20, 10, 6, 26, 16, 13, 20, 18
            ]
        }],
        xaxis: {
            categories: [
                "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
            ],
            labels: {
                style: {
                    fontFamily: "Inter",
                    colors: "#A8A29E"
                }
            }
        },
        yaxis: {
            max: 40,
            tickAmount: 4,
            labels: {
                formatter: val => `${val}s`,
                style: {
                    fontFamily: "Inter",
                    colors: "#A8A29E"
                }
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "80%",
                borderRadius: 2
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#A855F7"],
        grid: {
            borderColor: "#E5E7EB",
            strokeDashArray: 4
        }
    };

    const chartSingleBar = new ApexCharts(chartSingleBarEl, chartSingleBarOptions);
    chartSingleBar.render();
};

/*- chartVisitors -*/
const chartVisitorsEl = document.querySelector("#chartVisitors");

if (chartVisitorsEl) {
    const chartVisitorsOptions = {
        chart: {
            type: "donut",
            height: 300,
            fontFamily: "Inter, sans-serif",
            toolbar: {
                show: false
            }
        },
        series: [37.99, 20, 13, 12.2, 12.2, 5.01],
        labels: [
            "Instagram",
            "Facebook",
            "Google Ads",
            "Yahoo",
            "Direct link",
            "Unknown"
        ],
        colors: [
            "#6C5DD3", // фиолетовый
            "#003f8c", // синий
            "#f9c80e", // жёлтый
            "#ffa500", // оранжевый
            "#ff4c61", // розовый
            "#d3d3d3"  // серый
        ],
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 0
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "70%"
                }
            }
        }
    };

    const chartVisitors = new ApexCharts(chartVisitorsEl, chartVisitorsOptions);
    chartVisitors.render();
};

/*- chartPink -*/
const chartPinkEl = document.querySelector("#chartPink");

if (chartPinkEl) {
    const chartPinkOptions = {
        chart: {
            type: "bar",
            height: 280,
            toolbar: {
                show: false
            }
        },
        series: [{
            name: "Visitors",
            data: [
                16000, 16000, 16000, 67000, 35000, 25000,
                16000, 16000, 16000, 67000, 35000, 25000,
                16000, 16000, 16000, 67000, 35000, 25000,
                16000, 16000, 16000, 67000, 35000, 25000,
                16000, 16000, 16000, 67000
            ]
        }],
        xaxis: {
            categories: [
                "03", "04", "05", "06", "07", "08",
                "09", "10", "11", "12", "13", "14",
                "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26",
                "27", "28", "29", "30"
            ],
            labels: {
                style: {
                    colors: "#A8A29E",
                    fontFamily: "Inter"
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#A8A29E",
                    fontFamily: "Inter"
                },
                formatter: val => `${val / 1000}k`
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "80%",
                borderRadius: 2
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#E879F9"],
        grid: {
            borderColor: "#E5E7EB",
            strokeDashArray: 4
        }
    };

    const chartPink = new ApexCharts(chartPinkEl, chartPinkOptions);
    chartPink.render();
};

/*- date-range -*/
document.querySelectorAll('.date-range-field').forEach((field) => {
    const input     = field.querySelector('.date-range');
    const deleteBtn = field.querySelector('.date-range-field__delete');

    const picker = new AirDatepicker(input, {
        range: true,
        multipleDatesSeparator: ' — ',
        autoClose: true,
        dateFormat: 'dd.MM.yyyy',
        onSelect({ formattedDate }) {
            toggleDeleteButton();
        },
        locale: {
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            today: 'Сегодня',
            clear: 'Очистить',
            dateFormat: 'dd.MM.yyyy',
            firstDay: 1
        }
    });

    deleteBtn.addEventListener('click', () => {
        input.value = '';
        picker.clear();
        toggleDeleteButton();
    });

    input.addEventListener('input', toggleDeleteButton);

    toggleDeleteButton();

    function toggleDeleteButton() {
        const hasDigits = /\d/.test(input.value);
        deleteBtn.style.display = hasDigits ? 'block' : 'none';
    }
});

