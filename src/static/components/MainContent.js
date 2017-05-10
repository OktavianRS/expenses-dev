import React from 'react';
import CreateNewExpense from './CreateNewExpense';
import ListExpense from './ListExpense';

const style = {
    content: {
        marginLeft: 257,
    }
};


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class MainContent extends React.Component {
    render() {
        return (
          <div style={style.content}>
            <ListExpense />
            <CreateNewExpense />
          </div>
        );
    }
}
