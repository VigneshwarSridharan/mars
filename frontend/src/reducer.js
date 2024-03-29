import { combineReducers } from 'redux';
import Reports from './views/Trading/reducer';
import SymbolInfo from './views/SymbolInfo/reducer';
import Chatting from './views/Chatting/reducer';
import BugCatcher from './views/BugCatcher/reducer';
import BugDetails from './views/BugDetails/reducer';


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
    Chatting,
    Reports,
    SymbolInfo,
    BugCatcher,
    BugDetails
})