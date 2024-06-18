"use client";
import { useEffect, useRef } from "react";
import { submitQuotationFormAction } from "../actions/submitQuotationFormAction";
import QuotationItems from "./QuotationItems";
import SubmitBtn from "./SubmitBtn";
import { GeneralQuoteDetails } from "../types";

export default function QuotationForm() {
  const attentionRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedAttention = sessionStorage.getItem("attention");

    // Set the input value only if a value exists in sessionStorage
    if (storedAttention && attentionRef.current) {
      attentionRef.current.value = storedAttention;
    }
  }, []);

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
          required
          name="attention"
          className="input input-bordered w-full max-w-xs"
          ref={attentionRef}
          onChange={(e) => {
            sessionStorage.setItem("attention", e.target.value);
          }}
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
          required
          name="dateOfQuotation"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Expiry of Quotation</span>
        </div>
        <input
          type="date"
          name="expiryDate"
          required
          placeholder="expiry-date"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Building and Street Name</span>
        </div>
        <input
          type="text"
          name="buildingAndStreetName"
          placeholder="BLK 123, Any Rd."
          required
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Unit Number</span>
        </div>
        <input
          type="text"
          name="unitNumber"
          placeholder="#01-123"
          required
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Postal Code </span>
        </div>
        <input
          type="text"
          required
          name="postalCode"
          placeholder="129423"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <div className="form-control max-w-xs">
        <label className="label cursor-pointer flex flex-row gap-4">
          <input
            type="checkbox"
            name="paymentDeposit"
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
            name="paymentCashPaynow"
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
          name="warrantyPeriod"
          placeholder="No. of days"
          required
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
