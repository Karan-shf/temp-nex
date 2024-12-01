import { DataTypes } from "sequelize";

export default {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expireTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(Date.now() + 20 * 60 * 1000) // 20 minutes from now
    }
}