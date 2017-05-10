import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateCategoryDialog from './CreateCategoryDialog';
import UpdateCategoryDialog from './UpdateCategoryDialog';
import * as actionCreators from '../actions/categories';

//material-ui
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import Add from 'material-ui/svg-icons/content/add';

const styles = {
    space: {
        height: 52,
    },
    indicator: {
        height: 4,
    }
}

const iconButtonElement = (
  <IconButton
    touch={true}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const CategoriesList = React.createClass({
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
    openUpdateDialog(id, title) {
        this.setState({
            isUpdateDialogOpened: true,
            categoryId: id,
            categoryTitle: title,
        })
    },
    closeUpdateDialog() {
        this.setState({
            isUpdateDialogOpened: false,
        })
    },
    createCategory(title) {
        this.props.actions.createCategory(title);
    },
    updateCategory(id, title) {
        this.props.actions.updateCategory(id, title);
    },
    indicator() {
        return this.props.isCategoriesFetching
          ? <LinearProgress mode="indeterminate" />
          : <div style={styles.indicator} />
    },
    handleDelete(id) {
        this.props.actions.deleteCategory(id);
    },
    handleCheck(id, e) {
        const { checked } = e.target;
        checked ? this.props.actions.checkNewCategorie(id) : this.props.actions.uncheckNewCategorie(id);
    },
    list() {
        return this.props.categories.map((v,k) => {
            let handleDelete = this.handleDelete.bind(this, v.id);
            let handleCheck = this.handleCheck.bind(this, v.id);
            let handleUpdate = this.openUpdateDialog.bind(this, v.id, v.title);
            return (
              <ListItem
                onChange={handleCheck}
                key={k}
                leftCheckbox={<Checkbox />}
                rightIconButton={
                  <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem
                      onClick={handleUpdate}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={handleDelete}
                    >
                      Delete
                    </MenuItem>
                  </IconMenu>
                }
                primaryText={v.title}
              />
            );
        });
    },
    render() {
        return (
          <Drawer
            open
            swipeAreaWidth={40}
          >
            <div style={styles.space} />
            {this.indicator()}
            <List>
              <ListItem
                onClick={this.openCreateDialog}
                rightIconButton={
                  <IconButton>
                    <Add />
                  </IconButton>
                }
                primaryText="Create new category"
              />
              {this.list()}
            </List>
            <CreateCategoryDialog
              close={this.closeCreateDialog}
              state={this.state.isCreateDialogOpened}
              submit={this.createCategory}
            />
            <UpdateCategoryDialog
              id={this.state.categoryId}
              title={this.state.categoryTitle}
              close={this.closeUpdateDialog}
              state={this.state.isUpdateDialogOpened}
              submit={this.updateCategory}
            />
          </Drawer>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        isCategoriesFetching: state.categories.isFetching,
        isCategoriesFetched: state.categories.isFetched,
        categoriesCount: state.categories.count,
        categories: state.categories.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
