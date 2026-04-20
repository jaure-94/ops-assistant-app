import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import sequelize from "../config/db.js";

class KnowledgeBase extends Model<InferAttributes<KnowledgeBase>, InferCreationAttributes<KnowledgeBase>> {
  declare id: CreationOptional<string>;
  declare pattern: string; // The keyword or phrase to match (e.g., "password reset")
  declare category: string;
  declare priority: string;
  declare suggested_response: string;
  declare usage_count: CreationOptional<number>; // Track how many times this was used
}

KnowledgeBase.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pattern: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Prevents duplicate rules
    },
    category: {
      type: DataTypes.ENUM('IT', 'HR', 'Access', 'Payroll', 'Other'),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
    },
    suggested_response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    usage_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "KnowledgeBase",
    tableName: "knowledge_base",
    underscored: true,
    timestamps: true,
  }
);

export default KnowledgeBase;