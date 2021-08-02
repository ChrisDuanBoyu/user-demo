const mongoose = require("mongoose");


function connectDB(cb) {
    mongoose.connect("mongodb://localhost:27017/demo", { useNewUrlParser: true,useUnifiedTopology:true });
    const conn = mongoose.connection;
    const Schema = mongoose.Schema({
        username: String,
        password: String,
        register_time: Number,
    });
    mongoose.model("user", Schema);
    conn.on("error", () => console.error("连接数据库失败"));
    conn.once('open', () => {
        cb();
    })

}

module.exports = {
    connectDB
}