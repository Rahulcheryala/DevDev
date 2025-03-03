import { Button, Checkbox } from "@zeak/react";
import { Link } from "@remix-run/react";
import { ClearableInput } from "~/components/Form";
import { ValidatedForm } from "@zeak/remix-validated-form";

export default function PricingCheckout() {
  return <PricingCheckoutContent />;
}
const PricingCheckoutContent = () => {
  return (
    <>
      <div>
        <div className="w-[calc(100%_-_500px)] mb-8">
          <h3 className="text-3xl font-semibold">Checkout</h3>
          <p className="text-textLink">
            We believe Project-X should be accessible to all companies, no
            matter the size. Pick your plan today to get started!
          </p>
        </div>
      </div>
      <div className="flex -mx-[30px]">
        <div className="px-[30px] w-[calc(100%_-_500px)]">
          <ValidatedForm validator={[]}>
            <div className="mb-[52px]">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold">Card Details</h3>
                <p className="text-sm text-textLink">
                  Add a debit or credit card
                </p>
              </div>
              <div className="grid grid-cols-4 gap-x-10 gap-y-2 pt-2">
                <div className="col-span-4">
                  <div className="relative">
                    <div className="flex items-center absolute right-0 top-0">
                      <img
                        src="/images/pricing/paypal-card.jpg"
                        className="mr-2"
                        alt="..."
                      />
                      <img
                        src="/images/pricing/mastercard.jpg"
                        className="mr-2"
                        alt="..."
                      />
                      <img
                        src="/images/pricing/discover.jpg"
                        className="mr-2"
                        alt="..."
                      />
                      <img
                        src="/images/pricing/visa-card.jpg"
                        className="mr-2"
                        alt="..."
                      />
                      {/* <img
                        src="/images/pricing/american-express.jpg"
                        className="mr-2"
                        alt="..."
                      /> */}
                    </div>
                    <ClearableInput
                      name="custom1"
                      placeholder="1111 2222 3333 4444"
                      label="Card Number*"
                    />
                  </div>
                </div>
                <div className="">
                  <ClearableInput
                    name="Expiration Date*"
                    placeholder="04/27"
                    label="Expiration Date*"
                  />
                </div>
                <div className="col-span-3">
                  <div className="flex items-end">
                    <ClearableInput
                      name="CVV*"
                      placeholder="123"
                      label="CVV*"
                    />
                    <div className="flex items-start  min-w-[260px] ml-2 pb-4">
                      <img
                        src="/images/pricing/credit-card-back.jpg"
                        className="mr-2"
                        alt="..."
                      />
                      <p className="text-secondary">
                        3 or 4 digits on back of card
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  <ClearableInput
                    name="name"
                    placeholder="Enter name on Card"
                    label="Name on Card*"
                  />
                </div>
              </div>
            </div>
            <div className="mb-[52px]">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold">Billing Address</h3>
                <p className="text-sm text-textLink">
                  sed to calculate tax and will appear on billing documents.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-2 pt-2">
                <div className="">
                  <ClearableInput
                    name="Address 1"
                    placeholder="Address 1"
                    defaultValue="123 Main Street"
                    label="Address 1"
                  />
                </div>
                <div className="">
                  <ClearableInput
                    name="Address 2"
                    placeholder="Address 2"
                    label="Address 2"
                    value="Suite 202"
                  />
                </div>

                <div className="">
                  <ClearableInput
                    name="City"
                    placeholder="City"
                    label="City"
                    value="Chicago"
                  />
                </div>
                <div className="">
                  <ClearableInput
                    name="State/ Province"
                    placeholder="State/ Province"
                    value="Illinois"
                    label="State/ Province"
                  />
                </div>
                <div className="">
                  <ClearableInput
                    name="Zip/ Postal Code"
                    placeholder="Zip/ Postal Code"
                    label="Zip/ Postal Code"
                    value="60112"
                  />
                </div>
                <div className="">
                  <ClearableInput
                    name="Country"
                    placeholder="Country"
                    value="United States"
                    label="Country"
                  />
                </div>
              </div>
            </div>
          </ValidatedForm>
        </div>
        <div className="px-[30px] w-[500px]">
          <div className="py-6 px-8 border shadow-sm border-stroke rounded-sm text-center">
            <div>
              <h4 className="text-lg text-left">Plan Summary:</h4>
              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-secondary text-sm text-left">
                    Automations
                  </h4>
                  <p className="text-secondary text-sm text-left">$240.00</p>
                </div>
                <div className="flex items-center justify-between mb-2 pl-3 relative">
                  <span className="w-1 h-1 rounded-full bg-secondary absolute top-2 left-1"></span>
                  <h4 className="text-secondary text-sm text-left">
                    Text Notifications
                  </h4>
                  <p className="text-secondary text-sm text-left">$10.00</p>
                </div>
                <div className="flex items-center justify-between mb-2 pl-3 relative">
                  <span className="w-1 h-1 rounded-full bg-secondary absolute top-2 left-1"></span>
                  <h4 className="text-secondary text-sm text-left">Storage</h4>
                  <p className="text-secondary text-sm text-left">$10.00</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-secondary text-sm text-left">
                    Label and Forms
                  </h4>
                  <p className="text-secondary text-sm text-left">$240.00</p>
                </div>
                <div className="flex items-center justify-between mb-2 pl-3 relative">
                  <span className="w-1 h-1 rounded-full bg-secondary absolute top-2 left-1"></span>
                  <h4 className="text-secondary text-sm text-left">
                    Print Anywhere
                  </h4>
                  <p className="text-secondary text-sm text-left">$10.00</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-secondary text-sm text-left">
                    Customer Service Automation
                  </h4>
                  <p className="text-secondary text-sm text-left">$120.00</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-left">Plan Discount </h4>
                    <p className="text-secondary text-sm text-left mt-1">
                      You have been offered special pricing
                    </p>
                  </div>
                  <p className="text-3xl text-accent-green font-bold">18%</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium">Sub Total </h4>
                  <p className="text-lg font-medium">12 seats</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">Tax</h4>
                  <p className="text-sm font-medium">$0.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-[20px] font-medium">Order total</h4>
                  <p className="text-[20px] font-medium">$648.00</p>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <div className="flex items-startmb-1">
                <Checkbox
                  name="name"
                  id="tos"
                  className="rounded-sm h-[18px] w-[18px] custom__checkbox !text-white mt-1"
                  onCheckedChange={(e) => {}}
                />

                <label
                  htmlFor="name"
                  className="font-light text-left text-sm tracking-[1px] ml-3"
                >
                  By clicking here, I agree to the{" "}
                  <Link to="#" className="text-accent-primary">
                    Terms & Conditions{" "}
                  </Link>
                </label>
              </div>
            </div>

            <Button
              variant="primary"
              className="mt-8 rounded-full p-4 h-auto w-full"
            >
              Complete Purchase
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
