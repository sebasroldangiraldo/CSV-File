export class FileController {
    constructor(fileContent) {
        this.fileContent = fileContent;
        this.data = []; // todo el archivo completo.
        this.columNames = []; // todos los títulos de las columnas (keys).
        this.processFile(); // método que pertenece a la clase a la cual se le asignará el parámetro de entrada 'fileContent'.
    }
    processFile() {
        const lines = this.fileContent.split(/[\r\n]+/).filter(line => line.trim() !== ''); // en la variable 'lines' se almacena la información del archivo .csv - itera fila por fila. Filtra los registros que tiene espacios al incio o al final y luego, por cada salto de línea, se divide cada línea será almacenado como un array independiente. 
        if (lines.length > 0) { // siempre y cuando 'lines' no está vacío, se ejecuta la condición.
            this.columNames = lines[0].split(','); // define los títulos y los almacena. Están en la posición 0.
            this.data = lines.slice(1).map(line => {
                const values = line.split(','); // cada valor será tomado de manera independiente cuando encuentre una coma.
                const row = {}; // objeto donde se almacenan las claves y los valores del archivo.
                this.columNames.forEach((colName, index) => {
                    row[colName] = values[index] || '';
                });
                return row; // retorna una fila compuesta por una clave y un valor.
            });
        }
    }
    getData() {
        return this.data; // retorna el objeto.
    }
    getColumNames() {
        return this.columNames;
    }
}
