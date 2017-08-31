const React = require('react');
const PropTypes = require('prop-types');
const {AgGridReact} = require('ag-grid-react');
const _ = require('lodash');

const { StoreConnector } = require('hadron-react-components');
const TypeChecker = require('hadron-type-checker');
const HadronDocument = require('hadron-document');

const BreadcrumbComponent = require('./breadcrumb');
const BreadcrumbStore = require('../stores/breadcrumb-store');
const CellRenderer = require('./table-view/cell-renderer');
const FullWidthCellRenderer = require('./table-view/full-width-cell-renderer');
const HeaderComponent = require('./table-view/header-cell-renderer');
const CellEditor = require('./table-view/cell-editor');

// const util = require('util');

/**
 * Represents the table view of the documents tab.
 */
class DocumentListTableView extends React.Component {
  constructor(props) {
    super(props);
    this.createColumnHeaders = this.createColumnHeaders.bind(this);
    this.createRowData = this.createRowData.bind(this);
    this.addEditingFooter = this.addEditingFooter.bind(this);
    this.onRowClicked = this.onRowClicked.bind(this);

    this.gridOptions = {
      context: {
        column_width: 150
      },
      onRowClicked: this.onRowClicked,
      onCellClicked: this.onCellClicked.bind(this)
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  // /**
  //  * @param {Object} event
  //  *    column: Column, // the column for the cell in question
  //  *    colDef: ColDef, // the column definition for the cell in question
  //  *    value: any // the value for the cell in question
  //  */
  // onCellClicked(event) {
  //   // console.log('a cell was clicked + event=');
  // }

  /**
   * Callback for when a row is clicked.
   *
   * @param {Object} event
   *     node {RowNode} - the RowNode for the row in question
   *     data {*} - the user provided data for the row in question
   *     rowIndex {number} - the visible row index for the row in question
   *     rowPinned {string} - 'top', 'bottom' or undefined / null if not pinned
   *     context: {*} - bag of attributes, provided by user, see Context
   *     event?: {Event} - event if this was result of a browser event
   */
  onRowClicked(event) {
    this.addEditingFooter(event.node, event.data, event.rowIndex);
  }

  /**
   * Add a row to the table that represents the update/cancel footer for the
   * row directly above. The row will be a full-width row that has the same
   * hadron-document as the "data" row above.
   *
   * @param rowNode {RowNode} The RowNode for the row that was clicked on.
   * @param data {object} The data for the row that was clicked on. Will be a
   *  HadronDocument with some metadata.
   * @param rowIndex {number} Index of the row clicked on.
   */
  addEditingFooter(rowNode, data, rowIndex) {
    /* Ignore clicks on footers or data rows that already have footers */
    if (data.isFooter || data.hasFooter) {
      return;
    }

    /* Add footer below this row */
    rowNode.data.hasFooter = true;
    const newData = {
      hadronDocument: data.hadronDocument,
      hasFooter: false,
      isFooter: true,
      state: 'editing'
    };
    this.gridApi.updateRowData({add: [newData], addIndex: rowIndex + 1});
  }

  /**
   * Add a row to the table that represents the delete/cancel footer for the
   * row directly above. The row will be a full-width row that has the same
   * hadron-document as the "data" row above.
   *
   * @param rowNode {RowNode} The RowNode for the row that was clicked on.
   * @param data {object} The data for the row that was clicked on. Will be a
   *  HadronDocument with some metadata.
   * @param rowIndex {number} Index of the row clicked on.
   */
  addDeletingFooter(rowNode, data, rowIndex) {
    /* If bar exists and is in editing mode, set to deleting */
    if (data.isFooter) {
      return;
    } else if (data.hasFooter) {
      data.state = 'deleting'; // TODO: need to notify footer row that state has changed (COMPASS-1870)
      return;
    }

    /* Add deleting row below this row */
    rowNode.data.hasFooter = true;
    const newData = {
      hadronDocument: data.hadronDocument,
      hasFooter: false,
      isFooter: true,
      state: 'deleting'
    };
    this.gridApi.updateRowData({add: [newData], addIndex: rowIndex + 1});
  }

  /**
   * Define all the columns in table and their renderer components.
   *
   * @returns {object} the ColHeaders
   */
  createColumnHeaders() {
    const headers = {};
    // const width = this.gridOptions.context.column_width;
    const isEditable = this.props.isEditable;

    for (let i = 0; i < this.props.docs.length; i++) {
      _.map(this.props.docs[i], function(val, key) {
        headers[key] = {
          headerName: key,
          // width: width, TODO: prevents horizontal scrolling

          valueGetter: function(params) {
            return params.data.hadronDocument.get(key);
          },

          headerComponentFramework: HeaderComponent,
          headerComponentParams: {
            bsonType: TypeChecker.type(val)
          },

          cellRendererFramework: CellRenderer,
          cellRendererParams: {},

          editable: function(params) {
            if (!isEditable) {
              return false;
            }
            return params.node.data.hadronDocument.get(key).isValueEditable();
          },

          cellEditorFramework: CellEditor,
          cellEditorParams: {}
        };
      });
    }
    return Object.values(headers);
  }

  /**
   * Create data for each document row. Contains a HadronDocument and some
   * metadata.
   *
   * @returns {Array} A list of HadronDocument wrappers.
   */
  createRowData() {
    return _.map(this.props.docs, function(val) {
      // TODO: Make wrapper object for HadronDocument
      return {
        /* The same doc is shared between a document row and it's footer */
        hadronDocument: new HadronDocument(val),
        /* Is this row an footer row or document row? */
        isFooter: false,
        /* If this is a document row, does it already have a footer? */
        hasFooter: false,
        /* If this is a footer, state is 'editing' or 'deleting' */
        state: null
      };
    });
  }

  /**
   * Render the document table view.
   *
   * @returns {React.Component} The component.
   */
  render() {
    const containerStyle = {
      height: 1000,
      width: 1200
    };

    return (
      <div>
        <StoreConnector store={BreadcrumbStore}>
          <BreadcrumbComponent/>
        </StoreConnector>
        <div style={containerStyle}>
          <AgGridReact
            // properties
            columnDefs={this.createColumnHeaders()}
            gridOptions={this.gridOptions}

            isFullWidthCell={(rowNode)=>{return rowNode.data.isFooter;}}
            fullWidthCellRendererFramework={FullWidthCellRenderer}

            rowData={this.createRowData()}
            // events
            onGridReady={this.onGridReady.bind(this)}
        />
        </div>
      </div>
    );
  }
}

DocumentListTableView.propTypes = {
  docs: PropTypes.array.isRequired,
  isEditable: PropTypes.bool.isRequired
};

DocumentListTableView.displayName = 'DocumentListTableView';

module.exports = DocumentListTableView;
