import React from 'react';
import {
  CardWrapper,
  Card,
  CardImage,
  CategoryBadge,
  ConfidentialBadge,
  CardTitle,
  CardDesc,
} from './Styles';

const ProjectCard = ({ project, onClick }) => {
  return (
    <CardWrapper onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card accentcolor={project.color}>
        <CardImage src={project.img} alt={project.title} />
        <div>
          <CategoryBadge accentcolor={project.color}>{project.category}</CategoryBadge>
          {project.confidential && <ConfidentialBadge>Confidential</ConfidentialBadge>}
        </div>
        <CardTitle>{project.title}</CardTitle>
        <CardDesc>{project.description}</CardDesc>
      </Card>
    </CardWrapper>
  );
};

export default ProjectCard;
