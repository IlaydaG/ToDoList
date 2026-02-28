export const SOFT_COLORS = [
    '#B6CCFE', '#CDB4DB', '#FFD8A8','#F8C8DC', '#A8E6CF', '#FDE68A', '#F8AFA6', '#D0A2F7', '#A0C4FF', '#99E2B4', '#FFE066',
  '#FFB4A2', '#F4978E','#E0BBE4','#81C784','#FFCC80','#EF9A9A', '#90CAF9', '#CE93D8', '#A5D6A7', '#FFF176','#FF8A65', '#80CBC4',
  '#9FA8DA','#f78798','#B3E5FC', '#FFDAB9', '#FFE4B5', '#FFCCBC', '#E6D5B8' 
];

export const getRandomSoftColor = (): string => {
    return SOFT_COLORS[Math.floor(Math.random() * SOFT_COLORS.length)];
};
