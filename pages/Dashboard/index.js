"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { AiOutlinePieChart } from "react-icons/ai";
import { LuTags } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { BiUserCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCamera } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { SlPeople } from "react-icons/sl";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { getSession } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Activities",
		},
	},

	scales: {
		// y: {
		// 	min: 0,
		// 	max: 500,
		// 	ticks: {
		// 		stepSize: 100,
		// 	},
		// },

		// x: {},
	},

	maintainAspectRatio: false,
};

const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];

const pieoptions = {
	plugins: {
		legend: {
			position: "right",
			display: true,
			labels: {
				color: "#000",
			},
		},
	},
	maintainAspectRatio: false,
};

export default function Dashboard() {
	const [displayMenu, setDisplayMenu] = useState(false);

	const { data: session,status } = useSession({required: true});

	//dummy default data
	const [piedata, setPiedata] = useState({
		labels: ["Basic Tees", "Custom Short Pants", "Super Hoodies"],
		datasets: [
			{
				label: "Pie Dataset",
				data: [55, 31, 14],
				backgroundColor: ["#98D89E", "#F6DC7D", "#EE8484"],
				hoverOffset: 4,
				radius: 73,
				responsive: true,
			},
		],
	});

	//dummy default data
	const [chartData, setChartData] = useState({
		labels,
		datasets: [
			{
				label: "Guest",
				lineTension: 0.3,
				data: labels.map(() => Math.floor(Math.random() * 500)),
				borderColor: "#E9A0A0",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				label: "User",
				lineTension: 0.3,
				data: labels.map(() => Math.floor(Math.random() * 500)),
				borderColor: "#9BDD7C",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	});

	useEffect(() => {
		
		//fetching data for line chart
		fetch(
			"https://api.open-meteo.com/v1/forecast?latitude=22.00&longitude=79.00&hourly=temperature_2m"
		)
			.then((res) => res.json())
			.then((data) => {
				let weatherData1 = []
				let weatherData2 = []
				let weatherLabels = []
				for(let i=0;i<10;i++){
					weatherData1.push(data['hourly'].temperature_2m[i]);
					weatherData2.push(data['hourly'].temperature_2m[i+10]);
					weatherLabels.push(data['hourly'].time[i]);
				}

				setChartData(
					{
						labels: weatherLabels,
						datasets:[
							{
								label: "Temp 1 °C",
								lineTension: 0.3,
								data: weatherData1,
								borderColor: "#E9A0A0",
								backgroundColor: "rgba(255, 99, 132, 0.5)",
							},
							{
								label: "Temp 2 °C",
								lineTension: 0.3,
								data: weatherData2,
								borderColor: "#9BDD7C",
								backgroundColor: "rgba(53, 162, 235, 0.5)",
							},
						]
					}
				)
			})
			.catch(err=>console.log(err));

			//fetch data for pie chart

	}, []);

	return (
		<div className={styles.pageContainer}>
			<div
				className={styles.menu}
				style={{
					display: displayMenu ? "block" : "none",
				}}
			>
				<div className={styles.menuContainer}>
					<ImCross
						className={styles.closeIcon}
						onClick={() => {
							setDisplayMenu(!displayMenu);
						}}
					/>
					<p className={styles.title}>Board.</p>

					<p className={styles.menuItem}>
						<AiOutlinePieChart />
						Dashboard
					</p>
					<p className={styles.menuItem}>
						<LuTags />
						Transactions
					</p>
					<p className={styles.menuItem}>
						<SlCalender />
						Schedules
					</p>
					<p className={styles.menuItem}>
						<BiUserCircle />
						Users
					</p>
					<p className={styles.menuItem}>
						<FiSettings />
						Settings
					</p>

					<p
						className={styles.menuFooter}
						style={{ marginTop: "auto", marginBottom: "20px" }}
					>
						Help
					</p>
					<p className={styles.menuFooter} style={{ marginBottom: "60px" }}>
						Contact Us
					</p>
				</div>
			</div>

			<div className={styles.rightContainer}>
				<div className={styles.flexContainer}>
					{!displayMenu && (
						<GiHamburgerMenu
							className={styles.menuIcon}
							onClick={() => {
								setDisplayMenu(!displayMenu);
							}}
						/>
					)}
					<h1 className={styles.pageTitle}>Dashboard</h1>
					<div className={styles.searchBox}>
						<input type="text" placeholder="Search..." />
						<AiOutlineSearch className={styles.searchIcon} />
					</div>
					<BiBell className={styles.bellIcon} />
					<img
						onClick={() => signOut()}
						className={styles.profilePic}
						src={session? session.user.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
						alt="profile pic"
					/>
				</div>

				<div className={styles.statisticsBoxContainer}>
					<div
						className={styles.statisticsBox}
						style={{ background: "#DDEFE0" }}
					>
						<AiOutlineCamera className={styles.statisticsIcon} />
						<h3>Total Revenues</h3>
						<p>$2,129,430</p>
					</div>

					<div
						className={styles.statisticsBox}
						style={{ background: "#F4ECDD" }}
					>
						<LuTags className={styles.statisticsIcon} />
						<h3>Total Transactions</h3>
						<p>1,520</p>
					</div>

					<div
						className={styles.statisticsBox}
						style={{ background: "#EFDADA" }}
					>
						<BiLike className={styles.statisticsIcon} />
						<h3>Total Likes</h3>
						<p>9,721</p>
					</div>

					<div
						className={styles.statisticsBox}
						style={{ background: "#DEE0EF" }}
					>
						<SlPeople className={styles.statisticsIcon} />
						<h3>Total Users</h3>
						<p>892</p>
					</div>
				</div>

				<div className={styles.plot}>
					<Line options={options} data={chartData} width={"100%"} />
				</div>

				<div
					className={styles.flexContainer}
					style={{ marginTop: "40px", justifyContent: "space-between" }}
				>
					<div className={styles.topProducts}>
						<div
							className={styles.flexContainer}
							style={{ justifyContent: "space-between" }}
						>
							<h2>Top products</h2>
							<p className={styles.dropdownButton}>
								May - June 2021 <BsChevronDown />
							</p>
						</div>
						<div className={styles.pieChartContainer}>
							<Pie data={piedata} options={pieoptions} />
						</div>
					</div>

					<div className={styles.todaysSchedule}>
						<div
							className={styles.flexContainer}
							style={{ justifyContent: "space-between", marginBottom: "28px" }}
						>
							<h2>Today’s schedule</h2>
							<p className={styles.dropdownButton}>
								See All <AiOutlineRight />
							</p>
						</div>
						<div
							className={styles.scheduleBox}
							style={{ borderLeft: "4px solid #9BDD7C" }}
						>
							<h3>Meeting with suppliers from Kuta Bali</h3>
							<p>14.00-15.00</p>
							<p>at Sunset Road, Kuta, Bali</p>
						</div>

						<div
							className={styles.scheduleBox}
							style={{ borderLeft: "4px solid #6972C3" }}
						>
							<h3>Check operation at Giga Factory 1</h3>
							<p>18.00-20.00</p>
							<p>at Central Jakarta</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/SignIn",
			},
		};
	}
	return {
		props: { session },
	};
};
