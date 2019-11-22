import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import app from './app';
import auth from './auth';
import users from './users';
import dialogs from './dialogs';
import messages from './messages';

export default combineReducers({
            app,
            auth,
            users,
            dialogs,
            messages,
            form: formReducer
});