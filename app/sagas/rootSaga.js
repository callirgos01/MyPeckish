import { put, takeEvery, all } from 'redux-saga/effects'

export function* watchFetchRecipes() {
  yield takeEvery('FETCH_RECIPES', callFetchRecipes);
}
export function* watchSetSearchedRecipes() {
  yield takeEvery(SET_SEARCHED_RECIPES, incrementAsync);
}

export default function* rootSaga() {
    yield all([
        watchFetchRecipes(),
        watchSetSearchedRecipes()
    ]);
}