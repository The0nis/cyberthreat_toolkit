import React from "react";

import { ResponsiveLine } from "@nivo/line";

// Dummy data
const data = [
  {
    id: "japan",
    color: "hsl(229, 70%, 50%)",
    data: [
      {
        x: "Jan",
        y: 277,
      },
      {
        x: "Feb",
        y: 153,
      },
      {
        x: "Mar",
        y: 107,
      },
      {
        x: "Apr",
        y: 236,
      },
      {
        x: "May",
        y: 99,
      },
      {
        x: "Jun",
        y: 77,
      },
      {
        x: "Jul",
        y: 243,
      },
      {
        x: "Aug",
        y: 275,
      },
      {
        x: "Sept",
        y: 248,
      },
      {
        x: "Oct",
        y: 83,
      },
      {
        x: "Nov",
        y: 34,
      },
      {
        x: "Dec",
        y: 20,
      },
    ],
  },
];
// End of dummy data

const Chart = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        xFormat=" >-"
        yScale={{
          type: "point",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Rate",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enablePoints={false}
        pointSize={3}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-19}
        areaOpacity={0.1}
        useMesh={true}
        legends={[]}
      />
    </div>
  );
};

export default Chart;
