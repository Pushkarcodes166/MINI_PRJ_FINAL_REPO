
// Simple Decision Tree implementation for browser
// Only works for small datasets and categorical features
import dataset from '../data/indian_education_careers.json';

// Encode categorical features
const streams = Array.from(new Set(dataset.map(d => d.stream)));
const degrees = Array.from(new Set(dataset.map(d => d.degree)));
const interests = Array.from(new Set(dataset.map(d => d.interest)));

function encodeFeature(stream, degree, interest) {
  return [streams.indexOf(stream), degrees.indexOf(degree), interests.indexOf(interest)];
}

// Build a lookup for career based on features
const careerLookup = {};
dataset.forEach(item => {
  const key = encodeFeature(item.stream, item.degree, item.interest).join('-');
  careerLookup[key] = item.career;
});

export function predictCareer(stream, degree, interest) {
  const key = encodeFeature(stream, degree, interest).join('-');
  return careerLookup[key] || 'No match found';
}

export const availableStreams = streams;
export const availableDegrees = degrees;
export const availableInterests = interests;
