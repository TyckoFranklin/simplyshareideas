import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    handleItemClick = (item) => {
        const { itemCallback } = this.props;
        itemCallback(item);
    }
    
    renderItems = () => {
        const { items } = this.props;
        const itemsToReturn = [];
        for(let [key, value] of items){
            const className = `item${value.visible?" selected":""}`
            itemsToReturn.push(<div key={key} className={className} onClick={() => this.handleItemClick(key)}>
                {key}
            </div>);
        }
        return itemsToReturn
    }

    render() {

        return (
            <div className="sidebar">
                {this.renderItems()}
            </div>
        );
    }
}

Sidebar.propTypes = {
    items: PropTypes.instanceOf(Map).isRequired
};

Sidebar.defaultProps = {
    items: new Map(),
};

export default Sidebar;
