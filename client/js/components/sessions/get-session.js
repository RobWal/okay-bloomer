function getSession() {
    return axios
        .get('/api/sessions')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}
