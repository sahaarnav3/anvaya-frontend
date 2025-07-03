import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, // x-axis
  LinearScale,   // y-axis
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components for bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ finalData }) => {
  const data = {
    labels: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won'],
    datasets: [
      {
        label: 'Number of Leads',
        data: [10, 7, 5, 3, 2],
        backgroundColor: [
          '#0072c6',
          '#ff9800',
          '#4caf50',
          '#673ab7',
          '#00bcd4',
        ],
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#666',
        },
      },
      x: {
        ticks: {
          color: '#666',
        },
      },
    },
  };

  return (
      <Bar data={finalData || data} options={options} />
  );
};

export default BarChart;
