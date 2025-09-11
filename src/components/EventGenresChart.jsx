import React, { useEffect, useState } from "react";
import { Cell, PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
  const colors = ["#DD0000", "#00DD00", "#0000DD", "#DDDD00", "#DD00DD"];

  useEffect(() => {
    setData(getData());
  }, [events]);

  const getData = () => {
    const total = events.length;
    
    return genres.map((genre) => {
      const count = events.filter((event) => event.summary.includes(genre)).length;

      return {
        name: genre,
        value: count,
        percent: total > 0 ? ((count / total) * 100).toFixed(1) : 0,
      };
    });
  };

  return (
    <div className="chart">
      <p className="chart-title">Topic Distribution</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <ul className="custom-legend">
        {data.map((entry, index) => (
          <li key={entry.name}>
            <span
              className="legend-color"
              style={{ backgroundColor: colors[index] }}
            ></span>
            {entry.name} ({entry.percent}%)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventGenresChart;
