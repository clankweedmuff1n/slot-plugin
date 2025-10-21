function setSpinData(allData){
    sampleData = Mapper.SpinDataMapping(allData)

    spinSetter = [
        document.getElementById('spinWidth').children,
        document.getElementById('spinHeight').children,
        document.getElementById('spinSlow').children
    ]
    spinSetter.forEach(container=>
        Array.from(container).forEach(child=>
        {
            if(child instanceof HTMLInputElement){
                child.value = sampleData[child.dataset.marker]
            }
        })
    )
}
function getSpinData(){

    const returnData = {

    }
    const spinSetter = [
        document.getElementById('spinWidth').children,
        document.getElementById('spinHeight').children,
        document.getElementById('spinSlow').children
    ]

    spinSetter.forEach(container=>
        Array.from(container).forEach(child=>
        {
            if(child instanceof HTMLInputElement){
                returnData[child.dataset.marker] = Number(child.value)
            }
        })
    )
    return returnData;
}
function createOrUpdateDropdownWinItems(){
    const data = Object.keys(MAINDATA.Elements)
    const select = document.createElement('select');
    select.id = "symbol-dropdown";

    // Create the default disabled option
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "winElement select";
    select.appendChild(defaultOption);

    // Dynamically create <option> elements from the array
    data.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = `${item}`; // Assign value like option1, option2, etc.
        option.textContent = item; // The visible text for the option
        select.appendChild(option);
    });

    // Проверяем наличие контейнера
    const container = document.getElementById('dropdown-container');
    if (container) {
        // Если внутри контейнера уже есть <select>, удаляем его
        const existingSelect = container.querySelector('select');
        if (existingSelect) {
            container.removeChild(existingSelect);
        }

        // Добавляем новый <select> в контейнер
        container.appendChild(select);
    }
}
function createOrUpdateDropdownSpinItems(){
    const data = Object.keys(MAINDATA.Spins)
    if(document.getElementById("spin-dropdown") !== null){
        const myNode = document.getElementById("spin-dropdown");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }

        data.unshift("spin select")

        data.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = `${item}`; // Assign value like option1, option2, etc.
            option.textContent = item; // The visible text for the option
            myNode.appendChild(option);
        });
        return
    }
    const select = document.createElement('select');
    select.id = "spin-dropdown";

    // Create the default disabled option
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.disabled = false;
    defaultOption.selected = true;
    defaultOption.textContent = "spin select";
    select.appendChild(defaultOption);

    // Dynamically create <option> elements from the array
    data.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = `${item}`; // Assign value like option1, option2, etc.
        option.textContent = item; // The visible text for the option
        select.appendChild(option);
    });

    // Append the <select> to the div with class 'optionsSpinContainer'
    const container = document.querySelector('.optionsSpinContainer');
    container.appendChild(select);
}
/**
 * Создает UI отображение сетки спина
 * @param {SpinDataType} data MAINDATA["Spins"]["Spin_0"]
 */
function createGrid(data){

    var sampleData = Mapper.SpinDataMapping(data)

    const gridsContainer = document.getElementById('grids-container');

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    gridContainer.id = `${sampleData.name}`;


    const contentContainer = document.createElement('div');
    contentContainer.id = sampleData.name;
    contentContainer.classList.add('content');

    contentContainer.appendChild(gridContainer);
    gridsContainer.appendChild(contentContainer);
    // const spinDropdown = document.getElementById('spin-dropdown');
    // const symbolDropdown = document.getElementById('symbol-dropdown');
    // const submitButton = document.getElementById('submit-button');

    // Динамически создаём сетку 5x5
    const heightSize = sampleData.elsByHeight;
    const widthSize = sampleData.elsByWidth;
    const gridItems = [];
    gridContainer.style = `grid-template-columns: repeat(${widthSize}, 1fr);`;
    for (let y = heightSize-1; y >= 0; y--) {
        for (let x = 0; x < widthSize; x++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.x = x;
            gridItem.dataset.y = y;

            // Логика работы на клик
            gridItem.addEventListener('click', function() {
                this.classList.toggle('selected')
                // const gridsText = document.getElementById("grids-container-text");

                // if(this.classList.contains("boom") && gridsText.innerText !== "Boom Joystick"){
                //     return;
                // }
                // // 🎇 Включаем "Boom" режим, если нажат submit или текст == "Boom Joystick"
                // if (this.classList.contains(".move-left")
                //     || this.classList.contains(".move-right")
                //     || this.classList.contains(".move-up")
                //     || this.classList.contains(".move-down")
                //     || gridsText.innerText === "Boom Joystick") {
                //     this.classList.toggle("boom");
                //     gridsText.innerText = "Boom Joystick";
                //     return;
                // }

                // // 🔒 Если элемент залочен:
                // if (this.classList.contains("locked")) {
                //     if(this.classList.contains("submit")){
                //         gridsText.innerText = "Joystick Items"
                //         this.classList.toggle("submit")
                //         this.classList.toggle("selected")
                //         clearJoystick();
                //     }
                //     if (this.classList.contains("selected")) {
                //         this.classList.toggle("selected");
                //         preLoadJoystick(gridItem);
                //     }
                //     return;
                // }

                // // 🟡 Если в состоянии преднажатия
                // if (this.classList.contains("preload")) {
                //     this.classList.toggle("selected");
                //     submitJoystick();
                //     return;
                // }

                // // 🎮 Если это joystick-клавиша
                // if (this.classList.contains("joystick")) {
                //     this.classList.toggle("selected");
                //     preLoadJoystick(gridItem);
                // }
            });

            gridContainer.appendChild(gridItem);
            gridItems.push(gridItem);
        }
    }

    setGrid(contentContainer, data)

    return contentContainer;
}

