import { DataTypes } from "sequelize"

export default {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    profilePic: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    signDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    },
    aboutUser: {
        type: DataTypes.STRING(160),
        allowNull: true,
    },
    verificationState: {
        type: DataTypes.ENUM("notVerified", "pendingVerification","verified"),
        allowNull: false,
        defaultValue: "notVerified"
    },
    isBanned: {
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}