import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dialogs from './dialogs';
import messages from './messages';

export default combineReducers({
            dialogs,
            messages,
            form: formReducer
});