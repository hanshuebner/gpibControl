
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import './App.css';

import { ScriptView } from './ScriptView';

function App() {
  const keys = Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index));
  const [_, refresh] = useState();

  const newScript = () => {
    localStorage.setItem(uuidv4(), JSON.stringify({ title: '', script: '' }));
    refresh(localStorage.length);
  };

  return (
    <div className="App">
      <div className="content-section">
        {
          keys.map(key => <ScriptView key={key} id={key} onChange={refresh}/>)
        }
      </div>
      <Button icon="pi pi-plus" onClick={newScript}/>
    </div>
  );
}

export default App;
