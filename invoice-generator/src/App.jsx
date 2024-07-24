import { useState } from "react";
import Invoice from "./components/Invoice";
import html2pdf from "html2pdf.js";
import signatureImage from "./assets/signatureImage.png";
import companyLogo from "./assets/companyLogo.png";
import "./App.css"; // Import the CSS file for styling

const App = () => {
  const [formData, setFormData] = useState({
    sellerDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      pan: "",
      gst: "",
    },
    billingDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      stateCode: "",
    },
    shippingDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      stateCode: "",
    },
    orderDetails: {
      number: "",
      date: "",
    },
    invoiceDetails: {
      number: "",
      date: "",
    },
    items: [
      {
        description: "",
        unitPrice: 0,
        quantity: 0,
        taxRate: 0,
        discount: 0,
      },
    ],
    reverseCharge: false,
  });

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index][name] = value;
    setFormData({ ...formData, items });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { description: "", unitPrice: 0, quantity: 0, taxRate: 0, discount: 0 },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  const generatePDF = () => {
    const element = document.getElementById("invoice");
    const opt = {
      margin: 1,
      filename: `invoice_${formData.invoiceDetails.number}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <h2>Seller Details</h2>
        {["name", "address", "city", "state", "pincode", "pan", "gst"].map(
          (field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData.sellerDetails[field]}
              onChange={(e) => handleChange(e, "sellerDetails")}
            />
          )
        )}

        <h2>Billing Details</h2>
        {["name", "address", "city", "state", "pincode", "stateCode"].map(
          (field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData.billingDetails[field]}
              onChange={(e) => handleChange(e, "billingDetails")}
            />
          )
        )}

        <h2>Shipping Details</h2>
        {["name", "address", "city", "state", "pincode", "stateCode"].map(
          (field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData.shippingDetails[field]}
              onChange={(e) => handleChange(e, "shippingDetails")}
            />
          )
        )}

        <h2>Order Details</h2>
        {["number", "date"].map((field) => (
          <input
            key={field}
            type={field === "date" ? "date" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData.orderDetails[field]}
            onChange={(e) => handleChange(e, "orderDetails")}
          />
        ))}

        <h2>Invoice Details</h2>
        {["number", "date"].map((field) => (
          <input
            key={field}
            type={field === "date" ? "date" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData.invoiceDetails[field]}
            onChange={(e) => handleChange(e, "invoiceDetails")}
          />
        ))}

        <h2>Items</h2>
        {formData.items.map((item, index) => (
          <div key={index} className="item-group">
            {[
              "description",
              "unitPrice",
              "quantity",
              "taxRate",
              "discount",
            ].map((field) => (
              <input
                key={field}
                type={
                  field.includes("Price") ||
                  field.includes("quantity") ||
                  field.includes("Rate") ||
                  field.includes("discount")
                    ? "number"
                    : "text"
                }
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={item[field]}
                onChange={(e) => handleItemChange(index, e)}
              />
            ))}
          </div>
        ))}
        <button type="button" onClick={addItem} className="add-item-button">
          Add Item
        </button>

        <h2>Reverse Charge</h2>
        <label>
          <input
            type="checkbox"
            name="reverseCharge"
            checked={formData.reverseCharge}
            onChange={(e) =>
              setFormData({ ...formData, reverseCharge: e.target.checked })
            }
          />
          Reverse Charge
        </label>

        <button type="submit" className="submit-button">
          Generate Invoice
        </button>
      </form>

      <div id="invoice">
        <Invoice invoiceData={{ ...formData, companyLogo, signatureImage }} />
      </div>
    </div>
  );
};

export default App;
