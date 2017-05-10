import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/expenses';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CreateExpensesDialog from './CreateExpensesDialog';

const style = {
    button: {
        position: 'absolute',
        right: 10,
        bottom: 20,
    }
};

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
const CreateNewExpense = React.createClass({
    getInitialState() {
        return {
            isCreateDialogOpened: false,
            isUpdateDialogOpened: false,
            categoryId: null,
        };
    },
    openCreateDialog() {
        this.setState({
            isCreateDialogOpened: true,
        })
    },
    closeCreateDialog() {
        this.setState({
            isCreateDialogOpened: false,
        })
    },
    render() {
        return (
          <div>
            <FloatingActionButton
              style={style.button}
              onClick={this.openCreateDialog}>
              <ContentAdd />
            </FloatingActionButton>
            <CreateExpensesDialog
              close={this.closeCreateDialog}
              state={this.state.isCreateDialogOpened}
              submit={this.props.actions.createExpense}
              categories={this.props.categories}
            />
          </div>
        );
    }
});

CreateNewExpense.contextTypes = {
    createExpense: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewExpense);
