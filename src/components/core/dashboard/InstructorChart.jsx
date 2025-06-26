import { Chart, PieController, registerables } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";


Chart.register(...registerables);

function InstructorChart ({courses}) {

    const [currentChart , setCurrentChart] = useState("Students");

    //getting random color for piechart , every course will have its own random color
    function getRandomColor(num) {

        let colors=[];

        for(let i = 0; i < num; i++) {
            const randomColor = `rgb(${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)})`;
            colors.push(randomColor)
        }

        return colors
    }

    //chart data of students
    const chartDataStudents = {
        labels: courses?.map((course) => course?.name),
        datasets:[
            {
                data: courses?.map((course) => course?.studentsEnrolled?.length),
                backgroundColor: getRandomColor(courses?.length)
            }
        ]
    }

    //chart data for income of instructor per course
    const chartIncomeData = {
        labels: courses?.map((course) => course?.name),
        datasets:[
            {
                data: courses?.map((course) => course?.price * course?.studentsEnrolled?.length),
                backgroundColor: getRandomColor(courses?.length)
            }
        ]
    }

    //options for chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (

        <div className="flex flex-1 flex-col gap-y-5 rounded-md bg-richblack-800 p-6">

            <div className="flex items-center justify-between">

                <p className="text-lg font-bold text-richblack-5">Visulaize</p>

                <div className="flex items-center space-x-4">
                    <button onClick={() => setCurrentChart("Students")} className={`rounded-md py-2 px-2 transition-all duration-200 ${currentChart === "Students" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400"}`}>
                        Students
                    </button>

                    <button onClick={() => setCurrentChart("Income")} className={`rounded-md py-2 px-2 transition-all duration-200 ${currentChart === "Income" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400"}`}>
                        Income
                    </button>
                </div>
            </div>

            <div className="relative mx-auto aspect-square h-[360px] w-full">
                <Pie data={currentChart === "Students" ? chartDataStudents : chartIncomeData} options={options}/>
            </div>
        </div>
    )
}

export default InstructorChart