import React from 'react';
import UserTable from './components/UserTable'
import './App.css';

//git

function App() {
  return (
    <div className="App">
        <h3 className={'container pt-5'}>Users Table</h3>
      <UserTable />
    </div>
  );
}

export default App;
