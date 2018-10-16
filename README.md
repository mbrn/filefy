# filefy
A javascript library to produce downloadable files such as in CSV, PDF, XLSX, DOCX formats

> Only CSV export is available for now!

# Installation

To install filefy with `npm`:
    npm install --save filefy

To install filefy with `yarn`:
    yarn add filefy

# Usage

```js
import { CsvBuilder } from 'filefy';

var csvBuilder = new CsvBuilder("user_list.csv")
  .setColumns(["name", "surname"])
  .addRow(["mehmet", "baran"])
  .addRows([
    ["gulcan", "baran"],
    ["zerya betül", "baran"]
  ])
  .exportFile();
```

## Licence

This project is licensed under the terms of the [MIT license](/LICENSE).
