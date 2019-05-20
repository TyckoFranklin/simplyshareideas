import React from 'react';

export const overlay = (refCallback, renderCallback) => {
    return (
        <div className="overlay" ref={refCallback}>
            {renderCallback()}
        </div>
    )
}