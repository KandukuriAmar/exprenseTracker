import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import { sequelize } from "./db/DBConfig.js";
import Users from "./models/Admin.js";

export default async function seedSuperAdmin() {
  try {
    await sequelize.sync();

    const email = "super93@gmail.com";
    const password = "Super@9393";
    const name = "Super Admin";
    const role = "superadmin";

    if (!email || !password || !name) {
      throw new Error("Missing required environment variables");
    }

    const existing = await Users.findOne({ where: { email } });

    if (existing) {
      console.log("Superadmin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({
      name,
      email,
      password: hashedPassword,
      role,
      isActive: true,
    });

    console.log("Superadmin seeded successfully.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    throw error;
  }
}