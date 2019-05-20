import { connect } from "react-redux";
import ContentArea from './ContentArea';
import * as actions from '../../store/redux/actions'



const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        initialLoad: ()=>{
            dispatch({type: actions.LIST_SLIDESHOWS});
            dispatch({type: actions.LIST_SLIDES});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentArea);