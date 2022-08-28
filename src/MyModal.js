import React from 'react';
import {Modal, ModalHeader, Button, FormGroup, ModalFooter, ModalBody, Form} from 'reactstrap';
// const { server } = process.env;

class MyModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data:this.props.usuarios,
            form: {
                id: '',
                name: '',
                email: '',
                password: '',
            },
            modalInsertar: false,
            modalActualizar:false,
        }
    }

    mostrarModalInsertar() {
        this.setState({modalInsertar: true});
    }

    insertar = async (e) => {
        e.preventDefault();
        let newValue = {...this.state.form};
        newValue.id = null;
        let lista = this.state.data;

        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newValue)
            }

            let res = await fetch("http://localhost:7000/usuarios",config)
            let json = await res.json();
            
            lista.push(json);
            this.props.stateChanger(lista);
            this.setState({ modalInsertar: false, data: lista });

        }catch(error){
            console.log(error);
        }

        
    }

    cerrarModalInsertar(){
        this.setState({modalInsertar: false})
    }

    handleChange = (e) => {
        this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
          },
        });
      };
    
    render() {
        return (
            <>
                <br/>
                <Button className='mx-auto' color="success" onClick={() => this.mostrarModalInsertar()}>Agregar Usuario</Button>


                <Modal isOpen={this.state.modalInsertar}>
                    <Form onSubmit={(e) => this.insertar(e)}>
                        <ModalHeader>
                        <div><h3>Insertar Persona</h3></div>
                        </ModalHeader>

                            <ModalBody>
                                <FormGroup>
                                <label>
                                    Nombre: 
                                </label>
                                <input
                                    className="form-control"
                                    name="name"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                                </FormGroup>
                                
                                <FormGroup>
                                <label>
                                    Email: 
                                </label>
                                <input
                                    className="form-control"
                                    name="email"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                                </FormGroup>

                                <FormGroup>
                                <label>
                                    Contraseña: 
                                </label>
                                <input
                                    className="form-control"
                                    name="password"
                                    type="password"
                                    onChange={this.handleChange}
                                />
                                </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                            color="primary"
                            type="submit"
                            >
                            Insertar
                            </Button>
                            <Button
                            className="btn btn-danger"
                            onClick={() => this.cerrarModalInsertar()}
                            >
                            Cancelar
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        )

    }
}

export default MyModal;