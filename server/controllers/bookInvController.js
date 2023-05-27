import cloudinary from "cloudinary";

import { BooksInventory } from "../model/bookInvModel.js";

export const fetchBooks = async (req, res) => {
    try {
        const books = await BooksInventory.find({user: req.user._id});

        return res.status(201).json({
            success: true,
            books
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const addBook = async (req, res) => {
    try {
        const { bookData } = req.body;
        var purchase_price_copy = bookData.purchase_price;

        let myCloud;
        
        if (!bookData.tax) {
            purchase_price_copy = bookData.purchase_price;
            bookData.purchase_price = parseInt(bookData.purchase_price) + parseInt((bookData.gst_rate * bookData.purchase_price) / 100);
        }

        const image = bookData.picture;
        delete bookData.picture

        let copyofdata = {...bookData};
        var newData

        if(image) {
            myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "solar-ladder-tasks/task-1",
            });

            newData = {
                ...copyofdata,
                stock_value: parseInt(bookData.opening_stock) * parseInt(purchase_price_copy),
                user: req.user,
                picture: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
            };
        } else {
            newData = {
                ...bookData,
                stock_value: parseInt(bookData.opening_stock) * parseInt(purchase_price_copy),
                user: req.user,
            };
        }
        await BooksInventory.create(newData);

        res.status(201).json({
            success: true,
            message: "Added to Inventory ✅",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const { selectedIds } = req.body
        
        await Promise.all(selectedIds.map(async (id) => {
            
            const oldData = await BooksInventory.findById(id);
            if(oldData?.picture?.public_id) {
                await cloudinary.v2.uploader.destroy(oldData.picture.public_id);
            }

            await BooksInventory.findByIdAndDelete(id);
        }));
        
        res.status(201).json({
            success: true,
            message: `Deleted - ${selectedIds.length} ${selectedIds.length > 1 ? "Items" : "Item"} ✅`,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const editBook = async (req, res) => {
    try {
        const { newData } = req.body;

        if(newData.stock_warning === false) {
            newData.low_cost_unit = 0;
        }

        let purchase_price_copy;
        if(!newData.tax === true) {
            purchase_price_copy = newData.purchase_price;
            newData.purchase_price = parseInt(newData.purchase_price) + parseInt((newData.gst_rate * newData.purchase_price) / 100);
        }

        const copyofdata = {...newData};
        let myCloud;
        var upadatedData ={...copyofdata};
        
        const oldData = await BooksInventory.findById(copyofdata._id);

        if(copyofdata.picture) {
            if(JSON.stringify(copyofdata.picture) !== JSON.stringify(oldData.picture)) {
                if(oldData?.picture?.public_id) {
                    await cloudinary.v2.uploader.destroy(oldData.picture.public_id);
                }
                
                myCloud = await cloudinary.v2.uploader.upload(copyofdata.picture, {
                    folder: "solar-ladder-tasks/task-1",
                });
                
                upadatedData = {
                    ...copyofdata,
                    picture: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    },
                }
            }

        }
        
        const updateData = await BooksInventory.findByIdAndUpdate(newData._id, upadatedData, {new: true} );
        
        if(!updateData) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Error while updating",
            });
        } else {
            res.status(201).json({
                success: true,
                message: "Successfully Updated ✅",
            });
        }
        
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const udpateStocks = async (req, res) => {
    try {
        const {stock} = req.body;
        
        const oldItem = await BooksInventory.findById(stock._id);

        oldItem.opening_stock = stock.final_stock;
        oldItem.remark = stock.remark  || undefined;

        await oldItem.save();
        
        res.status(201).json({
            success: true,
            message: "Stock Updated ✅",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
