"use client";
import { useEffect, useRef } from "react";
import { submitQuotationFormAction } from "../actions/submitQuotationFormAction";
import QuotationItems from "./QuotationItems";
import SubmitBtn from "./SubmitBtn";

export default function QuotationForm() {
  const attentionRef = useRef<HTMLInputElement | null>(null);
  const entityRef = useRef<HTMLInputElement | null>(null);
  const dateOfQuotationRef = useRef<HTMLInputElement | null>(null);
  const expiryDateRef = useRef<HTMLInputElement | null>(null);
  const buildingAndStreetNameRef = useRef<HTMLInputElement | null>(null);
  const unitNumberRef = useRef<HTMLInputElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);
  const paymentDepositRef = useRef<HTMLInputElement | null>(null);
  const paymentCashPaynowRef = useRef<HTMLInputElement | null>(null);
  const warrantyPeriodRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedInput = {
      attention: sessionStorage.getItem("attention"),
      entity: sessionStorage.getItem("entity"),
      dateOfQuotation: sessionStorage.getItem("dateOfQuotation"),
      expiryDate: sessionStorage.getItem("expiryDate"),
      buildingAndStreetName: sessionStorage.getItem("buildingAndStreetName"),
      unitNumber: sessionStorage.getItem("unitNumber"),
      postalCode: sessionStorage.getItem("postalCode"),
      paymentDeposit: sessionStorage.getItem("paymentDeposit"),
      paymentCashPaynow: sessionStorage.getItem("paymentCashPaynow"),
      warrantyPeriod: sessionStorage.getItem("warrantyPeriod"),
    };

    if (storedInput.attention && attentionRef.current)
      attentionRef.current.value = storedInput.attention;
    if (storedInput.entity && entityRef.current)
      entityRef.current.value = storedInput.entity;
    if (storedInput.dateOfQuotation && dateOfQuotationRef.current)
      dateOfQuotationRef.current.value = storedInput.dateOfQuotation;
    if (storedInput.expiryDate && expiryDateRef.current)
      expiryDateRef.current.value = storedInput.expiryDate;
    if (storedInput.buildingAndStreetName && buildingAndStreetNameRef.current)
      buildingAndStreetNameRef.current.value =
        storedInput.buildingAndStreetName;
    if (storedInput.unitNumber && unitNumberRef.current)
      unitNumberRef.current.value = storedInput.unitNumber;
    if (storedInput.postalCode && postalCodeRef.current)
      postalCodeRef.current.value = storedInput.postalCode;
    if (storedInput.paymentDeposit && paymentDepositRef.current)
      paymentDepositRef.current.value = storedInput.paymentDeposit;
    if (storedInput.paymentCashPaynow && paymentCashPaynowRef.current)
      paymentCashPaynowRef.current.value = storedInput.paymentCashPaynow;
    if (storedInput.warrantyPeriod && warrantyPeriodRef.current)
      warrantyPeriodRef.current.value = storedInput.warrantyPeriod;
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
          ref={entityRef}
          onChange={(e) => {
            sessionStorage.setItem("entity", e.target.value);
          }}
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
          ref={dateOfQuotationRef}
          onChange={(e) => {
            sessionStorage.setItem("dateOfQuotation", e.target.value);
          }}
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
          ref={expiryDateRef}
          onChange={(e) => {
            sessionStorage.setItem("expiryDate", e.target.value);
          }}
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
          ref={buildingAndStreetNameRef}
          onChange={(e) => {
            sessionStorage.setItem("buildingAndStreetName", e.target.value);
          }}
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
          ref={unitNumberRef}
          onChange={(e) => {
            sessionStorage.setItem("unitNumber", e.target.value);
          }}
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
          ref={postalCodeRef}
          onChange={(e) => {
            sessionStorage.setItem("postalCode", e.target.value);
          }}
        />
      </label>
      <div className="form-control max-w-xs">
        <label className="label cursor-pointer flex flex-row gap-4">
          <input
            type="checkbox"
            name="paymentDeposit"
            className="checkbox checkbox-primary"
            ref={paymentDepositRef}
            onChange={(e) => {
              sessionStorage.setItem("paymentDeposit", e.target.value);
            }}
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
            ref={paymentCashPaynowRef}
            onChange={(e) => {
              sessionStorage.setItem("paymentCashPaynow", e.target.value);
            }}
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
          ref={warrantyPeriodRef}
          onChange={(e) => {
            sessionStorage.setItem("warrantyPeriod", e.target.value);
          }}
        />
      </label>
      <QuotationItems />
      <SubmitBtn btnLabel="Preview PDF" btnStyle="btn-primary" />
    </form>
  );
}
