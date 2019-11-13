export function capitalize(text, lowercaseRest = true, allwords, filter) {
  let res = text;

  let first = true;
  const words = res.split(' ').map(
    word => {
      if (allwords || first) {
        first = false;
        if (!filter || filter(word)) {
          if (lowercaseRest) {
            word = word.toLowerCase();
          }
          return word.charAt(0).toUpperCase() + word.slice(1)
        } else {
          return word;
        }
      } else {
        return word;
      }
    }
  );

  return words.join(' ');
}