```
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "waiter", "cuisine"],
      default: "manager",
      required: true,
    },
    resetCode: {
      type: String,
      default: null,
    },
    resetTokenExpiration: {
      type: Date,
    },
    phone: { type: String, default: null },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  },
  {
    timestamps: true,
  }
);
```

