export const setSearchText = (store, searchText) => {
    store.setState({ searchText })
}

export const setMovies = (store, movies) => {
    store.setState({ movies })
}

export const setPage = (store, page) => {
    store.setState({ page })
}

export const setTotalResults = (store, totalResults) => {
    store.setState({ totalResults })
}

export const setType = (store, type) => {
    store.setState({ type })
}

export const setYear = (store, year) => {
    store.setState({ year })
}