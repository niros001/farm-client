import React, {useState, useCallback} from 'react';
import {Modal, Input, Select} from 'antd';
import styled from 'styled-components';
import {useMutation} from '@apollo/client';
import * as mutations from '../graphql/mutations';


const StyledInput = styled(Input)`
  margin: 15px 0;
`

const ItemModal = ({visible, onCancel}) => {
    const [addItem, {loading, error, data}] = useMutation(mutations.ADD_ITEM_MUTATION);
    // const [updateItem, {loading, error, data}] = useMutation(mutations.UPDATE_ITEM_MUTATION);
    console.log({loading, error, data});

    const [img_base64, setImg_base64] = useState(null);
    const [category, setCategory] = useState('fruits');
    const [title, setTitle] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [amount, setAmount] = useState(null);
    const [unit, setUnit] = useState(null);
    const [description, setDescription] = useState(null);
    const [tags, setTags] = useState(null);

    const onAdd = useCallback(() => {
        addItem({
            variables: {
                category,
                img_base64,
                title,
                subtitle,
                amount,
                unit,
                description,
                tags,
            }
        })
            .then(resp => console.log({resp}))
            .catch(err => console.log({err}))
        onCancel();
    }, [onCancel, addItem, category, img_base64, title, subtitle, amount, unit, description, tags])

    return (
        <Modal
            style={{direction: 'ltr'}}
            title="Add new item"
            visible={visible}
            onCancel={onCancel}
            onOk={onAdd}
            centered
        >
            <Select defaultValue="fruits" style={{width: '100%'}} onChange={setCategory}>
                <Select.Option value="fruits">fruits</Select.Option>
                <Select.Option value="vegetables">vegetables</Select.Option>
                <Select.Option value="nuts">nuts</Select.Option>
                <Select.Option value="products">products</Select.Option>
                <Select.Option value="pastries">pastries</Select.Option>
                <Select.Option value="olive-oil">olive-oil</Select.Option>
            </Select>
            <StyledInput addonBefore={'Photo'} onChange={({target: {value}}) => setImg_base64(value)}/>
            <StyledInput addonBefore={'Title'} onChange={({target: {value}}) => setTitle(value)}/>
            <StyledInput addonBefore={'Subtitle'} onChange={({target: {value}}) => setSubtitle(value)}/>
            <StyledInput addonBefore={'Price'} onChange={({target: {value}}) => setAmount(parseInt(value))}/>
            <StyledInput addonBefore={'Unit'} onChange={({target: {value}}) => setUnit(value)}/>
            <StyledInput addonBefore={'Description'} onChange={({target: {value}}) => setDescription(value)}/>
            <StyledInput addonBefore={'Tags'} placeholder={'Example: Tag1, Tag2, Tag3'} onChange={({target: {value}}) => setTags(value)}/>
        </Modal>
    )
};

export default ItemModal;
