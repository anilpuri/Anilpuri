'use client'
import React from 'react'

import ProjectStyleOne from './ProjectStyleOne'
import ProjectStyleTwo from './ProjectStyleTwo'

const ProjectDetails = (props) => {
  if (props?.project?.style === 'style1') {
    return <ProjectStyleOne {...props} />
  } else {
    return <ProjectStyleTwo {...props} />
  }
}

export default ProjectDetails
