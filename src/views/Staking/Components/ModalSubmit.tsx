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
                <div style={{ marginBottom: '6px' }}>Card Value<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="value"
                    validateTrigger="onChange"
                >
                    <Input
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        placeholder="Enter value card to..."
                    />
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>Interest rate (%)<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="interest rate"
                    validateTrigger="onChange"
                >
                    <Input
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        placeholder="Enter interest rate to..."
                    />
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>Total Lucky<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="total lucky"
                    validateTrigger="onChange"
                >
                    <Input
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        placeholder="Enter total lucky to..."
                    />
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>NFT Card<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="NFT card"
                    validateTrigger="onChange"
                >
                    <Input
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        placeholder="Enter NFT card to..."
                    />
                </Form.Item>  
                <div style={{ marginBottom: '6px' }}>Fee (%)</div>
                <Form.Item
                    name="fee"
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