/**
 * Функция записи выигрышных элементов
 * @param {HTMLElement} choosenGrid Грид спина
 * @param {SpinDataType} data Данные спина
 */
function setGrid(choosenGrid, data){
    var sampleData = Mapper.SpinDataMapping(data)



    const gridItems = Object.values(choosenGrid.children[0].children)
    const array = data.winElements
    gridItems.forEach(item => {
        var target = [Number(item.dataset.x), Number(item.dataset.y)]
        var index = array.findIndex(
            item => item.length === target.length && item.every((val, idx) => val === target[idx])
        );

        if (index === -1){
            if(item.classList.contains('selected')){
                item.classList.remove('selected')
            }
        }
        else{
            if(!item.classList.contains('selected')){
                item.classList.add('selected')
            }
        }
    });
}

/**
 * Собирает информацию о выигрышных элементах
 * @param {HTMLElement} choosenGrid Грид, который отсматриваем
 * @returns {Array} [[0,0],[0,1]]
 */
function getGrid(choosenGrid){
    var selectedItems = []

    const gridItems = Object.values(choosenGrid.children[0].children)
    gridItems.forEach(item => {
        if (item.classList.contains('selected')) {
            // if(selectedItems[item.dataset.x] == null){
            //     selectedItems[item.dataset.x] = []
            // }
            // selectedItems[item.dataset.x].push(item.dataset.y)
            selectedItems.push([Number(item.dataset.x),Number(item.dataset.y)])
        }
    });

    return selectedItems;
}

/**
 * Ищем активный spin и забираем его грид и имя
 * @returns {object} {choosenGrid, selectedSpin}
 */
function getActiveGrid(){
    const gridsContainer = document.getElementById("grids-container");
    Object.values(gridsContainer.children).forEach(item=>{
        if(item.classList.contains("active")){
            choosenGrid = item;
            selectedSpin = item.id;
        }
    })

    return {choosenGrid, selectedSpin}
}

function getUpdatesOfSpin(){
    var {choosenGrid, selectedSpin} = getActiveGrid();
    var selectedItems = [];
    var selectedSymbol = document.getElementById('dropdown-container').children.item(0)
    selectedSymbol = selectedSymbol.options[selectedSymbol.selectedIndex].value


    previousData = MAINDATA.Spins[selectedSpin]
    const result = {
        name: selectedSpin,
        isWinUpdate: false,
        isConfigUpdate: false,
        isResizeUpdate: false,
        winData: null,
        resizeData: null,
        configData: null
    }

    selectedItems = getGrid(choosenGrid);
    if(selectedItems !== previousData.winElements || selectedItem !== previousData.winElement){
        result.isWinUpdate = true
        result.winData = new WinDataType(selectedSymbol, selectedItems)
    }

    const data = getSpinData();
    const checks = [
        {
            keys: ["width", "height", "elsByHeight", "elsByWidth"],
            flag: "isResizeUpdate",
            createData: () => new ResizeDataType(data.width, data.height, data.elsByHeight, data.elsByWidth),
            updateField: "resizeData",
        },
        {
            keys: ["spacingVertical", "spacingHorizontal", "slowMain", "slowLines", "slowWin"],
            flag: "isConfigUpdate",
            createData: () => new ConfigDataType(data.spacingHorizontal, data.spacingVertical, data.slowMain, data.slowLines, data.slowWin),
            updateField: "configData",
        },
    ];

    checks.forEach(({ keys, flag, createData, updateField }) => {
        if (keys.some(key => data[key] !== previousData[key])) {
            result[flag] = true;
            result[updateField] = createData();
        }
    });

    return result;
}
