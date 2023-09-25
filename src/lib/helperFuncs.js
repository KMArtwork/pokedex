export const capitalizeString = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

export const removeHyphens = (word) => {
  return word.replace('-', ' ')
}