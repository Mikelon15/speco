export const addToJournalList = (item) => {
  console.log("adding item", item);
  return {
    type: 'add',
    item
  }
}
