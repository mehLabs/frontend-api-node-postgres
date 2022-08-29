import React, { useState } from 'react';
import {Modal, ModalHeader, Button, FormGroup, ModalFooter, ModalBody} from 'reactstrap';


function MyModalEdit(props){
  const url = "http://localhost:7000/usuarios";
  const [form,setForm] = useState({
    id: props.form.id,
    name: props.form.name,
    email: props.form.email,
    password: props.form.password
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }  

  const editar = async () => {
    try {
      let config = {
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(form)
      }

      const response = await fetch(url+"/"+form.id,config);
      console.log(response);
      
      props.handleChange(form);
      cerrarModalActualizar();
    } catch (error) {
      console.log(error)
    }
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
              value={form.name}
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
              value={form.email}
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