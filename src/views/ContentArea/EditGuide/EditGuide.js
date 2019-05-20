import React, { Component } from 'react';
import { viewUserGuide } from '../shared';
import './EditGuide.css';


class EditGuide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userContent: props.usersGuides.get(props.currentUser.id)
        }

    }

    componentWillReceiveProps = (preProps) => {
        if (preProps.userContent !== this.props.userContent) {
            this.setState({ userContent: this.props.usersGuides.get(this.props.currentUser.id) })
        }
    }

    componentDidMount = () => {
    }

    notImplemented = () => {
        alert("Not Implemented Yet");
    }

    handleChanges = (value, id) => {
        this.setState({ userContent: { ...this.state.userContent, [id]: value } })
    }

    handleFocus = (e) => {
        e.target.style.height = "";
        const height = 16 < e.target.scrollHeight ? e.target.scrollHeight : 16;
        e.target.style.height = height + "px"
    }

    handleBlur = (e) => {
        const target = e.target;
        setTimeout(()=>{target.style.height = "1rem"}, 250);
    }

    handleRevert = () => {
        this.setState({ userContent: this.props.usersGuides.get(this.props.currentUser.id) });
    }

    handleSave = () => {
        let payload = {
            ...this.state.userContent
        }
        delete payload.user;
        this.props.updateUserGuide(payload);
    }

    renderEditUserGuide = () => {
        const { userContent } = this.state;
        if(userContent === null || userContent === undefined){
            return null;
        }
        return (
            <div key={"edit-guide-content"} className="edit-guide-content">
                <div key={"name"} className="user-content">
                    <div className="title">
                        Name:
                </div>
                    <textarea value={userContent.name} onChange={(e) => { this.handleChanges(e.target.value, "name") }} onInput={this.handleFocus} onFocus={this.handleFocus} onBlur={this.handleBlur}></textarea>
                </div>
                <div key={"socialStyle"} className="user-content">
                    <div className="title">
                        Social Style:
                </div>
                    <textarea value={userContent.socialStyle} onChange={(e) => { this.handleChanges(e.target.value, "socialStyle") }} onInput={this.handleFocus} onFocus={this.handleFocus} onBlur={this.handleBlur}></textarea>
                </div>
                <div key={"howToContactMe"} className="user-content">
                    <div className="title">
                        How To Contact Me:
                </div>
                    <textarea value={userContent.howToContactMe} onChange={(e) => { this.handleChanges(e.target.value, "howToContactMe") }} onInput={this.handleFocus} onFocus={this.handleFocus} onBlur={this.handleBlur}></textarea>
                </div>
                <div key={"howIMakeDecisions"} className="user-content">
                    <div className="title">
                        How I Make Decisions:
                </div>
                    <textarea value={userContent.howIMakeDecisions} onChange={(e) => { this.handleChanges(e.target.value, "howIMakeDecisions") }} onInput={this.handleFocus} onFocus={this.handleFocus} onBlur={this.handleBlur}></textarea>
                </div>
                <div key={"howToGiveMeFeedback"} className="user-content">
                    <div className="title">
                        How To Give Me Feedback:
                </div>
                    <textarea value={userContent.howToGiveMeFeedback} onChange={(e) => { this.handleChanges(e.target.value, "howToGiveMeFeedback") }} onInput={this.handleFocus} onFocus={this.handleFocus} onBlur={this.handleBlur}></textarea>
                </div>
                <div key={"petPeeves"} className="user-content">
                    <div className="title">
                        Pet Peeves:
                </div>
                    <textarea value={userContent.petPeeves} onChange={(e) => { this.handleChanges(e.target.value, "petPeeves") }} onInput={this.handleFocus} onFocus={this.handleFocus} onBlur={this.handleBlur}></textarea>
                </div>
                <div key={"howToHelpMe"} className="user-content">
                    <div className="title">
                        How To Help Me:
                </div>
                    <textarea value={userContent.howToHelpMe} onChange={(e) => { this.handleChanges(e.target.value, "howToHelpMe") }} onInput={this.handleFocus} onFocus={this.handleFocus} onBlur={this.handleBlur}></textarea>
                </div>
                <div className="reference-link">
                    Uses Markdown. Reference sheet can be found <a rel="noopener noreferrer" target="_blank" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">here.</a>
                </div>
                <div className="editing-bar">
                    <div className="button" onClick={this.handleRevert}>Revert</div>
                    <div className="button" onClick={this.handleSave}>Save</div>
                </div>
            </div>);
    }

    render() {
        return (
            <div className="edit-guide">
                {this.renderEditUserGuide()}
                <div className="preview-guide-content">
                    {viewUserGuide(this.state.userContent)}
                </div>
            </div>
        );
    }
}

export default EditGuide;
