import Chart from 'chart.js/auto';

const pieChart = (element, title, categories, values) => {

    const data = {
        labels: categories,
        datasets: [{
            backgroundColor: ["#dc3545", "#fd7e14", "#ffc107", "#20c997", "#0d6efd"],
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