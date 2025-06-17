import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  author: text("author"),
  config: jsonb("config").notNull(),
  createdAt: text("created_at").notNull(),
});

export const projectConfigSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  author: z.string().optional(),
  cssFramework: z.enum(['none', 'bulma', 'pico']).default('none'),
  structure: z.object({
    header: z.boolean().default(true),
    nav: z.boolean().default(true),
    main: z.boolean().default(true),
    sidebar: z.boolean().default(false),
    footer: z.boolean().default(true),
  }),
  formComponents: z.object({
    textInput: z.boolean().default(false),
    emailInput: z.boolean().default(false),
    phoneInput: z.boolean().default(false),
    textarea: z.boolean().default(false),
    select: z.boolean().default(false),
    radio: z.boolean().default(false),
    checkbox: z.boolean().default(false),
    dateInput: z.boolean().default(false),
    buttons: z.boolean().default(false),
  }),
  businessComponents: z.object({
    vatCalculator: z.boolean().default(false),
    priceSimulator: z.boolean().default(false),
    filterableTable: z.boolean().default(false),
    csvExport: z.boolean().default(false),
  }),
  uiComponents: z.object({
    conditionalDisplay: z.boolean().default(false),
    jsonDisplay: z.boolean().default(false),
    searchZone: z.boolean().default(false),
    pagination: z.boolean().default(false),
    copyButton: z.boolean().default(false),
    notifications: z.boolean().default(false),
    badges: z.boolean().default(false),
    progressBar: z.boolean().default(false),
    fileUpload: z.boolean().default(false),
    counter: z.boolean().default(false),
    richEditor: z.boolean().default(false),
    modal: z.boolean().default(false),
  }),
  business: z.object({
    vat: z.boolean().default(false),
    conversions: z.boolean().default(false),
    export: z.boolean().default(false),
    localStorage: z.boolean().default(false),
  }),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type ProjectConfig = z.infer<typeof projectConfigSchema>;
