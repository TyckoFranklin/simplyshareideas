import { connect } from "react-redux";
import PreviewGuide from './EditGuide';
import * as actions from '../../../store/redux/actions'



const mapStateToProps = (state) => {
    return {
        usersGuides : state.usersGuides,
        currentUser : state.currentUser,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserGuide: (payload) => {
            dispatch({type: actions.UPDATE_USER_GUIDE, payload})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewGuide);