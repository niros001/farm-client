import React, {useMemo, useState, useCallback} from 'react'
import styled from 'styled-components';
import {compact} from 'lodash'
import {notification, Table, Popover, Button, Modal, Input} from 'antd';
import {CSVReader, CSVDownloader} from 'react-papaparse'
import {parsingItemsFromFile, parsingItemsToFile} from '../../utils';
import StorageManagement from './StorageManagement';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledTable = styled(Table)`
  td {
    overflow: hidden;
    white-space: nowrap;
    max-width: 250px;
    text-overflow: ellipsis;
  }
`

const ItemsRenderer = ({items, showUpdated}) => {
    return <ul style={{width: 'max-content'}}>
        {items.map((item, index) => <li key={index}>{item.name} - {showUpdated ? item.updatedValue : item.value}&nbsp;{item.type}</li>)}
    </ul>
}

const ContentModal = ({selectedOrder, updateItems}) => {
    const id = selectedOrder[0];
    let items = selectedOrder[16];
    return <ul style={{width: 'max-content', maxHeight: 500, overflow: 'auto'}}>
        {items.map(({name, value, updatedValue, type}, index) => {
            return <li style={{display: 'flex', alignItems: 'center'}} key={index}>
                {name}
                <b>[{value}]</b>
                <Input
                    type="number"
                    step="0.01"
                    style={{width: 100, margin: 12}}
                    value={updatedValue}
                    onChange={({target: {value}}) => {
                        items[index].updatedValue = value;
                        updateItems(id, items);
                    }}
                />
                {type}
            </li>
        })}
    </ul>
}

const columns = [
    {
        title: "מס'",
        dataIndex: 0,
        key: 0,
        sorter: (a, b) => a[0] - b[0],
    },
    {
        title: 'תאריך',
        dataIndex: 1,
        key: 1,
        sorter: (a, b) => a[0].localeCompare(b[0]),
    },
    {
        title: 'שם לקוח',
        dataIndex: 2,
        key: 2,
        sorter: (a, b) => a[2].localeCompare(b[2]),
    },
    {
        title: 'הזמנה ראשונה',
        dataIndex: 3,
        key: 3,
        sorter: (a, b) => a[3].localeCompare(b[3]),
    },
    {
        title: 'סטאטוס',
        dataIndex: 4,
        key: 4,
        sorter: (a, b) => a[4].localeCompare(b[4]),
    },
    {
        title: 'אימייל',
        dataIndex: 5,
        key: 5,
        sorter: (a, b) => a[5].localeCompare(b[5]),
    },
    {
        title: 'טלפון',
        dataIndex: 6,
        key: 6,
        sorter: (a, b) => a[6] - b[6],
    },
    {
        title: 'אפשרות תשלום',
        dataIndex: 7,
        key: 7,
        sorter: (a, b) => a[7].localeCompare(b[7]),
    },
    {
        title: 'סוג',
        dataIndex: 8,
        key: 8,
        sorter: (a, b) => a[8].localeCompare(b[8]),
    },
    {
        title: 'אפשרות אספקה \\ משלוח',
        dataIndex: 9,
        key: 9,
        sorter: (a, b) => a[9].localeCompare(b[9]),
    },
    {
        title: 'מועד אספקה',
        dataIndex: 10,
        key: 10,
        sorter: (a, b) => a[10].localeCompare(b[10]),
    },
    {
        title: 'יישוב',
        dataIndex: 11,
        key: 11,
        sorter: (a, b) => a[11].localeCompare(b[11]),
    },
    {
        title: 'רחוב ומספר בית',
        dataIndex: 12,
        key: 12,
        sorter: (a, b) => a[12].localeCompare(b[12]),
    },
    {
        title: 'פרטים למשלוח',
        dataIndex: 13,
        key: 13,
        sorter: (a, b) => a[13].localeCompare(b[13]),
    },
    {
        title: 'הערות להזמנה',
        dataIndex: 14,
        key: 14,
        sorter: (a, b) => a[14].localeCompare(b[14]),
    },
    {
        title: 'רשימת פרטים חסרים',
        dataIndex: 15,
        key: 15,
        sorter: (a, b) => a[15].localeCompare(b[15]),
    },
    {
        title: 'רשימת פרטים',
        dataIndex: 16,
        key: 16,
        render: (text, record, index) => <Popover trigger="click" onClick={(e) => e.stopPropagation()} content={<ItemsRenderer items={text} />}><Button>Items</Button></Popover>
    },
    {
        title: 'קוד הטבה',
        dataIndex: 17,
        key: 17,
        sorter: (a, b) => a[17].localeCompare(b[17]),
    },
    {
        title: 'סה״כ הזמנה מקורית',
        dataIndex: 18,
        key: 18,
        sorter: (a, b) => a[18] - b[18],
    },
    {
        title: 'סה״כ חוסרים',
        dataIndex: 19,
        key: 19,
        sorter: (a, b) => a[19] - b[19],
    },
    {
        title: 'תוספת משלוח',
        dataIndex: 20,
        key: 20,
        sorter: (a, b) => a[20] - b[20],
    },
    {
        title: 'סה״כ הנחה',
        dataIndex: 21,
        key: 21,
        sorter: (a, b) => a[21] - b[21],
    },
    {
        title: 'סה״כ לתשלום',
        dataIndex: 22,
        key: 22,
        sorter: (a, b) => a[22] - b[22],
    },
    {
        title: 'פריטים מעודכנים',
        dataIndex: 23,
        key: 23,
        render: (text, record, index) => <Popover trigger="click" onClick={(e) => e.stopPropagation()} content={<ItemsRenderer items={text} showUpdated />}><Button>Items</Button></Popover>

    },
];

const OrdersManagement = () => {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});

    const fileData = useMemo(() => parsingItemsToFile(data), [data]);
    const dataSource = useMemo(() => compact(data.slice(1, data.length)).map((d) => d.map((items, i) => items)), [data]);

    const handleOnDrop = useCallback((data) => {
        setData(data.map(({data}, index) => {
            if (index !== 0) data[16] = parsingItemsFromFile(data[16])
            return [...data, index === 0 ? 'פריטים מעודכנים' : data[16]];
        }));
    }, []);

    const handleOnError = useCallback((err, file, inputElem, reason) => {
            notification.error(err);
        }, []);

    const handleOnRemoveFile = useCallback((data) => {
        notification.info({message: 'File removed'});
    }, []);

    const updateItems = useCallback((id, newItems) => {
        const newData = [...data];
        newData[id][23] = newItems;
        setData(newData)
    }, [data])

    return (
        <Container>
            <CSVReader
                onDrop={handleOnDrop}
                onError={handleOnError}
                addRemoveButton
                removeButtonColor='#659cef'
                onRemoveFile={handleOnRemoveFile}
            >
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
            <StorageManagement dataSource={dataSource} />
            <CSVDownloader
                style={{maxWidth: 'max-content', margin: 20}}
                data={fileData}
                filename={'updated_csv'}
                type={'link'}
            >
                <Button type="primary">Export to CSV/XLS</Button>
            </CSVDownloader>
            <StyledTable
                scroll={{x: '100%'}}
                rowKey={(record) => record[0]}
                columns={columns}
                dataSource={dataSource}
                onRow={(record, rowIndex) => ({
                    onClick: () => {
                        setSelectedOrder(record);
                        setVisible(true);
                    }
                })}
                rowSelection={{selectedRowKeys: undefined, onChange: (selectedRowKeys, selectedRows) => console.log({selectedRowKeys, selectedRows})}}
            />
            <Modal
                title="Update Items"
                width="max-content"
                visible={visible}
                onCancel={() => (setVisible(false))}
                onOk={() => console.log('Apply pressed')}
                okText="APPLY"
            >
                <ContentModal selectedOrder={selectedOrder} updateItems={updateItems} />
            </Modal>
        </Container>
    )
}

export default OrdersManagement;
