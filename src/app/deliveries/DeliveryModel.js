'use strict';

var mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);
var Schema = mongoose.Schema;

// if( !mongoose.Types.ObjectId.isValid(id) ) return false;
module.exports =  mongoose.model("deliveries", new Schema({
    delivery_id:{ type: GUID.type, default: GUID.value },
    package_id: { type: GUID.type, default: GUID.value },
    pickup_time: {type : Date, default: Date.now},
    start_time: {type : Date, default: Date.now},
    end_time: {type : Date, default: Date.now},
    location:{
        latitude: Number,
        longitude:  Number
    },
    status:{type: String,
        enum : ['open', 'picked-up','in-transit','delivered','failed'],
        default: 'open'}

},{
    toJSON: { 
        transform: function(doc, ret) {
          delete ret.createdAt;
          delete ret.updatedAt;
          delete ret.__v;
          // delete ret._id;
        }
    },
    timestamps: true
}));