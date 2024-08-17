import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

@Injectable({
    providedIn: 'root'
})
// E-chart team
export class AppDashboardThemeService {

    constructor(private http: HttpClient) { }

    public loadTheme(): void {
        this.http.get('assets/shine-theme.json')
            .subscribe((theme: any) => {
                echarts.registerTheme('shine', theme);
            });
    }

    public initChart(elementId: string, chartOptions: EChartsOption): void {
        const chartDom = document.getElementById(elementId);
        if (chartDom) {
            const myChart = echarts.init(chartDom, 'shine');
            myChart.setOption(chartOptions);
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
                    type: 'bar',
                    data: data.map((object: any) => object.value),
                    large: true,
                }
            ]
        }
    }
}
