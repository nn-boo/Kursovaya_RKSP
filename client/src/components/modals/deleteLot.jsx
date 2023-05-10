import React, {useState} from 'react';
import {deleteLotOne} from "../../http/userAPI";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

const DeleteLot = ({show, onHide, lots, reload}) => {
    const [lotId, setLotId] = useState(0);


    const deleteUser = async (e) => {
        e.preventDefault();
        try{
            let data = await deleteLotOne(lotId);
            console.log(data);
            reload();
        } catch (e){
            alert(e.response.data.message);
        }

    }

    const handleSelect = (e) => {
        onHide();
        deleteUser(e);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size='lg'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить лот
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <DropdownToggle variant={'dark m-2'}>
                            ID
                        </DropdownToggle>
                        <DropdownMenu>
                            {lots.map(function (data, index) {
                                return(
                                    <DropdownItem key={index} onClick={() => {setLotId(data.id)}}>{data.id}</DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"light border-2 border-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"light border-2 border-success"} onClick={handleSelect}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteLot;