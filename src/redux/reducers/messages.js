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
                        case "MESSAGES:SET_IS_FETCHING": 
                                    return {
                                                ...state,
                                                isFetching: payload
                                    };
                        default: 
                                    return state;
            }
}