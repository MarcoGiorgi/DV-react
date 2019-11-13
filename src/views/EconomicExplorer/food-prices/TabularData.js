import React, { Component } from 'react';
import '../style.scss';

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Freeze,
  Inject,
  Resize,
  Sort,
  Toolbar,
  ExcelExport
} from '@syncfusion/ej2-react-grids';
import * as moment from 'moment';

class TabularData extends Component {
  constructor(props) {
    super(props);
    this.toolbarOptions = ['ExcelExport'];
  }

  toolbarClick(args) {
    switch (args.item.text) {
      case 'PDF Export':
        this.gridInstance.pdfExport();
        break;
      case 'CSV Export':
        this.gridInstance.csvExport();
        break;
      case 'Excel Export':
      default:
        this.gridInstance.excelExport();
    }
  }

  render() {
    console.log('tab', this.props.data);
    return (
      <GridComponent
        locale={this.props.locale}
        style={{ marginTop: 30, marginBottom: 90}}
        toolbar={this.toolbarOptions}
        width="96%"
        dataSource={this.props.data}
        frozenColumns={1}
        allowSelection={false}
        enableHover={false}
        allowResizing
        allowSorting
        allowMultiSorting={false}
        allowExcelExport
        toolbarClick={this.toolbarClick.bind(this)}
        ref={(g) => (this.gridInstance = g)}
      >
        <ColumnsDirective>
          {this.props.columns.map((column) => {
            if (column === this.props.firstColumn) {
              return <ColumnDirective field={column} headerText="" width="200" textAlign="Right" />;
            }
            return <ColumnDirective width="100" customAttributes={{class: 'dataviz' }}  field={column} headerText={moment(column).format('DD-MMM')} textAlign="Center" />;
          })}
        </ColumnsDirective>
        <Inject services={[Freeze, Resize, Sort, Toolbar, ExcelExport]} />
      </GridComponent>
    );
  }
}

export default TabularData;
