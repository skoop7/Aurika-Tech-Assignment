/* eslint-disable react/prop-types */

import "./Invoice.css";

// Helper function to format currency
const formatCurrency = (amount) => {
  const numberAmount = Number(amount); // Ensure amount is a number
  if (!isNaN(numberAmount)) {
    return `₹${numberAmount.toFixed(2)}`; // Format to 2 decimal places
  }
  return "₹0.00"; // Default value if conversion fails
};

const Invoice = ({ invoiceData }) => {
  const {
    sellerDetails,
    billingDetails,
    shippingDetails,
    orderDetails,
    invoiceDetails,
    items,
    reverseCharge,
    companyLogo,
    signatureImage,
  } = invoiceData;

  return (
    <div className="invoice">
      <div className="invoice-header">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
        <h1>Invoice</h1>
        <p>Invoice Number: {invoiceDetails.number}</p>
        <p>Invoice Date: {invoiceDetails.date}</p>
      </div>

      <div className="invoice-details">
        <div className="invoice-section">
          <div className="section-left seller-details">
            <h2>Seller Details</h2>
            <p>{sellerDetails.name}</p>
            <p>{sellerDetails.address}</p>
            <p>
              {sellerDetails.city}, {sellerDetails.state} -{" "}
              {sellerDetails.pincode}
            </p>
            <p>PAN: {sellerDetails.pan}</p>
            <p>GST: {sellerDetails.gst}</p>
          </div>

          <div className="section-right billing-details">
            <h2>Billing Details</h2>
            <p>{billingDetails.name}</p>
            <p>{billingDetails.address}</p>
            <p>
              {billingDetails.city}, {billingDetails.state} -{" "}
              {billingDetails.pincode}
            </p>
            <p>State Code: {billingDetails.stateCode}</p>
          </div>
        </div>

        <div className="invoice-section">
          <div className="section-left shipping-details">
            <h2>Shipping Details</h2>
            <p>{shippingDetails.name}</p>
            <p>{shippingDetails.address}</p>
            <p>
              {shippingDetails.city}, {shippingDetails.state} -{" "}
              {shippingDetails.pincode}
            </p>
            <p>State Code: {shippingDetails.stateCode}</p>
          </div>

          <div className="section-right order-details">
            <h2>Order Details</h2>
            <p>Order Number: {orderDetails.number}</p>
            <p>Order Date: {orderDetails.date}</p>
          </div>
        </div>

        <div className="item-list">
          <h2>Items</h2>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Tax Rate</th>
                <th>Discount</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const unitPrice = Number(item.unitPrice) || 0;
                const quantity = Number(item.quantity) || 0;
                const taxRate = Number(item.taxRate) || 0;
                const discount = Number(item.discount) || 0;
                const amount = unitPrice * quantity - discount;

                return (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{formatCurrency(unitPrice)}</td>
                    <td>{quantity}</td>
                    <td>{formatCurrency(taxRate)}</td>
                    <td>{formatCurrency(discount)}</td>
                    <td>{formatCurrency(amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="reverse-charge">
          <h2>Reverse Charge</h2>
          <p>{reverseCharge ? "Applicable" : "Not Applicable"}</p>
        </div>
      </div>

      <div className="invoice-footer">
        <div className="signature">
          <img
            src={signatureImage}
            alt="Signature"
            className="signature-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
