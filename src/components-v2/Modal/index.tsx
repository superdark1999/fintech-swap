import React,{useState} from 'react'
import { Modal, Button } from 'antd';

const ModalLucky:React.FC = () => {
    return (
        <>
            <Button type="primary" >
            Display a modal dialog at 20px to Top
            </Button>
            <Modal
            title="20px to Top"
            style={{ top: 20 }}
            centered
            visible
            >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            </Modal>
        </>
    )
}

export default ModalLucky
