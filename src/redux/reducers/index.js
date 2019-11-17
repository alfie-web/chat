import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dialogs from './dialogs';
import messages from './messages';
import auth from './auth';

export default combineReducers({
            dialogs,
            messages,
            auth,
            form: formReducer
});