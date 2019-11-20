const initialState = {
            items: null,
            isFetching: false
};

export default (state = initialState, { type, payload }) => {
            switch (type) {
                        case "MESSAGES:SET_ITEMS": 
                                    return {
                                                ...state,
                                                items: payload,
                                                isFetching: false
                                    };
                        case "MESSAGES:ADD_NEW_TEXT_MESSAGE": 
                                    return {
                                                ...state,
                                                items: [...state.items, payload]
                                    };
                        case "MESSAGES:SET_IS_FETCHING": 
                                    return {
                                                ...state,
                                                isFetching: payload
                                    };
                        default: 
                                    return state;
            }
}