import React from "react";
import "./CSS/SingleCard.css";

function SingleCard({ jobData }) {
	function handleSalaryCal(Salary) {
		// Assuming 1 USD = 83 rupees
		const exchangeRate = 83;
		const salaryINR = Salary * exchangeRate * 1000;
		const salaryInLakhs = Math.round(salaryINR / 100000);

		return salaryInLakhs;
	}

	return (
		<div className="job__card">
			<div className="job__card-header">
				<img
					src={jobData.logoUrl}
					alt="company name"
				/>
				<div className="job__card-header-details">
					<a href="#">{jobData.companyName}</a>
					<h3>{jobData.jobRole}</h3>
					<h5>{jobData.location}</h5>
				</div>
			</div>
			<p className="job__card-es">
				Estimated Salary:
				<span>
					{jobData.minJdSalary && handleSalaryCal(jobData.minJdSalary)} {jobData.minJdSalary && jobData.maxJdSalary && " - "}
					{jobData.maxJdSalary && handleSalaryCal(jobData.maxJdSalary)} LPA
				</span>
			</p>
			<div className="job__card-details">
				<h3>About company:</h3>
				<p>{jobData.jobDetailsFromCompany && jobData.jobDetailsFromCompany.length > 600 ? jobData.jobDetailsFromCompany.slice(0, 600) : jobData.jobDetailsFromCompany}</p>
			</div>
			<div className="job__card-footer">
				<a className="job__card-footer-view-job-cta">View job</a>
				<div className="job__card-footer-exp">
					<h5>Minimum Experience</h5>
					<p>
						<span>{jobData.minExp}</span> year<span>{jobData.minExp > 1 && "s"}</span>
					</p>
				</div>
				<a
					className="job__card-footer-apply"
					href={jobData.jdLink}
				>
					Easy Apply
				</a>
			</div>
		</div>
	);
}

export default SingleCard;
