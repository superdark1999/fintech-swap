import React from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { ButtonBuy } from 'components-v2/Button'


const OPTIONS = [
    'Art',
    'Music',
    'Games',
    'DeFi',
    'Meme',
    'Sports',
    'Abstract',
    'Space',
    'Lucky',
  ]


function ModalEditNft(props: any) {
    const { isShowModalEdit, setShowModalEdit, onEditNFT, formRef, data } = props
    const [selectItems, setSelectItems] = React.useState([])
    const filteredOptions = OPTIONS.filter((o: any) => !selectItems.includes(o))
    
    return (
        <Modal
            title="Edit NFT"
            visible={isShowModalEdit}
            onCancel={() => setShowModalEdit(false)}
            footer={null}
            width={400}
        >
            <Form ref={formRef} onFinish={onEditNFT} style={{ width: '100%' }}>
                <div style={{ marginBottom: '6px' }}>Name<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="title"
                    validateTrigger="onChange"
                >
                    <Input
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        defaultValue={data.title}
                        placeholder="Enter name to..."
                    />
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>Introduction<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
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
                        defaultValue={data.description}
                        placeholder="Enter introduction to..."
                    />
                </Form.Item>
                <div style={{ marginBottom: '6px' }}>Tags<span style={{ color: 'red', marginRight: '4px' }}>*</span></div>
                <Form.Item
                    name="tags"
                    validateTrigger="onChange"
                >
                    <Select
                    mode="multiple"
                    value={selectItems}
                    defaultValue={data?.tags}
                    style={{ width: '100%' }}
                    onChange={(e: any) => setSelectItems(e)}
                    placeholder="Tags for your NFT"
                  >
                    {filteredOptions.map((item: any) => (
                      <Select.Option
                        style={{ borderRadius: '30px' }}
                        key={item}
                        value={item}
                      >
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
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

export default ModalEditNft
