export default class BaseBuilder {
  protected exportFile(dataType: string, fileName: string, data: string) {
    const properties = {type: `text/${dataType}`};
    let file = null;
    try {
      file = new File([data], fileName, properties);
    } catch (e) {
      file = new Blob([data], properties);
    }
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file, fileName);
    } else {
      const a = document.createElement('a');
      document.body.appendChild(a);
      const url = window.URL.createObjectURL(file);
      a.href = url;
      a.download = fileName;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    }
  }
}
