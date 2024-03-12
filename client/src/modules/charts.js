import Chart from 'chart.js/auto';

const Utils = {
    CHART_COLORS: {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)',
    }
}

const pieChart = (element, title, categories, values) => {

    const data = {
        labels: categories,
        datasets: [{
            backgroundColor: Object.values(Utils.CHART_COLORS),
            data: values
        }]
    }

    const setConfig = (data) => {
        const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#000',
                            font: {
                                size: 12,
                                weight: 'bold',
                                lineHeight: 1.2,
                                family: 'Roboto',
                                style: 'normal'
                            },
                            boxWidth: 35,
                            boxHeight: 10,
                            padding: 15
                        },
                        paddingBottom: 42
                    },
                    title: {
                        display: true,
                        text: title,
                        position: 'top',
                        align: 'center',
                        color: '#290661',
                        paddingBottom: 20,
                        font: {
                            size: 28,
                            weight: 'bold',
                            lineHeight: 1.2,
                            family: 'Roboto',
                            style: 'normal'
                        }
                    },
                }
            }
        }
        return config
    };

    return new Chart(element, setConfig(data))
}

export default pieChart