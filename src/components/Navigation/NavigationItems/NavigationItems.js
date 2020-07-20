import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isLogedIn ? 
            <NavigationItem link="/orders">Orders</NavigationItem>
        :null}
        {!props.isLogedIn ?
            <NavigationItem link="/Auth">Authanticate</NavigationItem> 
            :<NavigationItem link="/LogOut">Logout</NavigationItem> }
        
    </ul>
);

export default navigationItems;