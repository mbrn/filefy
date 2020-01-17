import IFileExporter from '../core/IFileExporter';
import BaseBuilder from '../core/BaseBuilder';

export default class CsvBuilder extends BaseBuilder implements IFileExporter {
  private _FileName: string = '';
  private _Delimeter: string = ',';
  private _Columns: string[] = [];
  private _RowData: string[][] = [];
  private _ExplicitDelimiter: boolean = false;

  constructor(fileName: string, explicitDelimiter = false) {
    super();
    this._FileName = fileName;
    this._ExplicitDelimiter = explicitDelimiter;
  }

  public setColumns(columns: string[]): CsvBuilder {
    this._Columns = columns;
    return this;
  }

  public setDelimeter(delimeter: string): CsvBuilder {
    this._Delimeter = delimeter;
    return this;
  }

  public addRow(row: string[]): CsvBuilder {
    this._RowData.push(row);
    return this;
  }

  public addRows(rows: string[][]): CsvBuilder {
    this._RowData = [...this._RowData, ...rows];
    return this;
  }

  private escapeCell(cellData: string): string {
    if(typeof cellData === 'string') {
      return '"' + cellData.replace(/\"/g, '""') + '"';
    }
    return cellData;
  }

  private getRowData(row: string[]): string {
    return row.map(this.escapeCell).join(this._Delimeter);
  }

  public exportFile(): void {
    let dataArray:string[] = []; 
    
    if (this._ExplicitDelimiter) {
      dataArray.push("sep=" + this._Delimeter);
    }
    
    if(this._Columns && this._Columns.length > 0) {
      dataArray.push(this.getRowData(this._Columns));
    }

    this._RowData.forEach(row => {
      dataArray.push(this.getRowData(row));
    });

    const csvContent = dataArray.join("\r\n");
    super.exportFile('csv', this._FileName, csvContent);
  }
}
