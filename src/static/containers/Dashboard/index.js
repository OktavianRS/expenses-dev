import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as categoryActionCreators from '../../actions/categories';
import * as expenseActionCreators from '../../actions/expenses';

//components
import CategoriesList from '../../components/CategoriesList';
import MainContent from '../../components/MainContent';
import LineChart from '../../components/LineChart';

class DashboardView extends React.Component {

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        isAuthenticated: React.PropTypes.bool.isRequired,
        isAuthenticating: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        categoryActions: React.PropTypes.shape({
            fetchCategories: React.PropTypes.func.isRequired,
            createCategory: React.PropTypes.func.isRequired,
        }).isRequired,
        location: React.PropTypes.shape({
            query: React.PropTypes.object.isRequired
        })
    };

    static defaultProps = {
        statusText: '',
        location: null
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    getChildContext() {
        return {
            createExpense: this.props.expenseActions.createExpense
        };
    }

    componentWillMount() {
        // this.props.categoryActions.createCategory();
        if (!this.props.isAuthenticated) {
            this.props.dispatch(push('/'));
        } else {
            this.props.categoryActions.fetchCategories();
            this.props.expenseActions.fetchExpenses();
            
        }
    }

    render() {
        return (
          <div>
            <CategoriesList />
            <MainContent />
            <LineChart />
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        categoryActions: bindActionCreators(categoryActionCreators, dispatch),
        expenseActions: bindActionCreators(expenseActionCreators, dispatch)
    };
};

DashboardView.childContextTypes = {
    createExpense: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
export { DashboardView as DashboardViewNotConnected };
