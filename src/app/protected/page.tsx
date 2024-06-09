const Protected = () => {
	return (
		<div className="flex flex-col gap-4 h-full w-full">
			<h1 className="font-bold text-2xl md:text-4xl mt-2">Dashboard</h1>
			<p>
				for starters, show how many quotations are given out and what their
				status are (toggle between quoted, pending payment, complete)
			</p>
			<p>
				each row of quotations, show link to pdf of quotation and invoice if
				available
			</p>
			<p>
				completed work will disappear from the dashboard in 3 days to be stored
				under Records
			</p>
			<p>show how much money is made</p>
			<p>show user's sessions, and let them log out of other sessions if needed</p>
		</div>
	);
};

export default Protected;
