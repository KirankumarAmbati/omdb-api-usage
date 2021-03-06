import React from "react"
import useGlobalHook from "../utils/use-global-hook"
import * as actions from "../actions"

const initialState = {
  movies: [],
  searchText: '',
  totalResults: 0,
  page: 1,
  type: undefined,
  year: undefined
}

export default useGlobalHook(React, initialState, actions)