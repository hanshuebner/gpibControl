
import { useEffect, useState } from 'react';

import { Dialog } from 'primereact/dialog';

export const SendDialog = ({ item, onHide }) => {
  const [sendLog, setSendLog] = useState('');

  useEffect(() => {
    if (item) {
      console.log('send', item);
      setSendLog('');
      const linesToSend = item.script.split(/\n+/);
      const addToSendLog = string => setSendLog(sendLog => sendLog + string);
      const sendNextLine = async () => {
        if (linesToSend.length) {
          const line = linesToSend.shift();
          if (line) {
            addToSendLog(line + ' ➔ ');
            const response = await fetch('/api/send', { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ message: line })
            });
            if (response.status > 299) {
              const { response } = await response.json();
              addToSendLog(`API error ${response.status}: ${response}\n`);
            } else {
              const result = await response.text();
              addToSendLog(result + '\n');
            }
          }
          if (linesToSend.length) {
            sendNextLine();
          }
        }
      }
      sendNextLine();
    } else {
      console.log('stop sending');
    }
  }, [item, setSendLog]);

 return <Dialog visible={!!item} header="Sending..." onHide={onHide}>
    <pre>{sendLog}</pre>
  </Dialog>;
}