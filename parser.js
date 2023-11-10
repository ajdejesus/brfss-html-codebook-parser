
const tables = document.getElementsByClassName('table');
const body = document.getElementsByClassName('body');
const dataCollection = [];

for (const tableIndex in tables) {
    if (typeof tables[tableIndex] === 'object') {
        const children = Array.from(tables[tableIndex].children);
        const headText = children.find(child => child.nodeName === 'THEAD')?.innerText;
        if (headText && tableIndex > 0) {
            const objectIndex = dataCollection.push({}) - 1;
            headText.split('\n').forEach(text => {
                const [key, value] = text.split(':');
                key && value && (dataCollection[objectIndex][key.split(/\s*/).join('')] = value.trim());
            });
            dataCollection[objectIndex].Data = [];
            Array.from(children.find(child => child.nodeName === 'TBODY')?.children).forEach(row => {
                const dataIndex = dataCollection[objectIndex].Data.push({}) - 1;
                [
                    dataCollection[objectIndex].Data[dataIndex].Value,
                    dataCollection[objectIndex].Data[dataIndex].Label,
                    dataCollection[objectIndex].Data[dataIndex].Frequency,
                    dataCollection[objectIndex].Data[dataIndex].Percentage,
                    dataCollection[objectIndex].Data[dataIndex].WghtPercentage
                ] = Array.from(row.children).map(child => child.innerText);
                [
                    dataCollection[objectIndex].Data[dataIndex].Value,
                    dataCollection[objectIndex].Data[dataIndex].Frequency,
                    dataCollection[objectIndex].Data[dataIndex].Percentage,
                    dataCollection[objectIndex].Data[dataIndex].WghtPercentage
                ] = [
                        Number(dataCollection[objectIndex].Data[dataIndex].Value) ?? dataCollection[objectIndex].Data[dataIndex].Value,
                        Number(dataCollection[objectIndex].Data[dataIndex].Frequency.split(',').join('')),
                        Number(dataCollection[objectIndex].Data[dataIndex].Percentage),
                        Number(dataCollection[objectIndex].Data[dataIndex].WghtPercentage)
                    ];
            });
        }
    }
}

console.log(dataCollection, JSON.stringify(dataCollection));
