import mongoose from "mongoose";

const bookInvModel = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        picture: {
            public_id: String,
            url: String,
        },
        item_name: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true
        },
        item_code: {
            type: String,
            default: "",
        },
        item_desc: {
            type: String,
            default: "",
        },

        
        stock_unit: {
            type: String,
            default: 0
        },
        opening_stock: {
            type: Number,
            default: 0
        },
        as_of_date: {
            type: Date,
            default: Date.now()
        },
        stock_warning: {
            type: Boolean,
            default: false
        },
        low_cost_unit: {
            type: Number,
            default: 0
        },
        

        purchase_price: {
            type: Number,
            default: 0
        },
        tax: {
            type: Boolean,
            default: false
        },
        gst_rate: {
            type: Number,
            default: 0
        },

        stock_on_hold: {
            type: Number,
            default: 0
        },
        stock_value: {
            type: Number,
        },
        remark: {
            type: String,
            default: undefined,
        }
    },
    { timestamps: true }
);

export const BooksInventory = mongoose.model("BooksInventory", bookInvModel);
