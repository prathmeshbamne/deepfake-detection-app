document.addEventListener('DOMContentLoaded', function() {
    // Get the canvas element
    const ctx = document.getElementById('accuracyChart');
    
    // Set canvas dimensions (important for responsiveness)
    ctx.width = ctx.parentElement.offsetWidth;
    ctx.height = 400;
    
    // Sample data - replace with your actual metrics
    const metrics = {
        accuracy: {
            label: 'Accuracy (%)',
            data: [65, 72, 78, 85, 88, 90, 91, 92, 93, 94, 94.2, 94.5, 94.7],
            borderColor: '#4361ee',
            backgroundColor: 'rgba(67, 97, 238, 0.1)'
        },
        loss: {
            label: 'Loss',
            data: [1.8, 1.2, 0.9, 0.7, 0.6, 0.5, 0.45, 0.4, 0.38, 0.35, 0.34, 0.33, 0.32],
            borderColor: '#e63946',
            backgroundColor: 'rgba(230, 57, 70, 0.1)'
        }
    };
    
    // Initialize chart
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 13}, (_, i) => `Epoch ${i + 1}`),
            datasets: [{
                label: metrics.accuracy.label,
                data: metrics.accuracy.data,
                borderColor: metrics.accuracy.borderColor,
                backgroundColor: metrics.accuracy.backgroundColor,
                borderWidth: 3,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        chart.resize();
    });
});