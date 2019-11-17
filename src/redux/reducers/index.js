import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import app from './app';
import dialogs from './dialogs';
import messages from './messages';
import auth from './auth';

export default combineReducers({
            app,
            dialogs,
            messages,
            auth,
            form: formReducer
});