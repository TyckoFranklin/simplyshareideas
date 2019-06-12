import React, { Component } from 'react';
import './EditSlideShow.css';
import { overlay } from '../overlay'
import {sortMapByProperty} from '../../../utilities/sort'


class EditSlideShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMainContent: true,
            userContentId: undefined,
            showSlideshow: false,
            createSlide:{},

        }
    }

    componentDidMount = () => {
        // this.props.listUsers();
        this.setupStuff();
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setupStuff();
        }
    }

    setupStuff = () => {
        const sorted = sortMapByProperty(this.props.slides, "order");
        this.setState({sortedItems: sorted})
    }

    handleReturn = () => {
        this.setState({ showMainContent: true, slideshowId: undefined })
    }

    handleSlidshowClick = (key, owner) => {
        this.setState({
            showMainContent: false,
            slideshowId: key
        })
    }

    handleFilterReset = () => {
        this.setState({ filtered: false, filterText: "" });
    }

    handleFilterChange = (e) => {
        this.setState({ filtered: true, filterText: e.target.value });
    }

    handleAddSlideshow = () => {
        // this.setState({
        //     showSlideshow: true,
        // })
        this.setState({
            showMainContent: true,
            createSlideshow: true,
        })
    }

    handleOverlayRef = (ref) => {
        // this.overlayRef = ref;
        // document.body.appendChild(this.overlayRef);
        // this.overlayRef.requestFullscreen();
        // window.addEventListener("keydown", (e)=>{
        //     console.log(e.key);
        //     if (e.key === "Escape") {
        //         document.body.removeChild(this.overlayRef);
        //         this.setState({
        //             showSlideshow: false,
        //         })
        //     }
        // })
    }
    //viewUserGuide(this.props.usersGuides.get(this.state.userContentId))
    renderSlideShow = () => {
        // return (
        //     <div className="preview-guide-content">
        //         {this.state.userContentId === -1 ? : }
        //     </div>
        // )
    }


    handleCreateSlideshow = () => {
        this.props.createSlideshow({ title: this.state.createName });
        this.setState({ createSlideshow: false, });
    }

    handleCreateSlide = () => {
        this.props.createSlide({...this.state.createSlide, slideSlideshowId:this.state.slideshowId});
        this.setState({ createSlide: {}});
    }

    handleCreateNameChange = (e) => {
        this.setState({ createName: e.target.value });
    }

    handleSlideInputs = (e, path) => {
        if(path === "pictures"){
            this.setState({ createSlide: {...this.state.createSlide, [path]:e.target.files[0]}});
        } else {
            this.setState({ createSlide: {...this.state.createSlide, [path]:e.target.value }});
        }
    }

    renderSlideshowList = () => {
        let elements = [];
        if (this.state.createSlideshow) {
            elements.push(
                <div className="slideshow" >
                    <input onChange={this.handleCreateNameChange} value={this.state.createName} />
                    <button onClick={this.handleCreateSlideshow}>Create!</button>
                </div>
            )
        } else {
            for (let [key, value] of this.props.slideshows) {
                if (this.state.filtered && !value.name.toLowerCase().includes(this.state.filterText.toLowerCase())) {
                    continue;
                }
                elements.push(
                    <div key={`slideshow${key}`} className="slideshow" onClick={() => this.handleSlidshowClick(key, value.owner)}>
                        <div className="user-name" >
                            {value.title}
                        </div>
                    </div>
                )
            }
        }
        return elements;
    }

    handleEditChange = (e, key, property) => {
        const items = this.state.sortedItems;
        const item = items.get(key);
        item[property] = e.target.value;
        items.set(key, item);
        this.setState({sortedItems:items})
    }

    handleSave = (key) =>{
        this.props.updateSlide({key, value:this.state.sortedItems.get(key)});
    }

    renderSlideshow = () => {
        let elements = [];
        const { sortedItems } = this.state;
        for (let [key, value] of sortedItems) {
            if (!value.slideshow || this.state.slideshowId !== value.slideshow.id) {
                continue;
            }
            elements.push(
                <div key={`slideshow${key}`} className="slideshow">
                    <div className="button" onClick={()=>this.props.deleteSlide(key)} >
                        delete
                    </div>
                    <div className="button" onClick={()=>this.handleSave(key)} >
                        save
                    </div>
                    <br/>
                    <textarea value={value.content} onChange={(e)=>this.handleEditChange(e, key, "content")}/>
                    <br/>
                    <input value={value.order} type="number"onChange={(e)=>this.handleEditChange(e, key, "order")}/>
                    <br/>
                    <textarea value={value.config} onChange={(e)=>this.handleEditChange(e, key, "config")}/>
                    <br/>
                    {value.files ? <div className="user-name" >
                        <img src={this.props.files.get(value.files[0])}></img>
                    </div>
                : null}
                </div>
            )

        }
            elements.push(
                <div className="slideshow" >
                    <label>add new slide</label>
                    <br/>
                    <textarea onChange={(e)=>this.handleSlideInputs(e, "content")} value={this.state.createSlide.content} />
                    <br/>
                    <input onChange={(e)=>this.handleSlideInputs(e, "order")} value={this.state.createSlide.order} />
                    <br/>
                    <textarea onChange={(e)=>this.handleSlideInputs(e, "config")} value={this.state.createSlide.config} />
                    <br/>
                    <input type="file" onChange={(e)=>this.handleSlideInputs(e, "pictures")} />
                    <br/>
                    <button onClick={this.handleCreateSlide}>Create!</button>
                </div>
            )


        return elements;
    }

    render() {
        return (
            !this.state.showSlideshow ? <div className="edit-slides">
                <div className="edit-slides-header">
                    {this.state.showMainContent ?
                    <React.Fragment>
                        <div className="filter" >
                            <label>Filter Name</label>
                            <input type="text" value={this.state.filterText} onChange={this.handleFilterChange}></input>
                        </div>
                        <div className="button filter-button" onClick={this.handleFilterReset}>Reset Filter</div>
                        <div className="button filter-button" onClick={this.handleAddSlideshow}>Add New Slideshow</div>
                    </React.Fragment>
                    :
                    <div className="button filter-button" onClick={this.handleReturn}>Return To Slideshow List</div>}
                </div>
                <div className="edit-slides-container">
                    {this.state.showMainContent ? this.renderSlideshowList() : this.renderSlideshow()}
                </div>
            </div>
                :
                overlay(this.handleOverlayRef)
        );
    }
}

export default EditSlideShow;
