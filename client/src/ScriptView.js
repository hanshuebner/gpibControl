import { useState, useEffect } from 'react';

import { confirmPopup } from 'primereact/confirmpopup';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export const ScriptView = ({ id, onChange }) => {

    const [title, setTitle] = useState('');
    const [script, setScript] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem(id);
        if (saved) {
            console.log('loading from localStorage');
            let { title, script } = JSON.parse(saved);
            setTitle(title);
            setScript(script);
        }
    }, [id, setTitle, setScript]);

    useEffect(() => {
        if (title || script) {
            console.log('saving');
            localStorage.setItem(id, JSON.stringify({ title, script }));
        }
        onChange();
    }, [id, title, script, onChange]);

    const send = async () => {
        for (const line of script.split(/\n/)) {
            const response = await fetch('/api/send', { method: 'POST', body: line });
            const result = await response.text();
            console.log(result);
        }
    }

    const deleteScript = event => {
        const doDelete = () => {
            localStorage.removeItem(id);
            onChange();
        }
        if (title || script) {
            confirmPopup({
                target: event.currentTarget,
                message: 'Are you sure you want to proceed?',
                icon: 'pi pi-exclamation-triangle',
                accept: doDelete
            });
        } else {
            doDelete();
        }
    }

    return <Card>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="title">Title</label>
                    <InputText id="title" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="p-field">
                    <label htmlFor="script">Script</label>
                    <InputTextarea rows={script.split(/\n/).length} id="script" value={script} onChange={e => setScript(e.target.value)}/>
                </div>
            </div>
            <div className="p-field">
                <Button icon="pi pi-send" label="Send" onClick={send}/>
                <Button icon="pi pi-trash" label="Delete" onClick={deleteScript}/>
            </div>
        </Card>;
}