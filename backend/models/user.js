const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    password: String, // Required only for restaurant owners
    role: { type: String, enum: ['customer', 'restaurant_owner', 'admin'] },
    createdAt: Date,
    updatedAt: Date,
  });
  