
import { confirmPopup } from 'primereact/confirmpopup';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export const ScriptView = ({ index, item, onChange, onDelete, onSend }) => {

    const deleteItem = event => {
        if (item.title || item.script) {
            confirmPopup({
                target: event.currentTarget,
                message: 'Are you sure you want to proceed?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => onDelete(index)
            });
        } else {
            onDelete(index);
        }
    }

    return <Card>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor={`title-${item.id}`}>Title</label>
                    <InputText id={`title-${item.id}`} value={item.title}
                               onChange={e => onChange(index, {...item, title: e.target.value})}/>
                </div>
                <div className="p-field">
                    <label htmlFor={`script-${item.id}`}>Script</label>
                    <InputTextarea rows={item.script.split(/\n/).length} id={`script-${item.id}`} value={item.script}
                                   onChange={e => onChange(index, {...item, script: e.target.value})}/>
                </div>
            </div>
            <div className="p-field">
                <Button icon="pi pi-send" label="Send" disabled={!item.script} onClick={() => onSend(index)}/>
                <Button icon="pi pi-trash" label="Delete" onClick={deleteItem}/>
            </div>
        </Card>;
}