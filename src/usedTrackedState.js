import { useState, useEffect } from 'react';

export const useTrackChanges = (items, typeOfItem) => {
  const [trackedItems, setTrackedItems] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);

  useEffect(() => {
    console.log("ITEMS in useEffect", items)
    if (!items) return; // Guard clause to prevent undefined items from processing

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
          updatedTrackedItems[index] = { ...item };
          newEntries.push(...Object.keys(item).map((key) => ({ key, value: item[key] })));
        } else {
          Object.entries(item).forEach(([key, value]) => {
            if (!updatedTrackedItems[index][key] || updatedTrackedItems[index][key] !== value) {
              updatedTrackedItems[index][key] = value;
              newEntries.push({ key, value });
            }
          });

          Object.keys(updatedTrackedItems[index]).forEach((key) => {
            if (!(key in item)) {
              removedEntries.push({ key });
              setTimeout(() => {
                updatedTrackedItems = updatedTrackedItems.map((dict, idx) =>
                  idx === index ? Object.fromEntries(Object.entries(dict).filter(([k]) => k !== key)) : dict
                );
                setTrackedItems([...updatedTrackedItems]);
              }, 2000);
            }
          });
        }
      } else if (typeOfItem === 'SET') {
        if (!updatedTrackedItems[index]) {
          updatedTrackedItems[index] = new Set(item);
          item.forEach(setItem => {
            newEntries.push({ item: setItem });
          });
        } else {
          const currentSet = updatedTrackedItems[index];

          item.forEach(setItem => {
            if (!currentSet.has(setItem)) {
              currentSet.add(setItem);
              newEntries.push({ item: setItem });
            }
          });

          const itemsToRemove = [];
          currentSet.forEach(setItem => {
            if (!item.includes(setItem)) {
              itemsToRemove.push(setItem);
              removedEntries.push({ item: setItem });
            }
          });

          setTimeout(() => {
            itemsToRemove.forEach(setItem => currentSet.delete(setItem));
            setTrackedItems([...updatedTrackedItems]);
          }, 2000);
        }
      }
      else if (typeOfItem === 'TREE' ) 
      {
        // For the TREE type, we'll treat each item as a tree node
        if (!updatedTrackedItems[index]) {
          // Add new tree node if not already present
          updatedTrackedItems[index] = { ...item };
          newEntries.push(item);
        } else {
          // Update existing tree node if there are changes
          Object.entries(item).forEach(([key, value]) => {
            if (updatedTrackedItems[index][key] !== value) {
              updatedTrackedItems[index][key] = value;
              newEntries.push({ key, value });
            }
          });
  
          // Handle removed children or properties
          Object.keys(updatedTrackedItems[index]).forEach((key) => {
            if (!(key in item)) {
              removedEntries.push({ key });
              setTimeout(() => {
                updatedTrackedItems = updatedTrackedItems.map((node, idx) =>
                  idx === index ? { ...node, [key]: undefined } : node
                );
                setTrackedItems([...updatedTrackedItems]);
              }, 2000);
            }
          });
        }
      }
  
      // Add other types handling (ARRAY, DICT, SET)...
    });
    setTrackedItems([...updatedTrackedItems]);
    setNewItems(newEntries);
    setRemovedItems(removedEntries);

    const timeout = setTimeout(() => {
      setNewItems([]);
      setRemovedItems([]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [items, typeOfItem]); 

  return { trackedItems, newItems, removedItems };
};
