import { connect } from "react-redux";
import Present from './Present';
import * as actions from '../../../store/redux/actions'



const mapStateToProps = (state) => {
    return {
        slideshows : state.slideshows,
        slides : state.slides,
        files : state.files,
        users : state.users,
        currentUser : state.currentUser,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSlideshow: (payload)=>{
            dispatch({type: actions.CREATE_SLIDESHOW, payload});
        },
        createSlide: (payload)=>{
            dispatch({type: actions.CREATE_SLIDE, payload});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Present);