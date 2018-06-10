import { connect } from 'react-redux';
import ViewApp from '../components/App';
import { changeData } from '../actions';

const mapDispatchToProps = (dispatch) => ({
    timer: () => {
        dispatch(changeData())
    },
});

const App = connect(
    null,
    mapDispatchToProps
)(ViewApp);

export default App;
