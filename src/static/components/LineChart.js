import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

const data = {
    labels: [],
    datasets: [
        {
            label: 'Price',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }
    ]
};

const style = {
    content: {
        marginLeft: 280,
    }
};

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
    return formatedToChart(sortDateArray(array));
}

function sortDateArray(array) {
    return array.sort(function(a,b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date);
    });
}

function formatedToChart(array) {
    data.labels = array.map(v => {
        return toNormalDate(v.date);
    });
    data.datasets[0].data = array.map(v => {
        return v.dollar;
    })
}

class LineChart extends React.Component {

    render() {
        sortList(this.props.expenses, this.props.checkedCategories);
        return (
          <div style={style.content}>
            <Line
              data={data}
              height={100}
            />
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showNotify: state.data.showNotify,
        message: state.data.message,
        expenses: state.expenses.expenses,
        checkedCategories: state.categories.checkedCategories,
    };
};

export default connect(mapStateToProps)(LineChart);
