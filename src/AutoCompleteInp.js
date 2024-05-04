import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

function AutoCompleteInp({ constValue, flt, setFlt, inputPlaceholder, isMultiSelect }) {
	const [users, setUsers] = useState([]);
	const [inputValue, setInputValue] = useState("");

	return (
		<div>
			<Autocomplete
				multiple
				value={constValue.filter((el) => users.includes(el.value))}
				onChange={(event, newValue) => {
					setUsers(newValue.map((el) => el.value));
					if (!isMultiSelect) {
						setUsers([newValue[newValue.length - 1].value]);
					} else {
						setUsers(newValue.map((el) => el.value));
					}
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					console.log("newInputValue", newInputValue);
					setInputValue(newInputValue);
				}}
				id="controllable-states-demo"
				isOptionEqualToValue={(option, value) => option.id === value.id}
				options={isMultiSelect ? constValue.filter((el) => !users.includes(el.value)) : constValue}
				// options={constValue}
				getOptionLabel={(option) => option.value}
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
