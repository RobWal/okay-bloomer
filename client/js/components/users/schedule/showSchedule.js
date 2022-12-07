function renderSchedule() {
    page.innerHTML = `
    <p class="error-location"></p>`;
    axios.get(`/api/schedule/`).then((response) => {
        const results = response.data;
        if (
            results.day.length == 0 &&
            results.week.length == 0 &&
            results.month.length == 0
        ) {
            const emptySchedule = document.createElement('div');
            emptySchedule.innerHTML = `
                <div class="text-center mt-12 mx-auto">
                    <div class="flex justify-center">
                        <img src="https://images.unsplash.com/photo-1570778003102-2036f73c5e60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" width='400px' height='auto' class="rounded-xl"/>
                    </div>
                    <p class="w-1/3 mx-auto mt-2 font-bold">
                        Theres nothing in your schedule! Go to the homepage and use the search function to find plants and add to schedule to keep track of maintainence for your plants.
                    </p>
                </div>`;
            page.appendChild(emptySchedule);
        }
        let resultID = '';
        const modalBox = document.createElement('div');
        modalBox.innerHTML = `
                    
                    <div class="modal-content w-60 flex justify-center flex-col content-center">
                    <span class="close-btn flex justify-end cursor-pointer">&times;</span>
                        <p>Enter new nickname</p>
                        <input type="text" class="modal-input w-1/2 mx-auto my-8 rounded px-4"  placeholder="Change plant name.." name="new-name" id="new-name" data-id="${resultID} id="${resultID}">
                        <button class="changeNickname" data-id="${resultID}" data-action="rename" data-inputfield="${resultID}-week">Change</button>
                    </div>
                    `;
        modalBox.classList.add('change-nickname-modal');
        page.appendChild(modalBox);
        let closeBtn = document.querySelector('.close-btn');
        closeBtn.onclick = function () {
            modalBox.style.display = 'none';
        };
        window.onclick = function (e) {
            if (e.target == modalBox) {
                modalBox.style.display = 'none';
            }
        };

        const dayContainer = document.createElement('div');
        const weekContainer = document.createElement('div');
        const monthContainer = document.createElement('div');
        dayContainer.classList.add('timeContainer');
        weekContainer.classList.add('timeContainer');
        monthContainer.classList.add('timeContainer');
        dayContainer.innerHTML =
            '<h1 class="text-center font-bold text-lg mt-12">To Do Today!</h1>';
        weekContainer.innerHTML =
            '<h1 class="text-center font-bold text-lg mt-8">To Do This Week!</h1>';
        monthContainer.innerHTML =
            '<h1 class="text-center font-bold text-lg mt-8">To Do This Month!</h1>';
        dayContainer.setAttribute('id', 'dayContainer');
        weekContainer.setAttribute('id', 'weekContainer');
        monthContainer.setAttribute('id', 'monthContainer');

        if (results.day.length == 0) {
            const emptyTimeframeContainer = document.createElement('div');
            emptyTimeframeContainer.innerHTML = `
            <div class="flex flex-nowrap  
                            w-2/3 py-8 px-6 
                            mx-auto my-3 justify-center 
                            bg-green-50 shadow-2xl
                            rounded-xl
                            shadow-black-500/40"">
                            <p class="text-lg"> Nothing to attend to today!</p>
                        </div>
            `;
            dayContainer.appendChild(emptyTimeframeContainer);
        }
        if (results.week.length == 0) {
            const emptyTimeframeContainer = document.createElement('div');
            emptyTimeframeContainer.innerHTML = `
            <div class="flex flex-nowrap  
                            w-2/3 py-8 px-6 
                            mx-auto my-3 justify-center 
                            bg-green-50 shadow-2xl
                            rounded-xl
                            shadow-black-500/40"">
                            <p class="text-lg"> Nothing to attend to this week!</p>
                        </div>
            `;
            weekContainer.appendChild(emptyTimeframeContainer);
        }
        if (results.month.length == 0) {
            const emptyTimeframeContainer = document.createElement('div');
            emptyTimeframeContainer.innerHTML = `
            <div class="flex flex-nowrap
                            w-2/3 py-8 px-6 
                            mx-auto my-3 justify-center 
                            bg-green-50 shadow-2xl
                            rounded-xl
                            shadow-black-500/40"">
                            <p class="text-lg"> Nothing to attend to this month!</p>
                        </div>
            `;
            monthContainer.appendChild(emptyTimeframeContainer);
        }

        results.day.forEach((result) => {
            const item = document.createElement('div');
            resultID = result.id;
            item.classList.add('schedule-result');
            item.innerHTML = `
                        <div class="item-container
                            w-2/3 py-8 px-6 
                            mx-auto my-3 justify-center 
                            bg-green-50 shadow-2xl
                            rounded-xl
                            shadow-black-500/40"">
                            <img class="rounded-xl" src="${result.img}" width='100px' height='auto'>
                            <div class="item-text">                                
                                <p class="text-center text-lg"> ${result.plantName} needs ${result.actionType}</p>
                            </div>
                            <div class="item-schedule-btns">
                                <button class="refreshTimer cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110" data-id="${result.id}" data-action="${result.actionType}">Task completed!</button>
                                <button class="openChangeNickname cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110" data-id="${result.id}" data-action="rename" data-inputfield="${result.id}-week">Change plant name</button>
                                <button class="deleteScheduleEntry cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110" data-id="${result.id}" data-action="delete" data-inputfield="${result.id}-week">Delete plant</button>
                            </div>
                        </div>
                `;
            dayContainer.appendChild(item);
        });
        page.appendChild(dayContainer);

        results.week.forEach((result) => {
            const item = document.createElement('div');
            resultID = result.id;
            item.classList.add('schedule-result');
            item.innerHTML = `
                        <div class="item-container
                            w-2/3 py-8 px-6 
                            mx-auto my-3
                            bg-green-50 shadow-2xl
                            rounded-xl
                            shadow-black-500/40"">
                            <img class="rounded-xl" src="${result.img}" width='100px' height='auto' src="${result.img}">
                            <div class="item-text">
                                <p class=" text-center text-lg"> ${result.plantName} needs ${result.actionType}</p>
                            </div>
                            <div class="item-schedule-btns">
                                <button class="refreshTimer cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110" data-id="${result.id}" data-action="${result.actionType}">Task completed!</button>
                                <button class="openChangeNickname cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110" data-id="${result.id}" data-action="rename" data-inputfield="${result.id}-week">Change plant name</button>
                                <button class="deleteScheduleEntry cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110" data-id="${result.id}" data-action="delete" data-inputfield="${result.id}-week">Delete plant</button>
                            </div>
                        </div>
                `;

            weekContainer.appendChild(item);
        });
        page.appendChild(weekContainer);

        results.month.forEach((result) => {
            const item = document.createElement('div');
            resultID = result.id;
            item.classList.add('schedule-result');
            item.innerHTML = `
                        <div class="item-container
                            w-2/3 py-8 px-6 
                            mx-auto my-3 justify-center 
                            bg-green-50 shadow-2xl
                            rounded-xl
                            shadow-black-500/40">
                            <img class="rounded-xl" src="${result.img}" width='100px' height='auto' src="${result.img}">
                            <div class="item-text">
                                <p class="text-center text-lg"> ${result.plantName} needs ${result.actionType}</p>
                            </div>
                            <div class="item-schedule-btns">
                                <button class="openChangeNickname cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110" data-id="${result.id}" data-action="rename" data-inputfield="${result.id}-month">Change plant name</button>
                                <button class="deleteScheduleEntry cursor-pointer hover:text-green-800 ease-in duration-200 hover:underline hover:font-bold hover:scale-110" data-id="${result.id}" data-action="delete" data-inputfield="${result.id}-week">Delete plant</button>
                            </div>
                        </div>
                `;
            monthContainer.appendChild(item);
        });
        page.appendChild(monthContainer);
        document.querySelectorAll('button.refreshTimer').forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                updateSchedule(button.dataset.action, button.dataset.id);
            });
        });
        document
            .querySelectorAll('button.openChangeNickname')
            .forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    changeNicknameModal = document.querySelector(
                        '.change-nickname-modal'
                    );
                    changeNicknameModal.style.display = 'block';
                    changeNicknameModal.dataset.inputField = button.dataset.id;
                    changeNicknameModal.dataset.id = button.dataset.id;
                    changeNicknameModal.dataset.action = button.dataset.action;
                });
            });
        document.querySelectorAll('button.changeNickname').forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const nicknameModal = document.querySelector(
                    '.change-nickname-modal'
                );
                const newName = document.getElementById('new-name').value;

                updateSchedule(
                    nicknameModal.dataset.action,
                    nicknameModal.dataset.id,
                    newName
                );
            });
        });
        document
            .querySelectorAll('button.deleteScheduleEntry')
            .forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    deleteScheduleEntry(button.dataset.id);
                });
            });
    });
}
