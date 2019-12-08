export const setSearchText = (store, searchText) => {
    store.setState({ searchText });
};

export const setMovies = (store, movies) => {
    store.setState({ movies });
};

export const setPage = (store, page) => {
    store.setState({ page });
};

export const setTotalResults = (store, totalResults) => {
    store.setState({ totalResults });
};