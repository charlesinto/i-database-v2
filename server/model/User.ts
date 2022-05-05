import "dotenv/config";
import { model, Schema } from "mongoose";
import Password from "../services/password";
import { createHash } from "crypto";
import { Document, Model } from "mongoose";
import jwt, { Secret } from "jsonwebtoken";

export interface OTPDetails {
  otp: string;
  expiresAt: number;
}

export interface UserAttributes {
  firstName: {
    type: String;
    required: true;
  };
  lastName: {
    type: String;
    required: true;
  };
  username?: string;
  email: string;
  password?: string;
  address?: string;
  state?: string;
  phone: {
    number: string;
    code: string;
  };
}

export interface UserDoc extends Document {
  firstName: {
    type: String;
    required: true;
  };
  lastName: {
    type: String;
    required: true;
  };
  username?: string;
  email: string;
  password?: string;
  address?: string;
  state?: string;
  phone: {
    number: string;
    code: string;
  };

  createToken(): Promise<string>;
}

export interface UserMeta {
  email: string;
  username: string;
}

export interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttributes): Promise<UserDoc>;
  checkMeta({
    email,
    username,
  }: {
    email: string | any;
    username?: string | any;
  }): Promise<boolean>;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    phone: {
      number: { type: String },
      code: { type: String },
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        ret.isSetPassword = !ret.password ? false : true;
        delete ret.mono.id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPassword = await Password.hash(this.get("password"));
    this.set("password", hashPassword);
    next();
  }
});

userSchema.statics.build = (attrs: UserAttributes) => new User(attrs);

userSchema.statics.checkMeta = async ({ email, username }: UserMeta) => {
  try {
    if (await User.findOne({ $or: [{ email }, { username }] })) {
      return true;
    } else return false;
  } catch ({ message }) {
    throw new Error(`500---${message}`);
  }
};

userSchema.methods.createToken = async function (
  this: UserDoc
): Promise<string> {
  try {
    const token = jwt.sign(
      { id: this._id, username: this.username },
      process.env.JWT_KEY as Secret
    );
    return token;
  } catch ({ message }) {
    throw new Error(`500---${message}`);
  }
};

const User = model<UserDoc, UserModel>("User", userSchema);

export default User;
