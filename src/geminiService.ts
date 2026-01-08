import { Project } from "./types";

/**
 * LOCAL AI INSIGHT GENERATOR - Completely Offline
 * Generates project health insights without any external API calls
 */

export const getProjectHealthInsight = async (project: Project): Promise<string> => {
  // Simulate async operation with a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateLocalInsight(project));
    }, 300);
  });
};

const generateLocalInsight = (project: Project): string => {
  const budgetUtilization = (project.expenditure / project.totalBudget) * 100;
  const completedMilestones = project.milestones.filter(m => m.status === 'Completed').length;
  const totalMilestones = project.milestones.length;
  const milestoneProgress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  let insight = "";

  // Status-based insights
  if (project.status === 'Completed') {
    insight = `✓ ${project.name} has successfully concluded with ${budgetUtilization.toFixed(1)}% budget utilization. All objectives have been achieved with documented completion milestones.`;
  } else if (project.status === 'On Track') {
    if (budgetUtilization > 85) {
      insight = `${project.name} is progressing well but approaching budget constraints at ${budgetUtilization.toFixed(1)}% utilization. Monitor expenditure closely in upcoming fiscal quarter.`;
    } else {
      insight = `${project.name} is executing as planned with ${budgetUtilization.toFixed(1)}% budget utilization and ${milestoneProgress.toFixed(0)}% milestone completion. Current trajectory indicates on-schedule delivery.`;
    }
  } else if (project.status === 'At Risk') {
    insight = `⚠ ${project.name} requires immediate attention with ${budgetUtilization.toFixed(1)}% budget consumed and only ${milestoneProgress.toFixed(0)}% milestone completion. Recommend resource reallocation and timeline review.`;
  } else if (project.status === 'Delayed') {
    const remark = project.delayRemarks ? ` (Reason: ${project.delayRemarks})` : "";
    insight = `⛔ ${project.name} is experiencing delays with ${milestoneProgress.toFixed(0)}% milestone completion${remark}. Expedited action plan required to recover schedule.`;
  }

  return insight || `${project.name} is currently in ${project.status} status with ${budgetUtilization.toFixed(1)}% budget utilization.`;
};
