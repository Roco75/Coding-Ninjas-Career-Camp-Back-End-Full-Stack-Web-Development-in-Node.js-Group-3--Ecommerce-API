npm install joi

node app.js


Open in Your Browser (For GET Requests)
After running the server, open your browser and visit:

✅ Test the root route:
📌 URL: http://localhost:3000/
➡️ Expected Output: "Welcome to the eCommerce API"

✅ View all products:
📌 URL: http://localhost:3000/products
➡️ Expected Output (JSON data of products)
{
  "data": {
    "products": [
      {
        "_id": "65a9f64c2c9bfe001f1a5c13",
        "name": "Laptop",
        "quantity": 10
      }
    ]
  }
}


 Use Postman or cURL for POST, PUT, DELETE Requests
For requests like adding products, updating quantity, or deleting products, you need Postman or cURL.

➤ Add a Product (POST)
Open Postman

Select POST

URL: http://localhost:3000/products/create

Go to the Body tab, select raw → JSON, and enter:

json
Copy
Edit
{
  "name": "Smartphone",
  "quantity": 20
}
Click Send

Expected Response:

json
Copy
Edit
{
  "data": {
    "product": {
      "_id": "65a9f64c2c9bfe001f1a5c14",
      "name": "Smartphone",
      "quantity": 20
    }
  }
}
