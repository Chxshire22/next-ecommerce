import SubmitBtn from "./SubmitBtn";

export default function QuotationForm() {
	return (
		<form action="" className="flex flex-col justify-center items-center gap-4">
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text font-bold ">Attention to</span>
				</div>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text font-bold ">Entity</span>
				</div>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text font-bold">Date of Quotation</span>
				</div>
				<input
					type="date"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text font-bold">Expiry of Quotation</span>
				</div>
				<input
					type="date"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text font-bold">Address Line 3</span>
				</div>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text font-bold">Address Line 2</span>
				</div>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text font-bold">Address Line 3</span>
				</div>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
				/>
			</label>
			<div className="form-control max-w-xs">
				<label className="label cursor-pointer flex flex-row gap-4">
					<input type="checkbox" className="checkbox checkbox-primary" />

					<span className="label-text">
						Payment terms: 50% deposit,{" "}
						<strong>and the remainder upon completion of work</strong>
					</span>
				</label>
			</div>
			<div className="form-control max-w-xs">
				<label className="label cursor-pointer flex flex-row gap-4">
					<input type="checkbox" className="checkbox checkbox-primary" />

					<span className="label-text">
						Payment terms: <strong>Cash</strong> or{" "}
						<strong>Paynow to 98871677</strong>
					</span>
				</label>
			</div>

			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text font-bold">Warranty Period</span>
				</div>
				<input
					type="number"
					placeholder="No. of days"
					className="input input-bordered w-full max-w-xs"
				/>
			</label>
			<SubmitBtn btnLabel="Submit" btnStyle="primary" />
		</form>
	);
}
