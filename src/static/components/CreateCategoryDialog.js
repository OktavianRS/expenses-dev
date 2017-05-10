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
export default class createCategoryDialog extends React.Component {
    onSubmit() {
        this.props.submit(value);
        this.props.close();
    }
    onChange(e) {
        value = e.target.value;
    }
    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.props.close}
            />,
            <FlatButton
              label="Create"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.onSubmit.bind(this)}
            />,
        ];

        return (
          <div>
            <Dialog
              title="Create new category"
              actions={actions}
              modal={false}
              open={this.props.state}
              onRequestClose={this.props.close}
            >
              <TextField
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
}
