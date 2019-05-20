import { connect } from "react-redux";
import EditSlideShow from './EditSlideShow';
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
        },
        deleteSlide: (payload)=>{
            dispatch({type: actions.DELETE_SLIDE, payload});
        },
        updateSlide: (payload)=>{
            dispatch({type: actions.UPDATE_SLIDE, payload});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSlideShow);