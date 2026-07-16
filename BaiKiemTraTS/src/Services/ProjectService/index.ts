import { Project } from "../../Models/Project";
import { EmployeeService } from "../EmployeeService";

export class ProjectService {
    private projects: Project[] = [];
    constructor(private employeeService: EmployeeService) {}
    create(project: Omit<Project, "id">): Project {
        const newProject = new Project(project.customerId, project.employeeId);
        this.projects.push(newProject);

        const employee = this.employeeService.findById(project.employeeId);
        if (employee) employee.receiveNoti("Bạn vừa nhận được dự án mới");
        return newProject;
    }

    updateById(id: string, data: Partial<Project>): Project | null {
        const project = this.projects.find((project) => project.id === id);
        if (!project) return null;
        if (data.customerId !== undefined) {
            project.customerId = data.customerId;
        }
        if (data.employeeId !== undefined) {
            const employee = this.employeeService.findById(data.employeeId);
            if (employee)
                employee.receiveNoti(
                    "Bạn đã được chuyển giao phụ trách dự án này.",
                );

            project.employeeId = data.employeeId;
        }

        return project;
    }
}
