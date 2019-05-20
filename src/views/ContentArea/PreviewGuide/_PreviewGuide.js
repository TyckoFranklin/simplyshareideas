import { connect } from "react-redux";
import PreviewGuide from './PreviewGuide';



const mapStateToProps = (state) => {
    return {
        usersGuides : state.usersGuides,
        currentUser : state.currentUser,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewGuide);