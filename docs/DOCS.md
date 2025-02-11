# QR MENU

I am creating a QR-menu web app for managing a restaurant.

## User Registration
Only admins can register a new account with their full name, email, and password. Email confirmation is required for registration. After registration, the user will be redirected to a new menu where they can create a new store.

## Store Information
The store will have basic information such as store name, description, address, phone number, email, and website/social media page link(only one link is enough for now).

## User Roles:
The admin can add other users with different roles (manager, cook, waiter) to manage the store. The owner (admin) and manager can manage (CRUD) the menu, but the manager cannot add other users like the admin.

## Customers
The customers are public and can access the menu by scanning the QR code, which will be served instead of a traditional menu.

## Waiter Role
The waiter’s job remains the same. They will go to the customer and confirm the order on their dashboard.

## Order Statuses:

1- Order Received
2- Order Confirmed
3- Cooking in Progress
4- Cooked
5- Order Delivered
6- Order Complete

---

User Model
full_name: String

email: String

password: String

(No role needed here, as the admin is added by default)

Store Model
store_name: String

description: Text

address: String

phone: String

email: String

website: String

admin_id: ForeignKey to User (indicating the owner)

Worker Model
email: String

password: String

full_name: String

role: Enum (Manager, Cook, Waiter)

store_id: ForeignKey to Store

admin_id: ForeignKey to User (indicating the owner who added this worker)

Menu Model
item_name: String

description: Text

price: Decimal

store_id: ForeignKey to Store

Order Model
order_status: Enum (Order Received, Order Confirmed, Cooking in Progress, Cooked, Order Delivered, Order Complete)

store_id: ForeignKey to Store

user_id: ForeignKey to User (indicating who is handling the order)

items: ManyToManyField to Menu (list of ordered items)

---

```
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

```
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  thumbnail: { type: Buffer },
  store_name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String },
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
```

```
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  full_name: { type: String, required: true },
  role: { type: String, enum: ['Manager', 'Cook', 'Waiter'], required: true },
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Worker = mongoose.model('Worker', workerSchema);
module.exports = Worker;
```

```
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  picture: { type: String, required: true },
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
```

```
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_status: { 
    type: String, 
    enum: ['Order Received', 'Order Confirmed', 'Cooking', 'Cooked', 'Order Delivered', 'Order Complete'], 
    required: true 
  },
  table_no: { type: Number, required: true },
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true }]
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
```