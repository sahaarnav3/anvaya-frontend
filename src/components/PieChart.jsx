import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip, // x-axis
  Legend, // y-axis
} from "chart.js";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ finalData }) {
  // Data structure
  const data = {
    labels: ['New Leads', 'Contacted', 'Qualified'],
    datasets: [
      {
        label: 'Lead Distribution',
        data: [5, 3, 2], // Your actual values
        backgroundColor: [
          '#0072c6',  // New
          '#ff9800',  // Contacted
          '#4caf50',  // Qualified
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 14
          }
        }
      },
    },
  };

  return (
      <Pie data={finalData || data} options={options} />
  );
}
