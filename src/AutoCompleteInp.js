import { Autocomplete, TextField, GroupHeader, GroupItems } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import "./CSS/AutoCompleteInp.css";

function AutoCompleteInp({ constValue, flt, setFlt, inputPlaceholder, isMultiSelect, classDetails }) {
	const [users, setUsers] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		if (inputPlaceholder === "Roles") {
			setFlt({ ...flt, roles: [...users] });
		} else if (inputPlaceholder === "Number Of Employees") {
			setFlt({ ...flt, number_of_emp: [...users] });
		} else if (inputPlaceholder === "Experience") {
			setFlt({ ...flt, experience: [...users] });
		} else if (inputPlaceholder === "Remote") {
			setFlt({ ...flt, remote: [...users] });
		} else if (inputPlaceholder === "Minimum Base Pay Salary") {
			setFlt({ ...flt, base_salary: [...users] });
		}
	}, [users]);

	return (
		<div>
			<Autocomplete
				multiple
				value={users?.length > 0 ? constValue.filter((el) => users.includes(el.value)) : []}
				onChange={(event, newValue) => {
					if (newValue.length === 0) {
						setUsers([]);
					} else {
						setInputValue("");
						if (!isMultiSelect && newValue?.length > 0) {
							setUsers([newValue[newValue.length - 1].value]);
						} else {
							setUsers(newValue.map((el) => el.value));
						}
					}
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					newInputValue && setInputValue(newInputValue);
				}}
				id="controllable-states-demo"
				className={classDetails}
				isOptionEqualToValue={(option, value) => option.id === value.id}
				options={isMultiSelect ? constValue.filter((el) => !users.includes(el.value)) : constValue}
				ChipProps={{
					deleteIcon: <MdClose />
				}}
				getOptionLabel={(option) => option.value}
				getOptionDisabled={(option) => typeof option.id === "string" && option?.id?.includes("title")}
				renderInput={(params) => (
					<TextField
						{...params}
						label={inputPlaceholder}
						variant="standard"
					/>
				)}
			/>
		</div>
	);
}

export default AutoCompleteInp;
