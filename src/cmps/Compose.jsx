import { useSearchParams } from 'react-router-dom';
import { defaultInfo } from '../services/default-emails';


export function Compose({ getNewNessage }) {
    const [_, setSearchParams] = useSearchParams();

    function onSubmit(e) {
        e.preventDefault();
        const newMessage = {
            to: e.target[1].value,
            subject: e.target[2].value,
            body: e.target[3].value
        };
        getNewNessage(newMessage);
        onClose();
    }

    function onClose() {
        setSearchParams(prev => {
            prev.delete('compose');
            return prev;
        });
    }

    return (
        <dialog open={true} className='compose-dialog'>
            <form className='compose-form' onSubmit={onSubmit}>
                <h1>New Message <button type='button' onClick={onClose}>X</button></h1>
                <p>From: {`${defaultInfo.loggedinUser.email}`}</p>
                <span><label htmlFor='to'>To: </label>
                    <input type='email' id='to' required ></input></span>
                <span><label htmlFor='subject'>Subject: </label>
                    <input type='text' id='subject' required minLength='4' maxLength='18'></input></span>
                <textarea id='text' placeholder='Your Message' required minLength='5'></textarea>
                <button>Send</button>
            </form>
        </dialog>
    );
}