renderAppWithoutSession();
renderAppWithSession();

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
