const initialState = {
            user: null,
            token: null,
            isAuth: false,
            isFetching: false
};

export default (state = initialState, { type, payload }) => {
            switch (type) {
                        case "AUTH:ME": 
                                    return {
                                                ...state,
                                                token: payload.token,
                                                isFetching: false
                                    };
                        case "AUTH:SET_USER_PROFILE": 
                                    return {
                                                ...state,
                                                isAuth: true,
                                                user: payload
                                    };
                        default: 
                                    return state;
            }
}