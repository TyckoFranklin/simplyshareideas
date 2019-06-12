import React, { Component } from 'react';
import './Present.css';
import { exportCSS } from './export';
import { overlay } from '../overlay'
import ReactMarkdown from 'react-markdown';
import { sortMapByProperty } from '../../../utilities/sort'


class Present extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMainContent: true,
            slideShowId: undefined,
            showSlideshow: false,
            createSlide: {},
            currentSlide: 0,
            incoming: "",
            outgoing: "",
            firstSlideRender: true,
        }

    }

    componentDidMount = () => {
        this.fragment = document.createDocumentFragment();
        this.updateSlideIndexes(this.props, this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateFullScreen();
        this.updateSlideIndexes(prevProps, prevState);
        // if(this.state.renderExport && prevState.renderExport){
        if(this.exportRef){
            let height = window.outerHeight;
            let width = window.outerWidth;
            let myWindow = window.open(window.location.href, "MsgWindow", `width=${width},height=${height}`);
            let htmlBody = this.exportRef.outerHTML;
            setTimeout(()=>{
                // myWindow.document.body.innerHTML = htmlBody
                myWindow.document.body.innerHTML = "<body></body>";
                myWindow.document.write(htmlBody);
                myWindow.document.write(exportCSS);
            }, 5000);
            this.setState({renderExport:false});
            // document.body.innerHTML = this.exportRef.outerHTML;
            // document.body.innerHTML += exportCSS;
        }
    }

    handleReturn = () => {
        this.setState({ showMainContent: false })
    }

    handleSlideshowClick = (key, owner) => {
        this.setState({
            showMainContent: false,
            showSlideshow: true,
            slideShowId: key
        })
    }

    handleFilterReset = () => {
        this.setState({ filtered: false, filterText: "" });
    }

    handleFilterChange = (e) => {
        this.setState({ filtered: true, filterText: e.target.value });
    }

    handleLeftArrow = () => {
        this.setState({
            nextSlide: this.state.currentSlide,
            currentSlide: this.state.previousSlide,
            previousSlide: this.state.previousSlide === 0 ? this.state.sortedSlides.length - 1 : this.state.previousSlide - 1,
            incomingSlide: this.state.previousSlide,
            outgoingSlide: this.state.currentSlide,
            firstSlideRender: false,
        })
    }

    handleRightArrow = () => {
        this.setState({
            currentSlide: this.state.nextSlide,
            previousSlide: this.state.currentSlide,
            nextSlide: this.state.nextSlide === this.state.sortedSlides.length - 1 ? 0 : this.state.nextSlide + 1,
            incomingSlide: this.state.nextSlide,
            outgoingSlide: this.state.currentSlide,
            firstSlideRender: false,
        })
    }

    keydownEventListener = (e) => {
        if (e.key === "Escape") {
            this.handleEscape();
        }
        if (e.key === "ArrowLeft") {
            this.handleLeftArrow();
        }
        if (e.key === "ArrowRight" || e.key === "Enter") {
            this.handleRightArrow();
        }
    }

    handleEscape = () => {
        window.removeEventListener("keydown", this.keydownEventListener);
        window.removeEventListener("touchstart", this.handleTouchStart);
        window.removeEventListener("touchmove", this.handleTouchMove);
        window.removeEventListener("touchend", this.handleTouchEnd);
        window.removeEventListener("fullscreenchange", this.handleDeviceBackButton);
        this.isFullScreen = false;
        this.setState({
            showMainContent: true,
            slideShowId: undefined,
            showSlideshow: false,
            firstSlideRender: true,
        })

    }

    updateSlideIndexes = (prevProps, prevState) => {
        if (prevProps.slides !== this.props.slides || prevState.showSlideshow !== this.state.showSlideshow) {
            const sortedSlides = [...sortMapByProperty(this.props.slides, "order").values()].filter((value) => {
                return value.slideshow && value.slideshow.id === this.state.slideShowId;
            });
            const previousSlide = this.state.currentSlide === 0 ? sortedSlides.length - 1 : this.state.currentSlide - 1;
            const nextSlide = this.state.currentSlide === sortedSlides.length - 1 ? 0 : this.state.currentSlide + 1;
            this.setState({ sortedSlides, nextSlide, previousSlide })
        }

    }

    updateFullScreen = () => {
        if (this.overlayRef && !this.isFullScreen) {
            document.body.requestFullscreen();
            window.addEventListener("keydown", this.keydownEventListener);
            window.addEventListener("touchstart", this.handleTouchStart);
            window.addEventListener("touchmove", this.handleTouchMove);
            window.addEventListener("touchend", this.handleTouchEnd);
            setTimeout(() => window.addEventListener("fullscreenchange", this.handleDeviceBackButton), 500);
            this.isFullScreen = true;
        }
    }

    handleDeviceBackButton = () => {
        this.handleEscape();
    }

    handleDeleteSlide = (key) => {
        this.props.deleteSlide(key);
    }

    handleTouchStart = (e) => {
        const touchobj = e.changedTouches[0];
        this.startX = touchobj.pageX;
        this.startY = touchobj.pageY;
        this.startTime = new Date().getTime();
        e.preventDefault()
    }

    handleTouchMove = (e) => {
        // e.preventDefault() // prevent scrolling when inside DIV
    }

    handleTouchEnd = (e) => {
        let allowedTime = 5000;
        let threshold = 10;
        let touchobj = e.changedTouches[0];
        let dist = touchobj.pageX - this.startX // get total dist traveled by finger while in contact with surface
        let elapsedTime = new Date().getTime() - this.startTime; // get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        // let swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - this.startY) <= 100);
        let swiperightBol = (elapsedTime <= allowedTime && Math.abs(dist) >= threshold && Math.abs(touchobj.pageY - this.startY) <= 100);
        e.preventDefault()
        if (swiperightBol) {
            if (dist > 0) {
                this.handleLeftArrow();
            } else {
                this.handleRightArrow();
            }

        }
    }

    handleOverlayRef = (ref) => {
        this.overlayRef = ref;
    }

    handleIncreaseSize = () => {
        const html = document.querySelector("html");
        let fontSize = html.style.fontSize.replace(/\D/g, "");
        fontSize = fontSize === "" ? "16px" : (+fontSize + 2) + "px";
        html.style.fontSize = fontSize;
    }

    handleDecreaseSize = () => {
        const html = document.querySelector("html");
        let fontSize = html.style.fontSize.replace(/\D/g, "");
        fontSize = fontSize === "" ? 16 : +fontSize - 2;
        fontSize = fontSize < 1 ? 2 : fontSize;
        html.style.fontSize = fontSize + "px";
    }

    renderForOverlay = () => {
        let elements = [];
        const sorted = this.state.sortedSlides;
        if (!sorted || sorted.length === 0) {
            return;
        }
        const valueCurrent = sorted[this.state.currentSlide];
        const valuePrevious = sorted[this.state.previousSlide];
        const valueNext = sorted[this.state.nextSlide];
        let config = {};
        try {
            config = JSON.parse(valueCurrent.config);
        } catch (e) {

        }

        const contentCurrent = valueCurrent.files ? valueCurrent.content.replace("S3IMAGE", this.props.files.get(valueCurrent.files[0])) : valueCurrent.content;
        const contentPrevious = valuePrevious.files ? valuePrevious.content.replace("S3IMAGE", this.props.files.get(valuePrevious.files[0])) : valuePrevious.content;
        const contentNext = valueNext.files ? valueNext.content.replace("S3IMAGE", this.props.files.get(valueNext.files[0])) : valueNext.content;

        /* Figure out what slide is coming in, and from which direction  */
        let previousSlideClass = "hidden";
        let currentSlideClass = "";
        let nextSlideClass = "hidden";

        const { incomingSlide, outgoingSlide } = this.state;
        if (!this.state.firstSlideRender) {
            if ((incomingSlide < outgoingSlide && !(this.state.sortedSlides.length - 1 === outgoingSlide && 0 === incomingSlide)) || (this.state.sortedSlides.length - 1 === incomingSlide && 0 === outgoingSlide)) {
                previousSlideClass = "hidden";
                currentSlideClass = "incoming left-to-right";
                nextSlideClass = "outgoing left-to-right";
            } else {
                previousSlideClass = "outgoing right-to-left";
                currentSlideClass = "incoming right-to-left";
                nextSlideClass = "hidden";
            }
        }

        setTimeout(this.handleTimeoutForCSS, 50);

        return (
            <div className="display-container">
                <div className="slide-info">
                    Slide {this.state.currentSlide + 1} of {sorted.length}
                </div>
                <div className="slide-control">
                    <div className="slide-control-option" onClick={this.handleDecreaseSize} onTouchStart={this.handleDecreaseSize}>
                        Decrease Size
                    </div>
                    <div className="slide-control-option" onClick={this.handleIncreaseSize} onTouchStart={this.handleIncreaseSize}>
                        Increase Size
                    </div>
                </div>
                <div key={this.state.previousSlide} className={`display-area previous ${previousSlideClass}`}>
                    <ReactMarkdown source={contentPrevious} />
                </div>
                <div key={this.state.currentSlide} className={`display-area current ${currentSlideClass}`}>
                    <ReactMarkdown source={contentCurrent} />
                </div>
                <div key={this.state.nextSlide} className={`display-area next ${nextSlideClass}`}>
                    <ReactMarkdown source={contentNext} />
                </div>
            </div>
        );
    }

    handleTimeoutForCSS = () => {
        let previous = document.querySelector('.display-area.previous');
        let current = document.querySelector('.display-area.current');
        let next = document.querySelector('.display-area.next');

        // previous.classList.add("hidden");
        // next.classList.add("hidden");
        // previous.classList.remove("outgoing", "incoming", "left-to-right", "right-to-left");
        // next.classList.remove("outgoing", "incoming", "left-to-right", "right-to-left");
        // current.classList.remove("outgoing", "incoming", "left-to-right", "right-to-left");

        const { incomingSlide, outgoingSlide } = this.state;
        // && !(this.state.sortedSlides.length - 1 === outgoingSlide && 0 === incomingSlide)
        if (!this.state.firstSlideRender) {
            if ((incomingSlide < outgoingSlide && !(this.state.sortedSlides.length - 1 === outgoingSlide && 0 === incomingSlide)) || (this.state.sortedSlides.length - 1 === incomingSlide && 0 === outgoingSlide)) {
                // next.classList.remove("hidden");
                // next.classList.add("outgoing", "left-to-right");
                // current.classList.add("incoming", "left-to-right");
                next.classList.add("animate");
                current.classList.add("animate");
            } else {
                // previous.classList.remove("hidden");
                // previous.classList.add("outgoing", "right-to-left");
                // current.classList.add("incoming", "right-to-left");
                previous.classList.add("animate");
                current.classList.add("animate");
            }
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
                    <div key={`slideshow${key}`} className="slideshow" >
                        <div className="user-name" onClick={() => this.handleSlideshowClick(key, value.owner)} >
                            {value.title}
                        </div>
                        <div className="export"  onClick={()=>{this.setState({renderExport:true, slideShowId: key})}}>
                            export
                        </div>
                    </div>
                )
            }
        }
        return elements;
    }

    renderExport = () => {
        const sorted = [...sortMapByProperty(this.props.slides, "order").values()].filter((value) => {
            return value.slideshow && value.slideshow.id === this.state.slideShowId;
        });
        let elements = [];
        sorted.forEach((slide, i)=>{
            const contentCurrent = slide.files ? slide.content.replace("S3IMAGE", this.props.files.get(slide.files[0])) : slide.content;
            elements.push(
            <div className="overlay">
                <div className="display-container-export ">
                    <div className="slide-info">
                        Slide {i+1} of {sorted.length}
                    </div>

                    <div key={i+1} className={`display-area current`}>
                        <ReactMarkdown source={contentCurrent} />
                    </div>
                </div>
            </div>);
        });
        return (
            <div className="export-render" ref={(r)=>{this.exportRef = r}} >
                {elements}
            </div>
        )
    }

    render() {
        return (
            !this.state.showSlideshow ? (<div className="edit-slides">
                <div className="edit-slides-header">
                    <div className="filter" >
                        <label>Filter Name</label>
                        <input type="text" value={this.state.filterText} onChange={this.handleFilterChange}></input>
                    </div>
                    <div className="button filter-button" onClick={this.handleFilterReset}>Reset Filter</div>
                </div>
                <div className="edit-slides-container">
                    {this.state.showMainContent ? this.renderSlideshowList() : null}
                </div>
                {this.state.renderExport ? this.renderExport() : null}
            </div>)
                :
                overlay(this.handleOverlayRef, this.renderForOverlay)
        );
    }
}

export default Present;
