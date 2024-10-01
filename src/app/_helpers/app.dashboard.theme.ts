import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class AppDashboardThemeService {

    constructor(private http: HttpClient) {}

    public loadTheme(): void {
        this.http.get('assets/shine-theme.json')
            .subscribe((theme: any) => {
                echarts.registerTheme('shine', theme);
            });
    }

    public initChart(elementId: string, chartOptions: EChartsOption): void {
        const chartDom = document.getElementById(elementId);
        if (chartDom) {
            // Check if an instance already exists
            const existingChart = echarts.getInstanceByDom(chartDom);
            if (existingChart) {
                console.log('Chart instance already exists, updating options.');
                // If the chart instance already exists, just update the options
                existingChart.setOption(chartOptions);
            } else {
                console.log('Initializing new chart instance.');
                // Initialize a new chart if no instance exists
                const myChart = echarts.init(chartDom, 'shine'); // Use 'shine' if loaded
                myChart.setOption(chartOptions);
            }
        } else {
            console.error(`Element with ID ${elementId} not found.`);
        }        
    }

    public fillPieChartPayload(name: any, data: any): EChartsOption {
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                show: false
            },
            series: [
                {
                    name: name,
                    type: 'pie',
                    radius: ['40%', '60%'],
                    center: ['50%', '50%'],
                    data: data,
                    label: {
                        formatter: '{b}: ({c})'
                    }
                }
            ]
        };
    }

    public fillAxisChartPayload(data: any): EChartsOption {
        // Check if data is defined and is an array
        if (!data || !Array.isArray(data)) {
            return {}; // Handle the error case
        }
        return {
            title: {
                show: false
            },
            toolbox: {
                show: false
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '7%',
                right: '7%',
                top: '12%',
                bottom: '15%'
            },
            dataZoom: [],
            xAxis: {
                data: data.map((object: any) => object.key),
                silent: false,
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                }
            },
            yAxis: {
                splitArea: {
                    show: false
                }
            },
            series: [
                {
                    type: 'line',   // Use 'line' for an area chart
                    data: data.map((object: any) => object.value),
                    areaStyle: {}  // Add this to fill the area
                }
            ]
        }
    }
}
