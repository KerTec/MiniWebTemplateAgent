import { projects, type Project, type InsertProject } from "@shared/schema";

export interface IStorage {
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  listProjects(): Promise<Project[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private currentId: number;

  constructor() {
    this.projects = new Map();
    this.currentId = 1;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date().toISOString(),
    };
    this.projects.set(id, project);
    return project;
  }

  async listProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
}

export const storage = new MemStorage();
