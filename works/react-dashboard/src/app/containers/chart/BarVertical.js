import { connect } from 'react-redux';
import ViewBarVertical from '../../components/chart/BarVertical';

const mapStateToProps = (state) => state.setBarVertical;

const BarVertical = connect(
    mapStateToProps
)(ViewBarVertical);

export default BarVertical;
