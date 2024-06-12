import QuotationItems from "./QuotationItems";
import SubmitBtn from "./SubmitBtn";

export default function QuotationForm() {
  const submitQuotationFormAction = async (formData: FormData) => {
    "use server";
    console.log(formData);
    console.log("Form submitted");
  };

  return (
    <form
      action={submitQuotationFormAction}
      className="flex flex-col justify-center items-center gap-4"
    >
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold ">Attention to</span>
        </div>
        <input
          type="text"
          placeholder="Ms. Regina Phalange"
          name="attention"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold ">Entity</span>
        </div>
        <input
          type="text"
          placeholder="ACME Pte Ltd"
          name="entity"
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
          name="date-of-quotation"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Expiry of Quotation</span>
        </div>
        <input
          type="date"
          name="expiry-date"
          placeholder="expiry-date"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Address Line 3</span>
        </div>
        <input
          type="text"
          name="address-line-1"
          placeholder="BLK 123, Any Rd."
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Unit Number</span>
        </div>
        <input
          type="text"
          name="unit-number"
          placeholder="#01-123"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Postal Code </span>
        </div>
        <input
          type="text"
          name="postal-code"
          placeholder="129423"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <div className="form-control max-w-xs">
        <label className="label cursor-pointer flex flex-row gap-4">
          <input
            type="checkbox"
            name="payment-50-deposit"
            className="checkbox checkbox-primary"
          />

          <span className="label-text">
            Payment terms: 50% deposit,{" "}
            <strong>and the remainder upon completion of work</strong>
          </span>
        </label>
      </div>
      <div className="form-control max-w-xs">
        <label className="label cursor-pointer flex flex-row gap-4">
          <input
            type="checkbox"
            name="payment-cash-paynow"
            className="checkbox checkbox-primary"
          />

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
          name="warranty-period"
          placeholder="No. of days"
          className="input input-bordered w-full max-w-xs"
          inputMode="numeric"
          pattern="[0-9]"
        />
      </label>
      <QuotationItems />
      <SubmitBtn btnLabel="Preview PDF" btnStyle="btn-primary" />
    </form>
  );
}
