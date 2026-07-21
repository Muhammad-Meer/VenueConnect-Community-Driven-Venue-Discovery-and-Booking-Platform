// ==================== FULL CORRECT CODE ====================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['customer', 'venue_owner', 'admin'],
    default: 'customer'
  },
  phone: String,
  avatar: String,
}, { timestamps: true });

// ==================== IMPORTANT PART (Line 30 se 45 tak) ====================
userSchema.pre('save', async function(next) {     // ← Yeh line 30 hai (regular function)
  
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();                                      // ← Yeh line 43 hai
  } catch (error) {
    next(error);                                 // ← Error handling
  }
});
// =====================================================================

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;