function addPlantToSchedule(plant) {
    const body = {
        plant_id: plant.id,
        plant_nickname: plant.plant_nickname,
    };

    axios
        .post('/api/schedule/', body)
        .then((response) => {
            renderSchedule();
            const plantAddedNotification = document.createElement('div');
            plantAddedNotification.style =
                'background-color: rgb(20,83,45); width:100%; height:100%';

            plantAddedNotification.innerHTML = `
            <p class="text-center text-white my-4">${plant.name} added to schedule</p>
            `;

            page.appendChild(plantAddedNotification);
        })
        .catch((error) => {
            displayError(error.response.data.message);
        });
}
