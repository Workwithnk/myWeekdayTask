import { useEffect, useState } from "react";
import "./CSS/App.css";
import AutoCompleteInp from "./AutoCompleteInp";
import { BASE_PAY, EXPE, NUM_OF_EMP, REMOTE, ROLES_ALL } from "./constants";
import { TextField } from "@mui/material";
import SingleCard from "./SingleCard";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
	const [jobData, setJobData] = useState([]);
	const [jobCount, setJobCount] = useState(20);
	const [flt, setFlt] = useState({
		roles: [],
		number_of_emp: [],
		experience: [],
		remote: [],
		base_salary: [],
		search: ""
	});
	const [isLoading, setIsLoading] = useState(true);

	function handleSalaryCal(Salary) {
		// Assuming 1 USD = 83 rupees
		const exchangeRate = 83;
		const salaryINR = Salary * exchangeRate * 1000;
		const salaryInLakhs = Math.round(salaryINR / 100000);

		return salaryInLakhs;
	}

	const fetchJobs = async () => {
		const bodyData = JSON.stringify({
			limit: jobCount,
			offset: 0
		});

		//we can also use dotenv for URL & important stuff
		const requestJobs = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: bodyData
		});

		const res = await requestJobs.json();
		if (res.jdList) {
			setJobData(res.jdList);
			setJobCount(jobCount + 20);
		}
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, [isLoading]);

	return (
		<div className="App">
			<div className="app__header">
				<AutoCompleteInp
					constValue={ROLES_ALL} //number of emp constant value
					flt={flt}
					setFlt={setFlt}
					isMultiSelect={true}
					inputPlaceholder={"Roles"}
					classDetails={"roles"}
				/>
				<AutoCompleteInp
					constValue={NUM_OF_EMP} //number of emp constant value
					flt={flt}
					setFlt={setFlt}
					isMultiSelect={true}
					inputPlaceholder={"Number Of Employees"}
					classDetails={"num_of_emp"}
				/>
				<AutoCompleteInp
					constValue={EXPE} //expe constant values
					flt={flt}
					setFlt={setFlt}
					isMultiSelect={false}
					inputPlaceholder={"Experience"}
					classDetails={"experience"}
				/>
				<AutoCompleteInp
					constValue={REMOTE} //job type constant value
					flt={flt}
					isMultiSelect={true}
					setFlt={setFlt}
					inputPlaceholder={"Remote"}
					classDetails={"remote"}
				/>
				<AutoCompleteInp
					constValue={BASE_PAY} //Base pay constant value
					flt={flt}
					isMultiSelect={false}
					setFlt={setFlt}
					inputPlaceholder={"Minimum Base Pay Salary"}
					classDetails={"base_pay"}
				/>
				<TextField //search Input
					className="app__header-searchInp"
					label={"Company Name"}
					variant="standard"
					value={flt.search}
					onChange={(e) => setFlt({ ...flt, search: e.target.value })}
				/>
			</div>

			<div className="app__content">
				<InfiniteScroll
					dataLength={jobData.length} //This is important field to render the next data
					next={fetchJobs}
					hasMore={true}
					loader={<div style={{ position: "absolute" }}>{isLoading ? "Loading..." : "Job not found"}</div>}
					endMessage={
						<p style={{ textAlign: "center", width: "100%" }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
				>
					{jobData &&
						jobData
							.filter((job) => {
								if (flt.search === "") {
									return job;
								} else {
									return job.companyName.toLowerCase().includes(flt.search.toLowerCase());
								}
							})
							.filter((job) => {
								if (flt.experience.length === 0) {
									return job;
								} else {
									return job.minExp && job.minExp <= parseInt(flt.experience[0]);
								}
							})
							.filter((job) => {
								if (flt.roles.length === 0) {
									return job;
								} else {
									const isRolePresent = flt.roles.some((data) => data.toLowerCase() === job.jobRole.toLowerCase());
									if (isRolePresent) {
										return job;
									}
								}
							})
							.filter((job) => {
								const isRemoteJobAvailable = flt.remote.some((data) => {
									return data.toLowerCase() === "remote";
								});

								const isHybridJobs = flt.remote.some((data) => {
									return data.toLowerCase() === "hybrid";
								});

								if (flt.remote.length > 1 && isRemoteJobAvailable) {
									return job;
								} else {
									if (flt.remote.length === 0) {
										return job;
									} else if (isRemoteJobAvailable) {
										return job.location === "remote";
									} else if (isHybridJobs) {
										return job;
									} else if (!isHybridJobs && !isRemoteJobAvailable) {
										return job.location !== "remote";
									}
								}
							})
							.filter((job) => {
								if (flt.base_salary.length === 0) {
									return job;
								} else {
									if (job.minJdSalary) {
										const salaryInINR = handleSalaryCal(job.minJdSalary);
										return salaryInINR >= parseInt(flt.base_salary[0].slice(0, -1));
									}
								}
							})
							.map((eachJob) => {
								if (eachJob.length === 0) {
									return <h1>Job not found</h1>;
								} else {
									return (
										<SingleCard
											key={eachJob.jdUid}
											jobData={eachJob}
										/>
									);
								}
							})}
				</InfiniteScroll>
			</div>
		</div>
	);
}

export default App;
