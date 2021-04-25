const mongoose = require("mongoose");
const Password = require("../../common/Password");

const userSchema = new mongoose.Schema(
    {
        nickname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
            },
        },
    }
);

userSchema.pre("save", async function (done) {
    if (this.isModified("username")) {
        if (!this.get("nickname")) {
            this.set("nickname", this.username);
        }
    }

    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }
    done();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
