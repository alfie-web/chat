const initialState = {
            items: [],
            isFetching: false
};

export default (state = initialState, { type, payload }) => {
            switch (type) {
                        case "USERS:SET_ITEMS": 
                                    return {
                                                ...state,
                                                items: payload,
                                                isFetching: false
                                    };
                        case "USERS:SET_IS_FETCHING": 
                                    return {
                                                ...state,
                                                isFetching: payload
                                    };
                        default: 
                                    return state;
            }
}