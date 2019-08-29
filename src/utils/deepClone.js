'use strict';

// Method that will return the data type for any structure passed to it
function getType (data) {
    // Use the objects toString method on the data.
    // This will return something like [object String]
    // Then we use .slice to grab the last portion of it (in this case the "string" bit)
    return Object.prototype.toString.call(data).slice(8, -1);
}

// Create a method to detect whether an object contains a circular reference
function isCyclic (data) {
    
    // Create an array that will store the nodes of the array that have already been iterated over
    let seenObjects = [];

    function detect (data) {
        // If the data pass is an object
        if (data && getType(data) === "Object") {
            
            // If the data is already in the seen nodes array then we know there is a circular reference
            // Therefore return true
            if (seenObjects.indexOf(data) !== -1) {
                return true;
            }

            // Add the data to the seen objects array
            seenObjects.push(data);

            // Begin iterating through the data passed to the method
            for (let key in data) {
                // Recall this method with the objects key
                if (data.hasOwnProperty(key) === true && detect(data[key])) {
                    return true;
                }
            }
        }
        return false;
    }

    // Return the method
    return detect(data);
}

const deepClone = function (data) {
    let cloneData = data
    // If the data is null or undefined then we return undefined
    if (data === null || data === undefined) {
        return undefined;
    }

    // Get the data type and store it
    const _type = getType(data);
    switch(_type){
        case 'Date':
            let clonedDate = new Date();
            clonedDate.setTime(data.getTime());
            cloneData = cloneDate;
            break;
        case 'Object':
            if (!isCyclic(data)) {
                // Create a new object that will store our copied data
                let copiedObject = {};
                // Iterate over the objects keys
                for (let key in data) {
                    // Clone the keys of each of the objects so that we can deeply copy and nested data structures
                    // For example if an object has a key value that is an array
                    // Add this cloned key value to the copiedObject we created earlier
                    copiedObject[key] = deepClone(data[key]);
                }
                cloneData = copiedObject;
            }
            break;
        case 'Array':
            // Create a new array that will have no references to the one we want to copy
            let copiedArray = [];
            // Iterate over the arrays elements
            for (let i = 0; i < data.length; i++) {
                // Push the arrays elements to this new array
                // First recall this method with the elements
                // This is so arrays of objects and other nested data structures get correctly cloned.
                copiedArray.push(deepClone(data[i]));
            }
            cloneData = copiedArray
            break;
    }
    return cloneData
}

// Export a new instance of the clone constructor
module.exports = deepClone;