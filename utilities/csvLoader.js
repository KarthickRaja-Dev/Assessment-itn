const fs = require("fs");
const xlsx = require("xlsx");
const Customer = require("../models/Customer.js");
const Product = require("../models/Product.js");
const Order = require("../models/Order.js");

const loadData = async (path) => {
  const book = xlsx.readFile(path, { type: "string" });
  const sheet = book.SheetNames[0];
  const jsonData = xlsx.utils.sheet_to_json(book.Sheets[sheet]);

  for (const input of jsonData) {
    await Customer.updateOne(
      { customerId: input["Customer ID"] },
      {
        $set: {
          email: input["Customer Email"],
          name: input["Customer Name"],
          address: input["Customer Address"],
        },
      },
      { upsert: true }
    );

    await Product.updateOne(
      { productId: input["Product ID"] },
      {
        $set: {
          name: input["Product Name"],
          category: input["Category"],
          unitPrice: input["Unit Price"],
        },
      },
      { upsert: true }
    );

    await Order.updateOne(
      { orderId: input["Order ID"] },
      {
        $set: {
          product: input["Product ID"],
          productName: input["Product Name"],
          customer: input["Customer ID"],
          dateOfSale: new Date(input["Date of Sale"]),
          quantitySold: input["Quantity Sold"],
          region: input["Region"],
          discount: input["Discount"],
          shippingCost: input["Shipping Cost"],
          paymentMethod: input["Payment Method"],
        },
      },
      { upsert: true }
    );
  }
};

module.exports = loadData;
