async function runCode() {
    const code = `
def add_two_numbers(a, b):
    return a + b

# Example usage
result = add_two_numbers(3, 5)
print(f"Sum: {result}")
`;

    const response = await fetch('http://127.0.0.1:8000/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    });
    
    const result = await response.json();
    console.log(result.execution_trace);
}

runCode()