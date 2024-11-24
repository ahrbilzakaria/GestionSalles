"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export function RoomOccupancyChart({ freeRooms, occupiedRooms }) {
  const data = [
    { name: "Free Rooms", value: freeRooms },
    { name: "Occupied Rooms", value: occupiedRooms },
  ];

  const COLORS = ["hsl(var(--primary))", "#dcdcdc"];

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-normal text-start">
          Room Occupancy :
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
