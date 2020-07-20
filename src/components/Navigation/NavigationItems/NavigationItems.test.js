import React from 'react';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

import { configure , shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter : new Adapter()});

describe ('<NavigationItems />' , () => {
    it('shold render two <NavigationItem /> element if authanticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('shold render two <NavigationItem /> element if authanticated', () => {
        const wrapper = shallow(<NavigationItems isLogedIn />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});