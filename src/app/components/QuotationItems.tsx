"use client";
import { useState, useRef, useEffect } from "react";

export default function QuotationItems() {
  type Item = number;
  const [items, setItems] = useState<Item[]>([1]);

  type useRefType = HTMLUListElement | null;
  const itemRef = useRef<useRefType>(null);

  const AddItemHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setItems([...items, items.length + 1]);
  };

  const removeItem = (itemToRemove: Item) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  useEffect(() => {
    if (items.length > 1)
      itemRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [items]);

  //this part of the form is dynamic, need to learn more about useRef to be able to dynamically name refs. setting sessionStorage is no issue

  return (
    <ul className="w-full flex flex-col  max-w-xs" ref={itemRef}>
      {items.map((item) => {
        return (
          <li key={item}>
            <label className="form-control">
              <div className="label">
                <span className="label-text font-bold">Item Description</span>
                <button onClick={() => removeItem(item)}>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                name={`itemDescription${item}`}
                required
                placeholder="Supply labour and materials for..."
              ></textarea>
              <div className="label">
                {/* <span className="label-text-alt">Your bio</span> */}
                {/* <span className="label-text-alt">Alt label</span> */}
              </div>
            </label>
            <div className="flex flex-row gap-2">
              <label className="form-control w-1/2">
                <div className="label">
                  <span className="label-text font-bold">Quantity</span>
                  {/* <span className="label-text-alt">Top Right label</span> */}
                </div>
                <input
                  type="number"
                  name={`quantity${item}`}
                  required
                  inputMode="numeric"
                  placeholder="How many?"
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label">
                  {/* <span className="label-text-alt">Bottom Left label</span> */}
                  {/* <span className="label-text-alt">Bottom Right label</span> */}
                </div>
              </label>
              <label className="form-control w-1/2">
                <div className="label">
                  <span className="label-text font-bold">Item Cost</span>
                  {/* <span className="label-text-alt">Top Right label</span> */}
                </div>
                <input
                  type="number"
                  name={`itemCost${item}`}
                  required
                  inputMode="decimal"
                  placeholder="How much?"
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label">
                  {/* <span className="label-text-alt">Bottom Left label</span> */}
                  {/* <span className="label-text-alt">Bottom Right label</span> */}
                </div>
              </label>
            </div>
          </li>
        );
      })}
      <button
        className="btn btn-block btn-outline btn-primary"
        onClick={AddItemHandler}
      >
        Add Item
      </button>
    </ul>
  );
}
