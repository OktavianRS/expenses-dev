import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import DatePicker from 'material-ui/DatePicker';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
const createExpensesDialog = React.createClass({
    getInitialState() {
        return {
            dollar: 0,
            cent: 0,
            date: Date.now(),
            category: '',
        };
    },
    onSubmit() {
        this.props.submit(this.state);
        this.props.close();
    },

    onTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    },

    onDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    },

    onSelectChange(event, index, value) {
        this.setState({
            category: value
        });
    },

    handleFirstSlider(event, value) {
        this.setState({
            dollar: value
        });
    },
    handleSecondSlider(event, value) {
        this.setState({
            cent: value
        });
    },
    onDateChange(event, value) {
        console.log(value);
        this.setState({
            date: value
        })
    },
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
              onTouchTap={this.onSubmit}
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
                name="title"
                hintText="Title"
                onChange={this.onTitleChange}
              />
              <SelectField
                fullWidth
                floatingLabelText="Category"
                onChange={this.onSelectChange}
              >
                {
                  this.props.categories.map((v,k) => {
                      return <MenuItem key={k} value={v.id} primaryText={v.title} />
                  })
                }
              </SelectField>
              <DatePicker
                hintText="Choose date"
                container="inline"
                onChange={this.onDateChange}
              />
              <span>{'How much dollars: ' + this.state.dollar}</span>
              <Slider
                defaultValue={0}
                step={1}
                max={100}
                min={0}
                value={this.state.dollar}
                onChange={this.handleFirstSlider}
              />
            <span>{'How much cents: ' + this.state.cent}</span>
              <Slider
                defaultValue={0}
                step={1}
                max={100}
                min={0}
                value={this.state.cent}
                onChange={this.handleSecondSlider}
              />
              <TextField
                hintText="Describe your expense"
                floatingLabelText="Description"
                multiLine={true}
                rows={4}
                onChange={this.onDescriptionChange}
              />
            </Dialog>
          </div>
        );
    }
})
export default createExpensesDialog;
