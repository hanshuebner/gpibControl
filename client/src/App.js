
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import './App.css';

import { ScriptView } from './ScriptView';
import { SendDialog } from './SendDialog';

function App() {
  const [items, setItems] = useState([]);
  const [itemToSend, setItemToSend] = useState(null);

  useEffect(() => {
    const jsonItems = localStorage.getItem('items');
    if (jsonItems) {
      setItems(JSON.parse(jsonItems));
    }
  }, [setItems])

  useEffect(() => {
    console.log('saving', items.length, 'items');
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const changeItem = (index, item) => {
    items[index] = item;
    setItems([...items]);
  }

  const deleteItem = (index) => {
    items.splice(index, 1);
    setItems([...items]);
  }

  const sendItem = (index) => {
    setItemToSend(items[index]);
  }

  const newScript = () => setItems([...items, { id: uuidv4(), title: '', script: '' }]);

  return (
    <div className="App">
      <div className="content-section">
        <h1>GPIB Script Sender</h1>
        {
          items.map((item, index) => <ScriptView key={index} index={index} item={item}
                                                 onChange={changeItem} onDelete={deleteItem} onSend={sendItem}/>)
        }
        <SendDialog item={itemToSend} onHide={() => setItemToSend(null)}/>
      </div>
      <Button icon="pi pi-plus" onClick={newScript}/>
    </div>
  );
}

export default App;
