import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import questionReducer from './questions';
import answersReducer from './answers';
import tagsReducer from './tags';
import commentsReducer from './comments';

const rootReducer = combineReducers({
  session,
  questionsState: questionReducer,
  answersState: answersReducer,
  tagsState: tagsReducer,
  commentsState: commentsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
