'use client';

import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface ChartData {
  title: string;
  chartType: 'line' | 'bar' | 'pie' | 'scatter';
  data: {
    categories?: string[] | null;
    series: Array<{
      name: string;
      data: number[] | Array<{ name: string; value: number }>;
    }>;
  };
  insights: string;
}

interface ChartCardProps {
  chartData: ChartData;
  onClose: () => void;
}

export default function ChartCard({ chartData, onClose }: ChartCardProps) {
  const generateEChartsOption = (): EChartsOption => {
    const { chartType, data, title } = chartData;

    const baseOption: EChartsOption = {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#ffffff'
        }
      },
      tooltip: {
        trigger: chartType === 'pie' ? 'item' : 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        textStyle: {
          color: '#ffffff'
        }
      },
      legend: {
        top: 'bottom',
        textStyle: {
          color: '#ffffff'
        }
      }
    };

    switch (chartType) {
      case 'line':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: data.categories || [],
            axisLabel: {
              color: '#ffffff'
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#ffffff'
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            }
          },
          series: data.series.map(series => ({
            name: series.name,
            type: 'line',
            data: series.data,
            smooth: true
          }))
        };

      case 'bar':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: data.categories || [],
            axisLabel: {
              color: '#ffffff'
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#ffffff'
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            }
          },
          series: data.series.map(series => ({
            name: series.name,
            type: 'bar',
            data: series.data
          }))
        };

      case 'pie':
        return {
          ...baseOption,
          series: data.series.map(series => ({
            name: series.name,
            type: 'pie',
            radius: '50%',
            data: series.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }))
        };

      case 'scatter':
        return {
          ...baseOption,
          xAxis: {
            type: 'value',
            axisLabel: {
              color: '#ffffff'
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#ffffff'
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            }
          },
          series: data.series.map(series => ({
            name: series.name,
            type: 'scatter',
            data: series.data
          }))
        };

      default:
        return baseOption;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 relative border border-gray-200 dark:border-gray-700">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl font-bold"
        aria-label="Close chart"
      >
        ×
      </button>

      <div className="h-96 w-full">
        <ReactECharts 
          option={generateEChartsOption()} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>

      {chartData.insights && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border-l-4 border-blue-400">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">💡 Insights: </span>
            {chartData.insights}
          </p>
        </div>
      )}
    </div>
  );
}
