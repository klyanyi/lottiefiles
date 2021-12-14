import React, { Component } from 'react';

import Navbar from './Navbar/Navbar';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div>
        {/* better use some sort of routing here :) */}
        <Navbar
          brand={{ name: 'Login', to: '/' }}
          links={[
            { name: 'Convert', to: '/convert', icon: 'convert' }, // dummy
            { name: 'Preview', to: '/preview', icon: 'preview' }, // dummy
            { name: 'Search', to: '/search', icon: 'search' },
          ]}
        />
        <Search />
      </div>
    );
  }
}

export default App;
