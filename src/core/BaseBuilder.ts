export default class BaseBuilder {
  protected exportFile(dataType: string, fileName: string, data: string) {
		var charBom = "\uFEFF";
		var encodedData = encodeURIComponent(data);
    let content = `data:text/${dataType};charset=utf-8,${charBom}${encodedData}`;

    var link = document.createElement("a");
    link.setAttribute("href", content);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);

    link.click();
  }
}
