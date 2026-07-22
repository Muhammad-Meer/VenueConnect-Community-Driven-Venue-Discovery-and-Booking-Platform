const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Venue name is required'],
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true,
            index: true
        },
        coordinates: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true
            }
        }
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    pricePerHour: {
        type: Number,
        required: true,
        min: 0
    },
    amenities: [{
        type: String,
        enum: ['Parking', 'AC', 'WiFi', 'Sound System', 'Projector', 'Stage', 'Catering', 'Security', 'Restroom', 'Generator']
    }],
    images: [{
        url: String,
        public_id: String // Cloudinary ke liye
    }],
    availability: [{
        date: {
            type: Date,
            required: true
        },
        slots: [{
            startTime: String, // "09:00"
            endTime: String,   // "17:00"
            isBooked: {
                type: Boolean,
                default: false
            }
        }]
    }],
    policies: {
        cancellation: String,
        rules: [String]
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    averageRating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Geospatial Index for location search
venueSchema.index({ "location.coordinates": "2dsphere" });
venueSchema.index({ city: 1, pricePerHour: 1, capacity: 1 });

module.exports = mongoose.model('Venue', venueSchema);