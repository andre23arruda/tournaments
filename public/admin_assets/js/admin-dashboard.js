document.addEventListener('DOMContentLoaded', function () {
    const dataElement = document.getElementById('dashboard-data');
    if (!dataElement) return;

    let dashboardData;
    try {
        dashboardData = JSON.parse(dataElement.textContent);
    } catch (e) {
        console.error('Erro ao processar dados do dashboard:', e);
        return;
    }

    if (typeof Chart === 'undefined') {
        console.warn('Chart.js não carregado. Gráficos não serão inicializados.');
        return;
    }

    const activeApps = dashboardData.active_apps || [];
    if (!dashboardData.has_any_perm || activeApps.length === 0) {
        return;
    }

    const isDarkMode = document.body.classList.contains('dark-mode') || document.body.classList.contains('theme-dark');
    const textColor = isDarkMode ? '#9ca3af' : '#6b7280';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
    const tooltipBg = isDarkMode ? '#1f2937' : '#111827';

    // State for timeline chart
    let currentMetric = 'tournaments'; // 'tournaments' | 'games'
    let currentPeriod = 'all'; // 'all' | '12' | '6'
    let timelineChart = null;

    // State for donut chart
    let currentDonutMetric = 'tournaments'; // 'tournaments' | 'games'
    let donutChart = null;

    // Helper: Filter data based on selected period
    function getFilteredTimelineData() {
        const fullLabels = dashboardData.labels || [];
        const seriesData = dashboardData[currentMetric] || { cup: [], bt_league: [], futevolei: [], total: [] };

        let startIndex = 0;
        if (currentPeriod === '6') {
            startIndex = Math.max(0, fullLabels.length - 6);
        } else if (currentPeriod === '12') {
            startIndex = Math.max(0, fullLabels.length - 12);
        }

        const res = {
            labels: fullLabels.slice(startIndex),
            total: (seriesData.total || []).slice(startIndex),
        };

        activeApps.forEach(app => {
            res[app.key] = (seriesData[app.key] || []).slice(startIndex);
        });

        return res;
    }

    // Helper: Build timeline datasets dynamically based on permitted apps
    function buildTimelineDatasets(filtered) {
        const datasets = [];

        activeApps.forEach(app => {
            datasets.push({
                key: app.key,
                label: app.label,
                data: filtered[app.key] || [],
                borderColor: app.color,
                backgroundColor: app.bg_color,
                borderWidth: 2.5,
                fill: true,
                tension: 0.35,
                pointBackgroundColor: app.color,
                pointBorderColor: '#ffffff',
                pointHoverRadius: 6,
                pointRadius: 4,
            });
        });

        if (activeApps.length > 1) {
            datasets.push({
                key: 'total',
                label: 'Total Geral',
                data: filtered.total || [],
                borderColor: '#64748b',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                tension: 0.35,
                pointBackgroundColor: '#64748b',
                pointBorderColor: '#ffffff',
                pointHoverRadius: 5,
                pointRadius: 3,
            });
        }

        return datasets;
    }

    // Initialize Timeline Chart
    const timelineCtx = document.getElementById('dashboardTimelineChart');
    if (timelineCtx) {
        const filtered = getFilteredTimelineData();

        timelineChart = new Chart(timelineCtx, {
            type: 'line',
            data: {
                labels: filtered.labels,
                datasets: buildTimelineDatasets(filtered)
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: textColor,
                            usePointStyle: true,
                            boxWidth: 8,
                            boxHeight: 8,
                            padding: 15,
                            font: {
                                size: 12,
                                family: 'Oswald, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: tooltipBg,
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        padding: 10,
                        boxPadding: 4,
                        usePointStyle: true,
                        callbacks: {
                            label: function (context) {
                                return ` ${context.dataset.label}: ${context.parsed.y} ${currentMetric === 'tournaments' ? 'torneio(s)' : 'jogo(s)'}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: gridColor,
                        },
                        ticks: {
                            color: textColor,
                            font: {
                                size: 11,
                                family: 'Oswald, sans-serif'
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: gridColor,
                        },
                        ticks: {
                            color: textColor,
                            precision: 0,
                            font: {
                                size: 11,
                                family: 'Oswald, sans-serif'
                            }
                        }
                    }
                }
            }
        });
    }

    // Function to update timeline chart
    function updateTimelineChart() {
        if (!timelineChart) return;
        const filtered = getFilteredTimelineData();
        timelineChart.data.labels = filtered.labels;
        timelineChart.data.datasets.forEach(ds => {
            if (ds.key && filtered[ds.key]) {
                ds.data = filtered[ds.key];
            }
        });
        timelineChart.update();
    }

    // Button controls for metric switch (Torneios vs Jogos)
    const metricPills = document.querySelectorAll('.metric-pill');
    metricPills.forEach(pill => {
        pill.addEventListener('click', function () {
            metricPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            currentMetric = this.getAttribute('data-metric');
            updateTimelineChart();
        });
    });

    // Button controls for period switch (6m, 12m, all)
    const periodPills = document.querySelectorAll('.period-pill');
    periodPills.forEach(pill => {
        pill.addEventListener('click', function () {
            periodPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            currentPeriod = this.getAttribute('data-period');
            updateTimelineChart();
        });
    });

    // Initialize Donut Chart
    const donutCtx = document.getElementById('dashboardDonutChart');
    if (donutCtx && activeApps.length > 0) {
        const distData = dashboardData.distribution || {};
        const donutLabels = distData.labels || [];
        const donutColors = distData.colors || [];
        const initialDonutValues = distData.tournaments || [];

        donutChart = new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: donutLabels,
                datasets: [{
                    data: initialDonutValues,
                    backgroundColor: donutColors,
                    borderColor: isDarkMode ? '#343a40' : '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '68%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: textColor,
                            usePointStyle: true,
                            padding: 12,
                            font: {
                                size: 12,
                                family: 'Oswald, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: tooltipBg,
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        padding: 10,
                        callbacks: {
                            label: function (context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const val = context.parsed;
                                const perc = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                                const unit = currentDonutMetric === 'tournaments' ? 'torneios' : 'jogos';
                                return ` ${context.label}: ${val} ${unit} (${perc}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Donut metric switch (Torneios vs Jogos)
    const donutPills = document.querySelectorAll('.donut-pill');
    donutPills.forEach(pill => {
        pill.addEventListener('click', function () {
            donutPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            currentDonutMetric = this.getAttribute('data-donut-metric');
            if (donutChart) {
                const values = currentDonutMetric === 'tournaments'
                    ? dashboardData.distribution.tournaments
                    : dashboardData.distribution.games;
                donutChart.data.datasets[0].data = values;
                donutChart.update();
            }
        });
    });
});
