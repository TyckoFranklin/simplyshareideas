import React from 'react';
import ReactMarkdown from 'react-markdown';

export const viewUserGuide = (userContent) => {
    if(userContent === null || userContent === undefined){
        return null;
    }
    let elements = [];
    elements.push(
        <div key={"name"} className="user-content">
            <ReactMarkdown source={"# User's Manual: " + userContent.name + "\n"}/>
        </div>);
    elements.push(
        <div  key={"socialStyle"} className="user-content">
            <div className="content">
                <ReactMarkdown source={"## Social Style: \n" + userContent.socialStyle}/>
            </div>
        </div>);
    elements.push(
        <div key={"howToContactMe"} className="user-content">
            <div className="content">
                <ReactMarkdown source={"## How To Contact Me: \n" + userContent.howToContactMe}/>
            </div>
        </div>);
    elements.push(
        <div key={"howIMakeDecisions"} className="user-content">
            <div className="content">
                <ReactMarkdown source={"## How I Make Decisions: \n" + userContent.howIMakeDecisions}/>
            </div>
        </div>);
    elements.push(
        <div key={"howToGiveMeFeedback"} className="user-content">
            <div className="content">
                <ReactMarkdown source={"## How To Give Me Feedback: \n" + userContent.howToGiveMeFeedback}/>
            </div>
        </div>);
    elements.push(
        <div key={"petPeeves"} className="user-content">
            <div className="content">
                <ReactMarkdown source={"## Pet Peeves: \n" + userContent.petPeeves}/>
            </div>
        </div>);
    elements.push(
        <div key={"howToHelpMe"} className="user-content">
            <div className="content">
                <ReactMarkdown source={"## How To Help Me: \n" + userContent.howToHelpMe}/>
            </div>
        </div>);
    return elements;
}