import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

function AutoCompleteInp({ constValue, flt, setFlt, inputPlaceholder }) {
	const [users, setUsers] = useState([]);
	const [inputValue, setInputValue] = useState("");

	return (
		<div>
			<Autocomplete
				multiple
				value={constValue.filter((el) => users.includes(el.value))}
				onChange={(event, newValue) => {
					setUsers(newValue.map((el) => el.value));
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					console.log("newInputValue", newInputValue);
					setInputValue(newInputValue);
				}}
				id="controllable-states-demo"
				options={constValue}
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
