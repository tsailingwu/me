import { combineReducers } from 'redux';
import setPie from './chart/Pie';
import setBarHorizontal from './chart/BarHorizontal';
import setBarVertical from './chart/BarVertical';
import setLine from './chart/Line';

const myStore = combineReducers({
    setPie,
    setBarHorizontal,
    setBarVertical,
    setLine,
});

export default myStore;
