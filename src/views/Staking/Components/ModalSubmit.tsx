import React from 'react'
import { Modal, Form, Input, Button } from 'antd'


function ModalSubmit(props: any) {
    const { isShowModalSubmit, setShowModalSubmit, onSubmit, formRef } = props
    
    return (
        <Modal
            title="Submit Staking"
            visible={isShowModalSubmit}
            onCancel={() => setShowModalSubmit(false)}
            footer={null}
            width={400}
        >
            <Form ref={formRef} onFinish={onSubmit} style={{ width: '100%' }}>
                <div style={{ marginBottom: '6px' }}>Name<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="name"
                    validateTrigger="onChange"
                >
                    <Input
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        placeholder="Enter name card to..."
                    />
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>Description<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="description"
                    validateTrigger="onChange"
                >
                    <Input
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        placeholder="Enter description to..."
                    />
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>URL Token<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="url token"
                    validateTrigger="onChange"
                >
                    <Input
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        placeholder="Enter url token to..."
                    />
                </Form.Item>
                
                <div style={{ marginBottom: '6px' }}>Token ID</div>
                <Form.Item
                    name="token id"
                    validateTrigger="onChange"
                >
                    <Input
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        disabled
                        defaultValue='3'
                    />
                </Form.Item>    
                <Form.Item>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button htmlType="submit">Submit</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalSubmit
