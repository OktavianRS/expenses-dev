import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { notifyEnd } from '../actions/data';


class Snack extends React.Component {
    handleCloseSnack = () => {
        this.props.dispatch(notifyEnd())
    }
    render() {
        return (
          <div>
            <Snackbar
              open={this.props.showNotify || false}
              message={this.props.message || ''}
              autoHideDuration={4000}
              onRequestClose={this.handleCloseSnack}
            />
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showNotify: state.data.showNotify,
        message: state.data.message,
    };
};

export default connect(mapStateToProps)(Snack);
