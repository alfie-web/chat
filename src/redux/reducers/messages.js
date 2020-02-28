const initialState = {
            items: null,
        //     lastMessage: null,
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
                        case "MESSAGES:DELETE_MESSAGE": 
                                    return {
                                                ...state,
                                                items: state.items.filter(item => item._id !== payload)
                                    };
                        // case "MESSAGES:SET_LAST_MESSAGE": 
                        //             return {
                        //                         ...state,
                        //                         lastMessage: payload ? payload : state.items[state.items.length - 1]
                        //             };
                        case "MESSAGES:SET_IS_FETCHING": 
                                    return {
                                                ...state,
                                                isFetching: payload
                                    };
                        default: 
                                    return state;
            }
}