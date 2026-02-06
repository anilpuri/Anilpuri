import AchievementCard from './Achievements'
import Certifications from './Certifications'
import Education from './Education'
import Experience from './Experience'
import Project from './Project'
import SkillCategory from './SkillCategory'
import Skills from './Skills'
const collectionComponentMap = {
  achievements: AchievementCard,
  certifications: Certifications,
  education: Education,
  skills: Skills,
  'skill-categories': SkillCategory,
  experience: Experience,
  projects: Project,
}
export default collectionComponentMap
