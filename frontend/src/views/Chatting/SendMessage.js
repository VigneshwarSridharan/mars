import React from 'react';
import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';

const SendMessage = props => {
    // Actions
    let { sendMessage } = props;
    const onSubmit = e => {
        e.preventDefault();
        let form = document.forms.send_message;
        let message = form.elements['message'].value;
        sendMessage(message);
        form.reset()
    }
    return (
        <Form name="send_message" autoComplete="off" onSubmit={onSubmit} className="d-flex">
            <Input name="message" required />
            <Button className="ml-2" type="submit" color="primary"><i className="mdi mdi-send"></i></Button>
        </Form>
    )
}


export default SendMessage;
