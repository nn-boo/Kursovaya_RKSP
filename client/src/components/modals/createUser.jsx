import React, {useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {addOne} from "../../http/userAPI";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

const CreateUser = ({show, onHide, reload}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);


    const addUser = async (e) => {
        e.preventDefault();
        try{
            let role = 'USER';
            if (admin)
                role = 'ADMIN';
            let data = await addOne(email, password, role);
            reload();
            console.log(data);
        } catch (e){
            alert(e.response.data.message);
        }

    }

    const handleSelect = (e) => {
        onHide();
        addUser(e);
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
                    Создать пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите почту"}
                        type={"email"}
                        className={'m-2'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    >
                    </Form.Control>
                    <Form.Control
                        placeholder={"Введите пароль"}
                        type={"text"}
                        className={'m-2'}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    >
                    </Form.Control>
                    <Dropdown>
                        <DropdownToggle variant={'dark m-2'}>
                            Роль
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => {setAdmin(false)}} key={'USER'}>USER</DropdownItem>
                            <DropdownItem onClick={() => {setAdmin(true)}} key={'ADMIN'}>ADMIN</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"light border-2 border-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"light border-2 border-success"} onClick={handleSelect}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateUser;