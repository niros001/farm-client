import React, {useMemo, useState, useCallback} from 'react'
import styled from 'styled-components';
import {compact} from 'lodash'
import {notification, Table, Popover, Button, Modal} from 'antd';
import {CSVReader, CSVDownloader} from 'react-papaparse'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledTable = styled(Table)`
  td {
    overflow: hidden;
    white-space: nowrap;
    max-width: 200px;
    text-overflow: ellipsis;
  }
`

const ItemsRenderer = ({items}) => {
    const list = items.split('☐ ').slice(1, items.length);
    list.map((item) => console.log(item.split(' - ')))
    return <ul style={{width: 'max-content'}}>
        {list.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
}

const App = () => {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const relevantFields = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], []);
    const columns = useMemo(() => compact(data[0]).filter((_, i) => relevantFields.includes(i)).map((title, index) => ({title, dataIndex: index, key: index})), [relevantFields, data]);
    const dataSource = useMemo(() => compact(data.slice(1, data.length)).map((d) => d.filter((_, i) => relevantFields.includes(i)).map((items, i) => ((i === 16) || (i === 23)) ? (<Popover content={<ItemsRenderer items={items} />}><Button>Items</Button></Popover>) : items)), [relevantFields, data]);

    const handleOnDrop = useCallback((data) => {
        setData(data.map(({data}, index) => [...data, index === 0 ? 'פריטים מעודכנים' : '']));
    }, []);

    const handleOnError = useCallback((err, file, inputElem, reason) => {
            notification.error(err);
        }, []);

    const handleOnRemoveFile = useCallback((data) => {
        notification.info({message: 'File removed'});
    }, []);

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
            <StyledTable
                rowKey={(record) => record[0]}
                columns={columns}
                dataSource={dataSource}
                onRow={(record, rowIndex) => ({
                    onClick: () => setVisible(true)
                })}
            />
            <CSVDownloader
                data={data}
                filename={'updated_csv'}
                type={'link'}
            >
                <Button style={{margin: 20}} type="primary">Export to CSV/XLS</Button>
            </CSVDownloader>
            <Modal title="Update Items" visible={visible} onCancel={() => (setVisible(false))} footer={null}>
                <p>Update items...</p>
            </Modal>
        </Container>
    )
}

export default App;
