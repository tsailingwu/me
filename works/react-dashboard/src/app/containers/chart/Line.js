import { connect } from 'react-redux';
import ViewLine from '../../components/chart/Line';

const mapStateToProps = (state) => state.setLine;

const Line = connect(
    mapStateToProps
)(ViewLine);

export default Line;
