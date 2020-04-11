function table(headers, results) {
  var l = [], i, j;
  l.push('<table id="table">');
  l.push('<tr>')
  for (i = 0; i < headers.length; i++) {
    l.push('<th>' + headers[i] + '</th>');
  }
  l.push('</tr>')
  for (i = 0; i < results.length; i++) {
    l.push('<tr>')
    var item = results[i];
    for (j = 0; j < headers.length; j++) {
      l.push('<td contenteditable="true">' + (item[headers[j]] || '')+ '</td>');
    }
    l.push('</tr>')
  }
  l.push('</table>');
  return l.join('')
}
var headerRow = document.getElementById('headerRow');
var header, rows;
var excelImporter = new ExcelImporter('import', {
  onLoaded: function(res) {
    console.log("excel data:\n ", JSON.stringify(res));
    header = res[0].header;
    rows = res[0].results;
    document.getElementById('container').innerHTML = table(header, rows);
  }
});
var excelExporter = new ExcelExporter('export', {
  data: function() {
    return rows;
  }
});

headerRow.addEventListener('change', function() {
  excelImporter.setHeaderRow(+headerRow.value);
})

var multiHeaderRow = document.getElementById('multiHeaderRow');
var multiExcelImporter = new ExcelImporter('multiImport', {
  onlyFirstSheet: false,
  onLoaded: function(res) {
    var dateCol = document.getElementById('dateCol').value;
    var year = document.getElementById('year').value;
    header = null;
    rows = [];
    for (var i = 0; i < res.length; i++) {
      if (!header) {
        header = res[i].header;
      }

      if (dateCol && year) {
        for (var j = 0; j < res[i].results.length; j++) {
          var item = res[i].results[j];
          if (item[dateCol]) {
            item[dateCol] = year + item[dateCol];
          }
        }
      }
      rows = rows.concat(res[i].results);
    }
    document.getElementById('container').innerHTML = table(header, rows);
  }
});

multiHeaderRow.addEventListener('change', function() {
  multiExcelImporter.setHeaderRow(+multiHeaderRow.value);
})

var excelTableDownloader = new ExcelExporter('exportTable', {
  tableId: 'table'
});

var excelRemoteDownloader = new ExcelExporter('exportRemote', {
  url: 'https://howiefh.github.io/uploader/excel/demo/data.json',
  ajaxData: {
    t: Date.now()
  }
});

var exportRemoteGroupHeaderDownloader = new ExcelExporter('exportRemoteGroupHeader', {
  url: 'https://howiefh.github.io/uploader/excel/demo/data.json',
  columns: [
    {
      name: 'Name'
    },
    {
      name: 'Detail',
      children: [
        {
          name: 'Sex'
        },
        {
          name: 'Score'
        }
      ]
    },
    {
      name: 'Date'
    }
  ],
  ajaxData: {
    t: Date.now()
  }
});

var jsonExporter = new ExcelExporter('exportJson', {bindClick: false});
var exportJsonBtn = document.querySelector('#exportJson');

exportJsonBtn.addEventListener('click', function() {
  exportJsonData()
})

function exportJsonData() {
  var jsonEle = document.querySelector('#json');
  if (jsonEle.value) {
    var json = JSON.parse(jsonEle.value);
    jsonExporter.exportJsonToExcel(json);
  }
}
