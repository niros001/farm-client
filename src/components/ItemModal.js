import React, {useState, useCallback, useEffect} from 'react';
import {Modal, Input, Select} from 'antd';
import styled from 'styled-components';
import {useMutation} from '@apollo/client';
import * as mutations from '../graphql/mutations';


const StyledInput = styled(Input)`
  margin: 15px 0;
`

const ItemModal = ({visible, onCancel, item}) => {
    const [addItem, {loading, error, data}] = useMutation(mutations.ADD_ITEM_MUTATION);
    const [updateItem, {loading2, error2, data2}] = useMutation(mutations.UPDATE_ITEM_MUTATION);

    const [img_base64, setImg_base64] = useState(null);
    const [category, setCategory] = useState('fruits');
    const [title, setTitle] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [amount, setAmount] = useState(null);
    const [unit, setUnit] = useState(null);
    const [description, setDescription] = useState(null);
    const [tags, setTags] = useState(null);

    const onSave = useCallback(() => {
        if (item) {
            updateItem({
                variables: {
                    id: item.id,
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
                .then(resp => window.location.reload())
                .catch(err => console.log({err}))
        } else {
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
                .then(resp => window.location.reload())
                .catch(err => console.log({err}))
        }

        onCancel();
    }, [item, onCancel, updateItem, addItem, category, img_base64, title, subtitle, amount, unit, description, tags])

    useEffect(() => {
        if(!!item) {
            setImg_base64(item.img_base64);
            setCategory(item.category);
            setTitle(item.title);
            setSubtitle(item.subtitle);
            setAmount(item.amount);
            setUnit(item.unit);
            setDescription(item.description);
            setTags(item.tags);
        }
    }, [item]);

    return (
        <Modal
            style={{direction: 'ltr'}}
            title="Add new item"
            visible={visible}
            onCancel={onCancel}
            onOk={onSave}
            centered
        >
            <Select value={category} style={{width: '100%'}} onChange={setCategory}>
                <Select.Option value="fruits">fruits</Select.Option>
                <Select.Option value="vegetables">vegetables</Select.Option>
                <Select.Option value="nuts">nuts</Select.Option>
                <Select.Option value="products">products</Select.Option>
                <Select.Option value="pastries">pastries</Select.Option>
                <Select.Option value="olive-oil">olive-oil</Select.Option>
            </Select>
            <StyledInput addonBefore={'Photo'} onChange={({target: {value}}) => setImg_base64(value)} value={img_base64}/>
            <StyledInput addonBefore={'Title'} onChange={({target: {value}}) => setTitle(value)} value={title}/>
            <StyledInput addonBefore={'Subtitle'} onChange={({target: {value}}) => setSubtitle(value)} value={subtitle}/>
            <StyledInput addonBefore={'Price'} onChange={({target: {value}}) => setAmount(parseInt(value))} value={amount}/>
            <StyledInput addonBefore={'Unit'} onChange={({target: {value}}) => setUnit(value)} value={unit}/>
            <StyledInput addonBefore={'Description'} onChange={({target: {value}}) => setDescription(value)} value={description}/>
            <StyledInput addonBefore={'Tags'} placeholder={'Example: Tag1, Tag2, Tag3'} onChange={({target: {value}}) => setTags(value)} value={tags}/>
        </Modal>
    )
};

export default ItemModal;
