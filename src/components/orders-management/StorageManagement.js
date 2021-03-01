import React from 'react';
import {compact} from 'lodash';
import {Table} from 'antd';

const columns = [
    {
        title: "מוצר",
        dataIndex: 0,
        key: 0,
        sorter: (a, b) => a[0].localeCompare(b[0]),
    },
    {
        title: 'כמות',
        dataIndex: 1,
        key: 1,
        render: (text) => <div>{text.value}</div>,
        sorter: (a, b) => a[1].value - b[1].value,
    },
    {
        title: 'סוג',
        dataIndex: 1,
        key: 1,
        render: (text) => <div>{text.type}</div>,
        sorter: (a, b) => a[1].type.localeCompare(b[1].type),
    },
]

const StorageManagement = ({dataSource}) => {
    const items =
        compact(dataSource).map((data) => data[16])
            .reduce((acc, cur) => {
                let newAcc = acc;
                cur.map(({name, value, type}) => {
                    newAcc = ({...newAcc, [name]: {value: (newAcc[name]?.value || 0) + value, type}})
                    return null;
                })
                return newAcc;
            }, {})
    return (
        <>
            <div>STORAGE</div>
            <div>to give</div>
            <br/>
            <Table rowKey={(record) => record[0]}
                   columns={columns}
                   dataSource={Object.entries(items)}
            />
        </>
    )
};

export default StorageManagement;
