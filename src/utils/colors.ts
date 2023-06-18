const colors = ['#F2F0B8', '#EFC7CF', '#BFE0ED', '#D6E8E0'];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}