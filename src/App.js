import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "./controller/Products";
import { Button, Modal, Container, Form, Table, Col, Row } from 'react-bootstrap';
import { BsFillTrashFill,BsPencilFill } from "react-icons/bs";
import Swal from 'sweetalert2/dist/sweetalert2.js'

function App() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.value);
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesc] = useState("");
  const [oum, setOum] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  return (
    <div className="App">
      <Container>
        <br/>
        <Row>
          <Col>
          <Button variant="primary" className="p-1 mb-3" onClick={handleShowAdd}>
            Add
          </Button>
          </Col>
          <Col>
            <h1>Product List</h1>
          </Col>
        </Row>
     
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Name</th>
              <th>Price</th>
              <th>OUM</th>
              <th>Description</th>
              <th align="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => {
              return (
                  <tr>
                    <td>{product.id}</td>
                    <td>{product.code}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.oum}</td>
                    <td>{product.description}</td>
                    <td align="center"><Button variant="warning"  onClick={() => {
                      setId(product.id);
                      setCode(product.code);
                      setName(product.name);
                      setPrice(product.price);
                      setDesc(product.description);
                      setOum(product.oum);
                      handleShowEdit();
                    }}>
                       <BsPencilFill/>
                      </Button>|<Button variant="danger" 
                        onClick={() => {
                          Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(deleteProduct({ id: product.id }));
                              Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                            }
                          })
                        }}
                      >
                       <BsFillTrashFill/>
                      </Button>
                    </td>
                  </tr>
              );
            })}
          </tbody>
        </Table>   
        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" >
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Code..." required onChange={(event) => {
                  setCode(event.target.value);
                }} />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name..." required onChange={(event) => {
                  setName(event.target.value);
                }}/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price..." required onChange={(event) => {
                  setPrice(event.target.value);
                }}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Oum</Form.Label>
                <Form.Select required onChange={(event) => {
                  setOum(event.target.value);
                }}>
                  <option selected disabled value="">Select Oum</option>
                  <option>SHEET</option>
                  <option>ROOL</option>
                  <option>PCS</option>
                </Form.Select>
              </Form.Group>
               <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <Form.Text as="textarea" rows={3} required onChange={(event) => {
                  setDesc(event.target.value);
                }}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" 
              onClick={() => {
                dispatch(
                  addProduct({
                    id: productList[productList.length - 1].id + 1,
                    code,
                    name,
                    description,
                    oum,
                    price,
                  })
                );
                handleCloseAdd();
              }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

         <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" >
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Code..." required value={code} onChange={(event) => {
                  setCode(event.target.value);
                }} />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name..." value={name}  required onChange={(event) => {
                  setName(event.target.value);
                }}/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price..."  value={price}  required onChange={(event) => {
                  setPrice(event.target.value);
                }}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Oum</Form.Label>
                <Form.Select required value={oum} onChange={(event) => {
                  setOum(event.target.value);
                }}>
                  <option>SHEET</option>
                  <option>ROOL</option>
                  <option>PCS</option>
                </Form.Select>
              </Form.Group>
               <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <Form.Text as="textarea" rows={3} value={description}  required onChange={(event) => {
                  setDesc(event.target.value);
                }}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" 
              onClick={() => {
                dispatch(
                  updateProduct({ 
                    id,
                    code,
                    name,
                    description,
                    oum,
                    price
                   })
                );
                handleCloseEdit();
              }}>
              Edit Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default App;
