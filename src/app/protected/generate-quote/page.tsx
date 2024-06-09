import QuotationForm from "@/app/components/QuotationForm";

export default function GenerateQuote() {
	return (
		<div className="flex flex-col gap-4 h-full w-full">
			<h1 className="font-bold text-2xl md:text-4xl mt-2">Generate Quote</h1>
			<p>
				Must have the ability for user to add as many items of work as is
				required
			</p>
			<p>
				once done, user can preview to confirm submission. must have option to
				go back to forms during preview
			</p>
			<p>
				on submit, the app will do 2 things, generate a pdf to be sent to
				client, and also save to the db
			</p>
			<QuotationForm />
		</div>
	);
}
