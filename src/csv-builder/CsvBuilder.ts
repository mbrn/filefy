import IFileExporter from '../core/IFileExporter';
import BaseBuilder from '../core/BaseBuilder';

export default class CsvBuilder extends BaseBuilder implements IFileExporter {
  private _FileName: string = '';
  private _Delimeter: string = ',';
  private _Columns: string[] = [];
  private _RowData: string[][] = [];

  constructor(fileName: string) {
    super();
    this._FileName = fileName;
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
  

  private getRowData(row: string[]): string {
    return row.join(this._Delimeter);
  }

  public exportFile(): void {
    let dataArray:string[] = [];    
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