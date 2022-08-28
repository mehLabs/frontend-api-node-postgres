import React, { useState } from 'react';
import {Modal, ModalHeader, Button, FormGroup, ModalFooter, ModalBody} from 'reactstrap';

function MyModalEdit(props){
  const [form,setForm] = useState({
    id: props.id,
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }  

  const editar = () => {
    props.handleChange(form);
  }

  const cerrarModalActualizar = () => {
    props.close()
  }

  return(
    <Modal isOpen={props.modalActualizar}>
      <ModalHeader>
      <div><h3>Editar Registro</h3></div>
      </ModalHeader>

      <ModalBody>
          <FormGroup>
          <label>
          Id:
          </label>
          
          <input
              className="form-control"
              readOnly
              disabled
              type="text"
              value={props.form.id}
          />
          </FormGroup>
          
          <FormGroup>
          <label>
              Nombre: 
          </label>
          <input
              className="form-control"
              name="name"
              type="text"
              onChange={handleChange}
              value={props.form.name}
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
              onChange={handleChange}
              value={props.form.email}
          />
          </FormGroup>

          <FormGroup>
          <label>
              Contraseña: 
          </label>
          <input
              className="form-control"
              name="password"
              type="text"
              onChange={handleChange}
          />
          </FormGroup>
      </ModalBody>

      <ModalFooter>
          <Button
          color="primary"
          onClick={() => editar(props.form)}
          >
          Editar
          </Button>
          <Button
          color="danger"
          onClick={() => cerrarModalActualizar()}
          >
          Cancelar
          </Button>
      </ModalFooter>
    </Modal>
  )
}

export default MyModalEdit;