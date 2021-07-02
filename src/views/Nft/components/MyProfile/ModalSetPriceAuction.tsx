import React from 'react'
import { Modal, Form, InputNumber, Radio, Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { RegexNumber100000 } from '../../constants'
import { ButtonBuy } from 'components-v2/Button'
import DatePicker from 'components-v2/DatePicker'
function ModalSetPriceAuction(props: any) {
    const { ruleAuctionModal, setRuleAuctionModal, onSubmitRuleAuction, formRef } = props
    const [typeAuction, setTypeAuction] = React.useState(1);
    const onChange = (e: any) => {
        setTypeAuction(e.target.value);
    };
    const renderContainer = () => {
        return <div>
            <p>
                <span style={{ color: 'red' }}>*</span> <b>Note</b>:The price step
                is the way to calculate the price increase for each offer NFT
            </p>
            <p>
                Example: NFT has a current price of 300 LUCKY and a price step of
                100 LUCKY
            </p>
            <p>then the purchase price after that is 400 LUCKY</p>
        </div>
    }
    return (
        <Modal
            title="Set Price Auction"
            visible={ruleAuctionModal}
            onCancel={() => setRuleAuctionModal(false)}
            footer={null}
            width={420}
            style={{ borderRadius: 16 }}
        >
            <Form ref={formRef} onFinish={onSubmitRuleAuction} style={{ width: '100%' }}>
                <div style={{ marginBottom: '6px' }}>Price<span style={{ color: 'red', marginRight: '4px' }}>*</span>
                </div>
                <Form.Item
                    name="price"
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

                        placeholder="Enter NFT auction price"
                    />
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>Price<span style={{ color: 'red', marginRight: '4px' }}>*</span>
                </div>
                <Form.Item
                    name="stepPrice"
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

                        placeholder="Enter price jump step of NFT..."
                    />
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>Type</div>
                <Form.Item
                    name="typeAuction"
                    initialValue={typeAuction}
                >
                    <Radio.Group defaultValue={typeAuction} onChange={onChange} value={typeAuction}>
                        <Radio value={1}>Now</Radio>
                        <Radio value={2}>Schedule</Radio>
                    </Radio.Group>
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>Set time</div>
                <Form.Item
                    name="dateTime"
                    valuePropName="dateTime"
                    rules={[
                        { required: true, message: 'This Field is required' },
                    ]}
                >
                    <DatePicker isFormData disabledStartDate={typeAuction === 1 ? true : false} />
                </Form.Item>
                <Form.Item>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <ButtonBuy style={{ width: '100%' }} >Submit</ButtonBuy>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ModalSetPriceAuction
