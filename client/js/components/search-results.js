const resultsContainer = document.createElement('section');

function renderSearchResults(searchQuery) {
    resultsContainer.innerHTML = '';
    axios.get(`/api/plants?search=${searchQuery}`).then((response) => {
        const results = response.data;

        results.forEach((result) => {
            const item = document.createElement('div');
            item.innerHTML = `
                <div id="search-result" onClick="renderPlant(${result.id})" class="flex flex-wrap  w-2/3 py-8 px-6 m-auto justify-center gap-5 bg-white shadow-2xl shadow-black-500/40">
                    <div id="search-result-container" class="flex flex-row gap-4 ">    
                        <img src="${result.image_url}" class="rounded h-auto w-52 cursor-pointer"/>
                    <div class="flex flex-col justify-center">
                        <h3 class="text-2xl" > ${result.name} </h3>
                        <p class="italic">Latin name: ${result.latin_name}</p>
                        <div class="w-full h-px bg-black my-1"></div>
                        <p> ${result.description}</p>
                        <a href="#####" class=" text-green-900 hover:text-green-600 ease-in duration-200 mt-1">Learn more about ${result.name} here</a>
                    </div>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(item);
        });
        page.appendChild(resultsContainer);
    });
}
