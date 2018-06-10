import { connect } from 'react-redux';
import ViewThemeStyle from '../../components/header/ThemeStyle';

const mapStateToProps = (state) => state.setThemeStyle;

const ThemeStyle = connect(
    mapStateToProps
)(ViewThemeStyle);

export default ThemeStyle;
