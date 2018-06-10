import { connect } from 'react-redux';
import ViewPie from '../../components/chart/Pie';

const mapStateToProps = (state) => state.setPie;

const Pie = connect(
    mapStateToProps
)(ViewPie);

export default Pie;
