
import React from 'react';
import careerMentoringImg from '../assets/career-mentoring-blue-gradient-concept-600nw-2494148539.webp';

const HeroImage = () => {
  return (
    <div className='flex justify-center items-center'>
      <img 
        src={careerMentoringImg} 
        alt='Career Mentoring' 
        className='w-full max-w-xl rounded-2xl shadow-2xl' 
      />
    </div>
  );
};

export default HeroImage;