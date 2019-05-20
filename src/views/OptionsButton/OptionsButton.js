
import React from 'react';

export const renderOptionsButton = (onClickCallBack) => {
    return (
        <div className="options-button" onClick={onClickCallBack}>
            <div className="options-bar"></div>
            <div className="options-bar"></div>
            <div className="options-bar"></div>
        </div>
    )
}