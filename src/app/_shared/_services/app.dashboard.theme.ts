import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

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
}
