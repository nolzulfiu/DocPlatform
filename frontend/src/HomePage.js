import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import DocumentForm from "./DocumentForm";
import Modal from "react-bootstrap/Modal";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { observer } from "mobx-react";
import { getDocuments, deleteDocument, generatePDF, APIURL } from "./request";
import Toast from 'react-bootstrap/Toast';
import moment from 'moment';


function HomePage({ documentStore, history }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [doc, setDoc] = useState([]);
  const [show, setShow] = useState(false);

  const openAddTemplateModal = () => {
    setOpenAddModal(true);
  };

  const closeAddModal = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
  };

  const cancelAddModal = () => {
    setOpenAddModal(false);
  };

  const cancelEditModal = d => {
    setOpenEditModal(false);
  };

  const getAllDocuments = async () => {
    const response = await getDocuments();
    documentStore.setDocuments(response.data);
    setInitialized(true);
  };

  const editTemplate = d => {
    setDoc(d);
    setOpenEditModal(true);
  };

  const onSave = () => {
    cancelAddModal();
    setOpenEditModal(false);
  };

  const deleteSingleDocument = async id => {
    await deleteDocument(id);
    getAllDocuments();
  };

  const generateSinglePdf = async id => {
    await generatePDF(id);
    setShow(true);
    getAllDocuments();
  };

  useEffect(() => {
    if (!initialized) {
      getAllDocuments();
    }
  });


  
  return (
    <div className="page">
        <h1 className="text-center">Documents</h1>
        <ButtonToolbar onClick={openAddTemplateModal}>
            <Button variant="primary">Add Document</Button>
        </ButtonToolbar>

        <div aria-live="polite" aria-atomic="true" style={{position: 'fixed', minHeight: '100px', minWidth: '300px',
        top: '75px', right: '75px'}}>
        <Toast
          style={{position: 'absolute', top: 0, right: 0,}}
          onClose={() => setShow(false)} show={show} delay={3000} autohide
        >
            <Toast.Header>
              <strong className="mr-auto">Export</strong>
            </Toast.Header>
            <Toast.Body>Generated PDF!</Toast.Body>
          </Toast>
        </div>

        <Modal show={openAddModal} onHide={closeAddModal, cancelAddModal} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Add Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <DocumentForm
                onSave={onSave.bind(this)}
                cancelModal={cancelAddModal.bind(this)}
                documentStore={documentStore}
            />
            </Modal.Body>
        </Modal>
        <Modal show={openEditModal} onHide={cancelEditModal} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DocumentForm
                    edit={true}
                    doc={doc}
                    onSave={onSave.bind(this)}
                    cancelModal={cancelEditModal.bind(this)}
                    documentStore={documentStore}
                />
            </Modal.Body>
        </Modal>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Export PDF</th>
            <th>Last Updated</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {documentStore.documents.map(d => {
            return (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>
                  <Button
                    variant="outline-info"
                    onClick={editTemplate.bind(this, d)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                    <Button
                        variant="outline-primary"
                        onClick={generateSinglePdf.bind(this, d.id)} 
                        target="_blank"
                    >
                        Generate PDF
                    </Button>
                    <Button 
                    className='open-button'
                        variant="outline-primary"
                        href={`${APIURL}/${d.pdfPath}`} 
                        target="_blank"
                        disabled={(d.pdfPath == null)}
                    >
                        Open
                    </Button>
                </td>
                <td>
                  <p>{moment(d.updatedAt).fromNow()}</p>
                </td>
                <td>
                    <Button
                        variant="outline-danger"
                        onClick={deleteSingleDocument.bind(this, d.id)}
                    >
                        Delete
                    </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}


export default withRouter(observer(HomePage));