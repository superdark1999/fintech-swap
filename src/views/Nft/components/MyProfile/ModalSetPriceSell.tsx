import React from 'react'
import { Modal, Form, InputNumber, Select } from 'antd'
import { RegexNumber100000 } from '../../constants'
import { ButtonBuy } from 'components-v2/Button'
import Token from 'assets/images/token.svg'
const OptionData = [
    {
        label: 'Lucky',
        value: 'Lucky',
    }
]
const { Option } = Select;
function ModalSetPriceSell(props: any) {
    const { isShowModalSetPrice, setShowModalsetPrice, onSellItem, formRef } = props
    const [select, setSelect] = React.useState<string | null>('Lucky');
    return (
        <Modal
            title="Set price"
            visible={isShowModalSetPrice}
            onCancel={() => setShowModalsetPrice(false)}
            footer={null}
            width={400}
        >
            <Form ref={formRef} onFinish={onSellItem} style={{ width: '100%' }}>
                <div style={{ marginBottom: '6px' }}>Type<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="type"
                >
                    <Select className="select" style={{ width: 120, borderRadius: 30, textAlign: 'center' }} onChange={setSelect} defaultValue={select}>
                        {OptionData.map((item, i) => (
                            <Option key={i} value={item.value}>{item.label} <img src={Token} /></Option>
                        ))}
                    </Select>
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>Price<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="lucky"
                    rules={[
                        { required: true, message: 'This Field is required' },
                        { type: 'number', max: 999999, message: 'This field must be less than 1,000,000' },
                    ]}
                    validateTrigger="onChange"
                >
                    <InputNumber
                        max={1000000}
                        min={0.1}
                        formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        placeholder="Enter price sell..."
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

export default ModalSetPriceSell
