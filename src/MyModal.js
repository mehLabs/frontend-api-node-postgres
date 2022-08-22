import React from 'react';
import {Modal, ModalHeader, Button, FormGroup, ModalFooter, ModalBody} from 'reactstrap';

class MyModal extends React.Component {
    state = {
        data:this.props.data,
        form: {
            id: '',
            name: '',
            email: '',
            password: '',
        },
        modalInsertar: false,
    }
    
    render() {
        return (
            <>
                <Button>Agregar Usuario</Button>
                
            </>
        )

    }
}

export default MyModal;