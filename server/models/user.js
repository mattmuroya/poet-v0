const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  screenName: {
    type: String,
    minlength: 1,
    maxlength: 32,
    required: true,
    unique: true
  },
  passwordHash: String,
  buddyList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // specify 'User' model referenced by this obj Id references
      ref: 'User'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

module.exports = mongoose.model('User', userSchema);
