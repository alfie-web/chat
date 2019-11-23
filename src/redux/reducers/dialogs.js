const initialState = {
            items: [],
            currentDialogId: null,
            isFetching: false
};

export default (state = initialState, { type, payload }) => {
            switch (type) {
                        case "DIALOGS:SET_ITEMS": 
                                    return {
                                                ...state,
                                                items: payload,
                                                isFetching: false
                                    };
                        case "DIALOGS:SET_CURRENT_DIALOG_ID": 
                                    return {
                                                ...state,
                                                currentDialogId: payload
                                    };
                        case "DIALOGS:SET_NEW": 
                                    return {
                                                ...state,
                                                items: [...state.items, payload]
                                                // items: !state.items.find(item => item.user._id === payload.user._id) ? [...state.items, payload] : [...state.items]
                                    };
                        case "DIALOGS:SET_IS_FETCHING": 
                                    return {
                                                ...state,
                                                isFetching: payload
                                    };
                        default: 
                                    return state;
            }
}