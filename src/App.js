import { useEffect, useState } from "react";
import "./App.css";
import AutoCompleteInp from "./AutoCompleteInp";
import { BASE_PAY, EXPE, NUM_OF_EMP, REMOTE, ROLES_CONSTANTS } from "./constants";

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

	useEffect(() => {
		//fetchJobs();
	}, []);

	return (
		<div className="App">
			<div className="app__header">
				<AutoCompleteInp
					constValue={NUM_OF_EMP} //number of emp constant value
					flt={flt}
					setFlt={setFlt}
					inputPlaceholder={"Number Of Employees"}
				/>
				<AutoCompleteInp
					constValue={EXPE} //expe constant values
					flt={flt}
					setFlt={setFlt}
					inputPlaceholder={"Experience"}
				/>
				<AutoCompleteInp
					constValue={REMOTE} //job type constant value
					flt={flt}
					setFlt={setFlt}
					inputPlaceholder={"Remote"}
				/>
				<AutoCompleteInp
					constValue={BASE_PAY} //Base pay constant value
					flt={flt}
					setFlt={setFlt}
					inputPlaceholder={"Minimum Base Pay Salary"}
				/>
			</div>
		</div>
	);
}

export default App;
