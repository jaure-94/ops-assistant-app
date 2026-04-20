import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import sequelize from "../config/db.js";

/**
 * Ticket Model
 * * We use InferAttributes to provide full TypeScript autocomplete 
 * throughout the rest of the application.
 */
class Ticket extends Model<InferAttributes<Ticket>, InferCreationAttributes<Ticket>> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare description: string;
  declare user: string; // The requester's email
  // declare external_timestamp: CreationOptional<Date>; // The timestamp from the JSON
  
  // Triage fields (populated later by the Triage Engine)
  declare category: CreationOptional<string>;
  declare priority: CreationOptional<string>;
  declare suggested_response: CreationOptional<string>;
  
  // Metadata
  declare status: CreationOptional<string>; // e.g., 'pending', 'completed', 'failed'
  // declare raw_json: object; // Audit trail of the original input
}

Ticket.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true, // Null until triaged
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true, // Null until triaged
    },
    suggested_response: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Ticket",
    tableName: "tickets",
    underscored: true, // Ensures created_at and updated_at in DB instead of camelCase
    timestamps: true,  // Automatically adds createdAt and updatedAt
  }
);

export default Ticket;