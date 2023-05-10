import React, {useState} from 'react';
import {updateOne} from "../../http/userAPI";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

const UpdateUser = ({show, onHide, users, reload}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);
    const [id, setId] = useState(1);


    const updateUser = async (e) => {
        e.preventDefault();
        try{
            let role = 'USER';
            if (admin)
                role = 'ADMIN';
            let data = await updateOne(id, email, role, password);
            console.log(data);
            reload();
        } catch (e){
            alert(e.response.data.message);
        }

    }

    const handleSelect = (e) => {
        onHide();
        updateUser(e);
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
                    Обновить пользователя
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

                    <Dropdown>
                        <DropdownToggle variant={'dark m-2'}>
                            ID
                        </DropdownToggle>
                        <DropdownMenu>
                            {users.map(function (data, index) {
                                return(
                                    <DropdownItem key={index} onClick={() => {setId(data.id)}}>{data.id}</DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"light border-2 border-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"light border-2 border-success"} onClick={handleSelect}>Обновить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateUser;