import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { projectConfigSchema } from "@shared/schema";
import { generateProject } from "./services/templateGenerator";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate project and return ZIP
  app.post("/api/generate", async (req, res) => {
    try {
      const config = projectConfigSchema.parse(req.body);
      
      // Generate project files
      const projectFiles = await generateProject(config);
      
      // Set headers for ZIP download
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="${config.name || 'mini-tool'}.zip"`);
      
      // Send the ZIP buffer
      res.send(projectFiles);
    } catch (error: any) {
      console.error('Generation error:', error);
      res.status(400).json({ 
        error: error.message || 'Failed to generate project',
        details: error.issues || undefined
      });
    }
  });

  // Save project configuration
  app.post("/api/projects", async (req, res) => {
    try {
      const config = projectConfigSchema.parse(req.body);
      
      const project = await storage.createProject({
        name: config.name,
        description: config.description,
        author: config.author,
        config: config,
      });
      
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ 
        error: error.message || 'Failed to save project',
        details: error.issues || undefined
      });
    }
  });

  // Get projects list
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.listProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ 
        error: error.message || 'Failed to fetch projects'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
