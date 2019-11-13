import { CheckBoxSelection, Inject, MultiSelectComponent} from "@syncfusion/ej2-react-dropdowns";
import React, { Component } from 'react';
import deepEqual from 'react-fast-compare';

export class ProductSelect extends Component {
  shouldComponentUpdate(nextProps) {
    if (deepEqual(this.props.dataSource, nextProps.dataSource)) {
      return false;
    }
    if (this.productSelect) {
      this.productSelect.value = [];
    }
    return true;
  }

  render() {
    return (
      <MultiSelectComponent
        ref={(scope) => { this.productSelect = scope; }}
        enableSelectionOrder={false}
        hideSelectedItem={false}
        id={'productMultiselect'}
        dataSource={ this.props.dataSource }
        fields={{ text: 'product_name', value: 'product_code', groupBy: 'category_name' }}
        mode="CheckBox"
        enableGroupCheckBox={false}
        showDropDownIcon={true}
        sortOrder={'Ascending'}
        close={ evt => {
          console.log(evt);
        }}
        change={ this.props.onChange }
      >
        <Inject services={[CheckBoxSelection]} />
      </MultiSelectComponent>
      )
  }
}