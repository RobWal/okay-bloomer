renderAppWithoutSession();
renderAppWithSession();

console.log(`Initializing`);

function renderAppWithoutSession() {
    renderHeader();
    renderSearch();
};

function renderAppWithSession() {
    getSession().then((session) => {
        renderHeader(session);
        renderSearch();
    });
};
