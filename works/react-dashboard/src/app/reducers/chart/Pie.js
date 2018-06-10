const setPie = (state = {
    data: [2, 19, 3, 5, 2, 3],
    count: 0,
}, action) => {
    switch (action.type) {
        case 'changeData':
            let data = [];
            switch (state.count) {
                case 0:
                    return Object.assign({}, state, {
                        data: [1, 2, 3, 4, 5, 20],
                        count: 1
                    });
                case 1:
                    return Object.assign({}, state, {
                        data: [20, 5, 4, 3, 2, 1],
                        count: 2
                    });
                case 2:
                    return Object.assign({}, state, {
                        data: [2, 19, 3, 5, 2, 3],
                        count: 0
                    });
            }
        default:
            return state;
    }
}

export default setPie;
