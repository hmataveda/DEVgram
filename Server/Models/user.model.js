const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      require: [true, "Emailadress is required"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// console.log("USERSCHEMA....", UserSchema);
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  console.log("THIS", this.userName);

  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match");
  }
  next();
});

UserSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 8);
    this.password = hashedPassword;
    next();
  } catch (err) {
    console.log("Error in pre hashing Password", err);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
