import { useState, useEffect } from 'react';

export const useTrackChanges = (items, typeOfItem) => {
  const [trackedItems, setTrackedItems] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);

  console.log(items , "items")

  useEffect(() => {
    let updatedTrackedItems = [...trackedItems];
    const newEntries = [];
    const removedEntries = [];

    items.forEach((item, index) => {
        if (typeOfItem === 'ARRAY') {
            if (!updatedTrackedItems[index]) {
              updatedTrackedItems[index] = [...item];
              newEntries.push(...item.map((_, i) => ({ item: item[i], position: i })));
            } else {
              item.forEach((entry, entryIndex) => {
                if (updatedTrackedItems[index][entryIndex] !== entry) {
                  updatedTrackedItems[index].splice(entryIndex, 0, entry);
                  newEntries.push({ item: entry, position: entryIndex });
                }
              });
    
              const removedForDelay = [];
              updatedTrackedItems[index].forEach((trackedEntry, trackedEntryIndex) => {
                const isStillPresent = item.includes(trackedEntry);
                if (!isStillPresent || trackedEntry !== item[trackedEntryIndex]) {
                  removedEntries.push({ item: trackedEntry, position: trackedEntryIndex });
                  removedForDelay.push(trackedEntryIndex);
                }
              });
    
              // Filter out items only after the animation duration
              if (removedForDelay.length > 0) {
                setTimeout(() => {
                  updatedTrackedItems = updatedTrackedItems.map((lst, idx) =>
                    idx === index ? lst.filter((_, i) => !removedForDelay.includes(i)) : lst
                  );
                  setTrackedItems([...updatedTrackedItems]);
                }, 2000); // Match animation duration
              }
            }
          } else if (typeOfItem === 'DICT') {
        if (!updatedTrackedItems[index]) {
          updatedTrackedItems[index] = { ...item }; // Copy the new dictionary
          newEntries.push(...Object.keys(item).map((key) => ({ key, value: item[key] }))); // Track new key-value pairs
        } else {
          Object.entries(item).forEach(([key, value]) => {
            if (!updatedTrackedItems[index][key] || updatedTrackedItems[index][key] !== value) {
              updatedTrackedItems[index][key] = value;
              newEntries.push({ key, value }); // Track new key-value pairs
            }
          });

          // Check for removed keys in the dictionary
          Object.keys(updatedTrackedItems[index]).forEach((key) => {
            if (!(key in item)) {
              removedEntries.push({ key });
              setTimeout(() => {
                updatedTrackedItems = updatedTrackedItems.map((dict, idx) =>
                  idx === index ? Object.fromEntries(Object.entries(dict).filter(([k]) => k !== key)) : dict
                );
                setTrackedItems([...updatedTrackedItems]);
              }, 2000); // Delay for animation
            }
          });
        }
      }
    });

    setTrackedItems([...updatedTrackedItems]);
    setNewItems(newEntries);
    setRemovedItems(removedEntries);

    const timeout = setTimeout(() => {
      setNewItems([]);
      setRemovedItems([]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [items, typeOfItem]); // Include typeOfItem as a dependency

  return { trackedItems, newItems, removedItems };
};
