// In your file (e.g., executionSteps.js)

const executionSteps = [
    {
      step: 1,
      heapObjects: {
        a: { id: 4327500144, type: 'int', value: '3' },
        b: { id: 4327500208, type: 'int', value: '5' }
      },
      objectChanges: ["Object 'a' (type: int) created with value 3", "Object 'b' (type: int) created with value 5"],
      stackFrames: [{ function_name: 'add_two_numbers', locals: { a: 3, b: 5 } }]
    },
    {
      step: 2,
      heapObjects: {
        result: { id: 4327500304, type: 'int', value: '8' }
      },
      objectChanges: ["Object 'result' (type: int) created with value 8"],
      stackFrames: [{ function_name: '<module>', locals: { result: 8 } }]
    }
  ];
  
  export default executionSteps;
  