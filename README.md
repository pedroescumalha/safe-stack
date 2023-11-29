# Safe Stack

Safe Stack is a TypeScript library providing a type-safe implementation of a stack data structure. It ensures compile-time safety, preventing common errors associated with incorrect stack usage.

## Installation

Install the library via npm:

```bash
npm install safe-stack
```

## Usage

### Import the library

```typescript
import { createStack } from 'safe-stack';
```

### Create a new stack

```typescript
// Create a stack of numbers
const numberStack = createStack<number>();

// Create a stack of strings
const stringStack = createStack<string>();
```

### Options

```typescript
// Create a stack of numbers
const numberStack = createStack<number>((options) => {
    options.capacity = 50;
    options.initialValues = [1, 2];
});
```

When creating a stack, there's two options that can be set:
- `capacity`: The maximum value of elements the stack can hold. A `TypeError` will be thrown if this value is not a whole positive integer. The default value is `Number.MAX_VALUE`;
- `initialValues`: Initialize a new stack with a copy of the values specified in this field. The default value is `[]`.

### Available operations

```typescript
// Push elements onto the stack
numberStack.push(42);
numberStack.push(10);

// Pop elements from the stack
const poppedElement = numberStack.pop();
console.log(poppedElement); // Output: 10

// Check stack size
const size = numberStack.length;
console.log(size); // Output: 1

// Peek the next element
const peekedElement = numberStack.peek();
console.log(peekedElement) // Output: 42 

// Check if a certain element is present in the stack
const isElementPresentInTheStack = numberStack.includes(25);
console.log(isElementPresentInTheStack) // Output: false 

// Clear the stack
numberStack.clear();
```

## Contributing

We welcome contributions! To contribute to Safe Stack, follow these steps:

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/safe-stack.git`
3. Create a new branch: `git checkout -b your-feature`
4. Make your changes and commit them: `git commit -m 'Add your feature'`
5. Push to the branch: `git push origin your-feature`
6. Submit a pull request

Please ensure that your code adheres to the existing coding standards and includes tests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
