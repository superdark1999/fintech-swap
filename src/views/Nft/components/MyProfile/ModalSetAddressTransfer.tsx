import React from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { ButtonBuy } from 'components-v2/Button'

function ModalSetAddressTransfer(props: any) {
    const { isShowModalSetAddressTransfer, setShowModalSetAddressTransfer, onTransferItem, formRef } = props
    return (
        <Modal
            title="Set price"
            visible={isShowModalSetAddressTransfer}
            onCancel={() => setShowModalSetAddressTransfer(false)}
            footer={null}
            width={400}
        >
            <Form ref={formRef} onFinish={onTransferItem} style={{ width: '100%' }}>
                <div style={{ marginBottom: '6px' }}>Address<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="address"
                    rules={[
                        { required: true, message: 'This Field is required' },
                    ]}
                    validateTrigger="onChange"
                >
                    <Input
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        placeholder="Enter address transfer to..."
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
                        <ButtonBuy htmlType="submit">Submit</ButtonBuy>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalSetAddressTransfer
