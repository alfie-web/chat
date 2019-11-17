const initialState = {
            initialized: false,
            isFetching: false
};

export default (state = initialState, { type, payload }) => {
            switch (type) {
                        case "APP:SET_INITIALIZED": 
                                    return {
                                                ...state,
                                                initialized: true,
                                                isFetching: false
                                    };
                        case "APP:SET_IS_FETCHING": 
                                    return {
                                                ...state,
                                                isFetching: payload
                                    };
                        default: 
                                    return state;
            }
}