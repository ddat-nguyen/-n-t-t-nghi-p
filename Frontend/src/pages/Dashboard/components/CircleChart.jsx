/** @format */

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import MenuDropDown from "../../../components/MenuDropDown";
import adminApi from "../../../api/admin";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = () => {
  const option = ["Today", "Week", "All the time"];
  const [orderOption, setOrderOption] = useState(option[0]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await adminApi.getOrderCountsByStatusThisWeek();
        setOrder(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [orderOption]);

  const chartData = {
    labels: order.map((item) => item.status),
    datasets: [
      {
        data: order.map((item) => item.count),
        backgroundColor: order.map((item) => {
          switch (item.status) {
            case "confirmed":
              return "#8785E9";
            case "delivered":
              return "#50D1AA";
            case "pending":
              return "#FFB572";
            default:
              return "#000000"; // Default color
          }
        }),
        borderColor: order.map((item) => {
          switch (item.status) {
            case "confirmed":
              return "#8785E9";
            case "delivered":
              return "#50D1AA";
            case "pending":
              return "#FFB572";
            default:
              return "#000000"; // Default color
          }
        }),
        borderWidth: 5,
      },
    ],
  };
  console.log(chartData.datasets);
  return (
    <div className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 flex flex-col gap-5 min-h-[330px] p-6 rounded-lg">
      <div className=" bg-base/dark-bg-2-14 dark:bg-light-bg-1 flex justify-between items-center">
        <div className="text-xl font-semibold dark:text-dark">Most Ordered</div>
        <MenuDropDown
          option={option}
          options={orderOption}
          setOptions={setOrderOption}
        />
      </div>
      <hr className="h-[2px] bg-base/dark-line dark:bg-primary-color border-0" />
      <div className="w-full flex justify-between items-center">
        <div className="w-3/5">
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <div className="flex flex-col gap-4 items-start">
          {order.map((item, index) => (
            <div className="flex flex-row gap-2 items-start" key={index}>
              <img
                src={
                  item.status === "confirmed"
                    ? "https://file.rendit.io/n/rnZk21ZtZktYs2ulT5cL.svg"
                    : item.status === "pending"
                    ? "https://file.rendit.io/n/FjNeHzKAyZyJOxpk1vOX.svg"
                    : "https://file.rendit.io/n/TmvvFrtY5nlVB4WkgMUn.svg"
                }
                className="mt-px w-4 shrink-0"
              />
              <div className="flex flex-col gap-px w-16 shrink-0 items-start">
                <div
                  className={`text-sm font-medium dark:text-dark ${
                    item.status === "confirmed"
                      ? "text-blue-500"
                      : item.status === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
                <div
                  className={`text-xs text-gray-400 dark:text-slate-600 ${
                    item.status === "confirmed"
                      ? "text-blue-500"
                      : item.status === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {item.count} đơn hàng
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircleChart;
