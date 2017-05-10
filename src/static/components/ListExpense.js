import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import * as actionCreators from '../actions/categories';

//material-ui
import LinearProgress from 'material-ui/LinearProgress';

const styles = {
    space: {
        height: 52,
    },
    indicator: {
        height: 4,
    },
    row: {
        padding: 10,
        textAlign: 'center'
    },
    container: {
        height: '45vh',
        overflowY: 'auto'
    }
}

function toNormalDate(date) {
    var d = new Date(date);
    var formattedDate = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    // var hours = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    // var minutes = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
    // var formattedTime = hours + ':' + minutes;

    return formattedDate;
}

function sortList(array, checkedCategories) {
    if (checkedCategories.length) {
        array = array.filter((item) => checkedCategories.indexOf(item.category) !== -1);
    }
    return sortDateArray(array);
}

function sortDateArray(array) {
    return array.sort(function(a,b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
    });
}

const CategoriesList = React.createClass({
    getInitialState() {
        return {
        };
    },
    indicator() {
        return this.props.isExpensesFetching
          ? <LinearProgress mode="indeterminate" />
          : <div style={styles.indicator} />
    },
    handleRowClick() {
        console.log('trig');
    },
    list() {
        const sorted = sortList(this.props.expenses, this.props.checkedCategories);
        return sorted.map((v,k) => {
            return (
              <TableRow
                key={k}
                onCellClick={this.handleRowClick}
              >
                <TableRowColumn style={styles.row}>{v.title}</TableRowColumn>
                <TableRowColumn style={styles.row}>{v.description}</TableRowColumn>
                <TableRowColumn style={styles.row}>{toNormalDate(v.date)}</TableRowColumn>
                <TableRowColumn style={styles.row}>{v.dollar}</TableRowColumn>
                <TableRowColumn style={styles.row}>{v.cent}</TableRowColumn>
              </TableRow>
            );
        });
    },
    render() {
        return (
          <div style={styles.container}>
            {this.indicator()}
            <Table
              selectable={false}
              multiSelectable={false}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Description</TableHeaderColumn>
                  <TableHeaderColumn>Date</TableHeaderColumn>
                  <TableHeaderColumn>Dollars</TableHeaderColumn>
                  <TableHeaderColumn>Cents</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                showRowHover
                stripedRows
              >
                {this.list()}
              </TableBody>
            </Table>
          </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        isExpensesFetching: state.expenses.isFetching,
        isExpensesFetched: state.expenses.isFetched,
        expenses: state.expenses.expenses,
        checkedCategories: state.categories.checkedCategories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
