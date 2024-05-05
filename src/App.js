import { useEffect, useState } from "react";
import "./CSS/App.css";
import AutoCompleteInp from "./AutoCompleteInp";
import { BASE_PAY, EXPE, NUM_OF_EMP, REMOTE, ROLES_ALL } from "./constants";
import { TextField } from "@mui/material";

function App() {
	const [jobData, setJobData] = useState([]);
	const [flt, setFlt] = useState({
		roles: [],
		number_of_emp: [],
		experience: [],
		remote: [],
		base_salary: [],
		search: ""
	});

	const fetchJobs = async () => {
		const bodyData = JSON.stringify({
			limit: 10,
			offset: 0
		});

		const requestJobs = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: bodyData
		});

		const res = await requestJobs.json();

		console.log(">>>>> res", res);
	};

	console.log("<<<< FLT >>>>", flt);

	useEffect(() => {
		//fetchJobs();
	}, []);

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
		</div>
	);
}

export default App;
