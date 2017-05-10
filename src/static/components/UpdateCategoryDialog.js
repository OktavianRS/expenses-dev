import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
var value = '';
const UpdateCategoryDialog = React.createClass({
    onSubmit() {
        let newTitle = value === '' ? this.props.title : value;
        this.props.submit(this.props.id, newTitle);
        this.props.close();
    },
    onChange(e) {
        value = e.target.value;
    },
    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.props.close}
            />,
            <FlatButton
              label="Update"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.onSubmit}
            />,
        ];

        return (
          <div>
            <Dialog
              title="Edit category"
              actions={actions}
              modal={false}
              open={this.props.state}
              onRequestClose={this.props.close}
            >
              <TextField
                defaultValue={this.props.title}
                fullWidth
                required
                hintText="Category name"
                errorText="This field is required"
                onChange={this.onChange}
              />
            </Dialog>
          </div>
        );
    }
});

export default UpdateCategoryDialog;
