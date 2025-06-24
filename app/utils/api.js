/**
 * Mock API functions
 */
export const fetchArtists = async () => {
  const data = await import('../components/data/artists.json').then((module) => module.default);
  return data;
};

export const fetchCategories = async () => {
  const data = await import('../components/data/categories.json').then((module => module.default));
  return data;
};

export const fetchSubmissions = async () => {
  const data = await import('../components/data/submissions.json').then((module) => module.default);
  return data;
};

export const submitArtist = async (data) => {
  console.log('Artist submitted:', data);
  return { success: true };
};