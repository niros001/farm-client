export const parsingItemsFromFile = (items) => items.split('☐ ').slice(1, items.length).map((item) => {
    const [count, name] = item.split(' - ');
    const [value, type] = count.split(' ');
    return ({name, value: parseInt(value), updatedValue: parseInt(value), type})
});

export const parsingItemsToFile = (items) => items.map((item, index) => {
    const newItem = [...item];
    if (index !== 0) {
        if (Array.isArray(item[16])) {
            newItem[16] = newItem[16].map(({name, value, type}) => `☐ ${value} ${type} - ${name}`).toString();
        }
        if (Array.isArray(item[23])) {
            newItem[23] = newItem[23].map(({name, updatedValue, type}) => `☐ ${updatedValue} ${type} - ${name}`).toString();
        }
    }
    return item;
});
