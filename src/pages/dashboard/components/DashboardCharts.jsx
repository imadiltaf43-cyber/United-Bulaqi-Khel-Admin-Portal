import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./DashboardCharts.css";

export default function DashboardCharts({ analytics }) {

  const visitorData =
    analytics?.visitors || [];

  const projectStatus =
    analytics?.projectStatus || [];

  const COLORS = [
    "#C9A227",
    "#1E4D3B",
    "#0D6EFD",
    "#DC3545",
    "#6F42C1",
    "#20C997",
  ];

  return (

    <div className="dashboard-charts">

      {/* Visitors */}

      <div className="chart-card">

        <div className="chart-header">

          <h3>

            Visitors Analytics

          </h3>

          <span>

            Last 7 Months

          </span>

        </div>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <AreaChart data={visitorData}>

            <defs>

              <linearGradient
                id="goldGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#C9A227"
                  stopOpacity={0.8}
                />

                <stop
                  offset="100%"
                  stopColor="#C9A227"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#C9A227"
              strokeWidth={3}
              fill="url(#goldGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* Projects */}

      <div className="chart-card">

        <div className="chart-header">

          <h3>

            Project Status

          </h3>

          <span>

            Overview

          </span>

        </div>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <PieChart>

            <Pie
              data={projectStatus}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              innerRadius={60}
              paddingAngle={5}
            >

              {

                projectStatus.map((item, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />

                ))

              }

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

        <div className="chart-legend">

          {

            projectStatus.map((item, index) => (

              <div
                key={index}
                className="legend-item"
              >

                <span
                  className="legend-color"
                  style={{
                    background:
                      COLORS[
                        index %
                          COLORS.length
                      ],
                  }}
                ></span>

                {item.name}

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}