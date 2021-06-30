import React from 'react'
import { Modal, Form, InputNumber, Radio, Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { RegexNumber100000 } from '../../constants'
import { ButtonTrade } from 'components-v2/Button'
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
            <Form ref={formRef} onFinish={onSubmitRuleAuction}>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'This Field is required' },
                        {
                            pattern: RegexNumber100000,
                            message: 'The price must be less than 100,000',
                        },
                    ]}
                >
                    <InputNumber
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

                <Form.Item
                    name="stepPrice"
                    label="Price Step"
                    rules={[
                        { required: true, message: 'This Field is required' },
                        {
                            pattern: RegexNumber100000,
                            message: 'The price must be less than 100,000',
                        },
                    ]}
                    validateTrigger="onBlur"
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                        <Popover content={renderContainer} title="Tutorial">
                            <InfoCircleOutlined style={{ marginRight: '6px', cursor: 'pointer' }} />
                        </Popover>
                        <InputNumber
                            formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            style={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                width: '100%',
                            }}
                            placeholder="Enter step price of NFT"
                        />
                    </div>
                </Form.Item>
                <Form.Item
                    name="typeAuction"
                    label="Type"
                    initialValue={typeAuction}
                >
                    <Radio.Group defaultValue={typeAuction} onChange={onChange} value={typeAuction}>
                        <Radio value={1}>Now</Radio>
                        <Radio value={2}>Schedule</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="dateTime"
                    label="Set time"
                >
                    <DatePicker disabledStartDate={typeAuction === 1 ? true : false} />
                </Form.Item>
                <Form.Item>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <ButtonTrade htmlType="submit">Submit</ButtonTrade>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalSetPriceAuction
