import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import background from '../../images/expense_img.png';

class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        userName: React.PropTypes.string
    };

    static defaultProps = {
        statusText: '',
        userName: ''
    };

    render() {
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Save your expenses any time</h1>
                </div>
                <div className="margin-top-medium text-center">
                    <img className="page-logo margin-bottom-medium"
                         src={background}
                         alt="ReactJs"
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
