import { connect } from 'react-redux';
import ViewBarHorizontal from '../../components/chart/BarHorizontal';

const mapStateToProps = (state) => state.setBarHorizontal;

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const BarHorizontal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewBarHorizontal);

export default BarHorizontal;
