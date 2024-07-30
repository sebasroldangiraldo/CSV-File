import { DataRow, DataTable, ColumnName } from "./models"; // importar models.

export class FileController { // controlador del archivo que se procesa.
    private data : DataTable = []; // todo el archivo completo.
    private columNames : ColumnName = []; // todos los títulos de las columnas (keys).

    constructor (private fileContent : string) { // 'fileContent' será el archivo .csv
        this.processFile(); // método que pertenece a la clase a la cual se le asignará el parámetro de entrada 'fileContent'.
    }

    private processFile() { // se define la lógica del método para leer y procesar el archivo .csv
        const lines : string[] = this.fileContent.split(/[\r\n]+/).filter(line => line.trim()!==''); // en la variable 'lines' se almacena la información del archivo .csv - itera fila por fila. Filtra los registros que tiene espacios al incio o al final y luego, por cada salto de línea, se divide cada línea será almacenado como un array independiente. 
        if (lines.length > 0) { // siempre y cuando 'lines' no está vacío, se ejecuta la condición.
            this.columNames = lines[0].split(','); // define los títulos y los almacena. Están en la posición 0.
            this.data = lines.slice(1).map(line => { // itera a partir de la posición 1.
                const values = line.split(','); // cada valor será tomado de manera independiente cuando encuentre una coma.
                const row : DataRow = {}; // objeto donde se almacenan las claves y los valores del archivo.
                this.columNames.forEach((colName, index) => { // divide los datos con clave y valor (nombre de la columa y el valor que esta almacena).
                    row[colName] = values[index] || '';
                });
                return row; // retorna una fila compuesta por una clave y un valor.
                
            });
        }
    }

    getData() : DataTable { // método para cargar los datos obtenidos (los datos de las líneas).
        return this.data; // retorna el objeto.
    }

    getColumNames() : ColumnName { // retorna lun array compuesto por los títulos de las columnas.
        return this.columNames; 
   }
}