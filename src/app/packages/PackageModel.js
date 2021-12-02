'use strict';

var mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);
var Schema = mongoose.Schema;

// if( !mongoose.Types.ObjectId.isValid(id) ) return false;
module.exports =  mongoose.model("packages", new Schema({
    package_id: { type: GUID.type, default: GUID.value },
    active_delivery_id:{ type: GUID.type, default: GUID.value },
    description: {type:String},
    weight:{type:Number},
    width:{type:Number},
    height:{type:Number},
    depth:{type:String},
    from_name:{type:String},
    from_address:{type:String},
    from_location:{
        latitude: Number,
        longitude:  Number
    },
    to_name:{type:String},
    to_address:{type:String},
    to_location:{
        latitude: Number,
        longitude:  Number
    }

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