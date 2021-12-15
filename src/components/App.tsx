import React, { Component } from 'react';

import Navbar from './Navbar/Navbar';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar
          brand={{ name: 'Login', to: '/' }} // TODO: implement authentication :/
          links={[
            { name: 'Convert', to: '/convert', icon: 'convert' }, // dummy
            { name: 'Preview', to: '/preview', icon: 'preview' }, // dummy
            { name: 'Search', to: '/search', icon: 'search' },
          ]}
        />
        {/* better use some sort of proper react routing here :) */}
        <Search />
      </div>
    );
  }
}

export default App;
