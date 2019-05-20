import React, { Component } from 'react';
import './PreviewGuide.css';
import { viewUserGuide } from '../shared';


class PreviewGuide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userContent: props.usersGuides.get(props.currentUser.id)
        }

    }

    componentWillReceiveProps = (preProps) => {
        if(preProps.userContent !== this.props.userContent){
            this.setState({userContent: this.props.usersGuides.get(this.props.currentUser.id)})
        }
    }

    componentDidMount = () => {
    }

    notImplemented = () => {
        alert("Not Implemented Yet");
    }

    handlePrintable = () => {
        let win = window.open("", "printable", "width=900,height=900"); // a window object
        win.document.open("text/html", "replace");
        let htmlOutPut = document.querySelector(".preview-guide-content").outerHTML;
        win.document.write("<HTML><HEAD><TITLE>New Document</TITLE></HEAD><BODY>" + htmlOutPut + "</BODY></HTML>");
        win.document.close();
    }

    render() {
        return (
            <div className="preview-guide">
                <div className="guides-header">
                        <div className="button" onClick={this.handlePrintable}>View Printable Version</div>
                </div>
                <div className="preview-guide-content">
                    {viewUserGuide(this.state.userContent)}
                </div>
            </div>
        );
    }
}

export default PreviewGuide;
