// Blob -> objeto binario inmutable tipado (extensión).
// URL.createObject() -> recibe un Blob como parámetro para crear una url. 
export class DownloadController {
    convertToCSV(data) {
        if (!data.length) {
            return '';
        }
        const headers = Object.keys(data[0]);
        const rows = data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','));
        return [headers.join(','), ...rows].join('\n');
    }
    downloadCSV(csvtext) {
        if (csvtext) {
            const data1 = JSON.stringify(csvtext);
            const data = JSON.parse(data1);
            const csv = this.convertToCSV(data);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.setAttribute('download', 'filtered_data.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        else {
            console.error('no hay datos en localStorage.');
        }
    }
}
