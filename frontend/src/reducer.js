import { combineReducers } from 'redux';
import Reports from './views/Trading/reducer';
import SymbolInfo from './views/SymbolInfo/reducer';



const Dashboard = (state = { name: 'dashboard' }, action) => {
    switch (action.type) {
        case 'UPDATE_INFO':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
};

export default combineReducers({
    Dashboard,
    Reports,
    SymbolInfo
})