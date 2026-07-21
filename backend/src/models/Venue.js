const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    slots: [
      {
        startTime: {
          type: String, // Example: "09:00"
          required: true,
        },

        endTime: {
          type: String, // Example: "12:00"
          required: true,
        },

        isBooked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { _id: false }
);

const venueSchema = new mongoose.Schema(
  {
    // Venue Name
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    // Venue Owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Venue Location
    location: {
      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },

        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
        },
      },
    },

    // Capacity
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    // Price Per Hour
    pricePerHour: {
      type: Number,
      required: true,
      min: 0,
    },

    // Amenities
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    // Images
    images: [
      {
        url: {
          type: String,
          required: true,
        },

        public_id: {
          type: String,
          default: "",
        },
      },
    ],

    // Availability Calendar
    availability: [availabilitySchema],
  },
  {
    timestamps: true,
  }
);


// Geo Index (Google Maps Nearby Search)
venueSchema.index({
  "location.coordinates": "2dsphere",
});

// Virtual Image Count
venueSchema.virtual("totalImages").get(function () {
  return this.images.length;
});

// Check if venue has available slot
venueSchema.methods.isAvailable = function (date, startTime, endTime) {
  const day = this.availability.find(
    (item) =>
      item.date.toISOString().split("T")[0] ===
      new Date(date).toISOString().split("T")[0]
  );

  if (!day) return false;

  return day.slots.some(
    (slot) =>
      slot.startTime === startTime &&
      slot.endTime === endTime &&
      !slot.isBooked
  );
};

// JSON Response Cleaner
venueSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

module.exports = mongoose.model("Venue", venueSchema);