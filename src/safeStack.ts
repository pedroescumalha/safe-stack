/**
 * Stack type definition.
 */
export type TSafeStack<T> = {
    peek: () => T | undefined;
    push: (item: T) => void;
    includes: (item: T) => boolean;
    pop: () => T | undefined;
    clear: () => void;
    length: number;
    toArray: () => T[];
}

export type SafeStackOptions<T> = {
    // TODO: only positive integers type?
    capacity: number;
    initialValues: T[];
}

/**
 * Build default stack options.
 * @returns - The default options.
 */
function buildDefaultOptions<T>(): SafeStackOptions<T> {
    return {
        capacity: Number.MAX_VALUE,
        initialValues: [],
    };
}

/**
 * Safe stack implementation.
 * @throws {TypeError} if the capacity option is not a positive whole number.
 */
export class SafeStack<T> implements TSafeStack<T> {
    private readonly arr: T[];
    private readonly capacity: number;

    constructor(setOptions?: (options: SafeStackOptions<T>) => void) {
        const options = buildDefaultOptions<T>();

        if (setOptions) {
            setOptions(options);

            if (options.capacity <= 0 || options.capacity % 1 !== 0) {
                throw new TypeError(
                    "Invalid value for capacity. Capacity must be a whole number higher than 0."
                );
            }
        }

        this.arr = [...options.initialValues];
        this.capacity = options.capacity;
    }

    /**
     * Looks at the item at the top of this stack without removing it from the stack.
     * @returns The item at the top of the stack.
     */
    peek(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        return this.arr[this.arr.length - 1];
    }
    
    /**
     * Adds an item onto the top of this stack.
     * @param item - The item to be added.
     * @throws {RangeError} if the stack has reached its full capacity.
     */
    push(item: T): undefined {
        if (this.length === this.capacity) {
            throw new RangeError("Stack has reached its full capacity.");
        }

        this.arr.push(item);
    }

    /**
     * Determines if an item is in the stack.
     * @param item - the item to be located in the stack.
     * @returns - true if the item is found; otherwise false.
     */
    includes(item: T): boolean {
        return this.arr.includes(item);
    }

    /**
     * Removes the item at the top of this stack.
     * @returns the item that was removed.
     */
    pop(): T | undefined {
        return this.arr.pop();
    }

    /**
     * Clears the stack.
     */
    clear(): undefined {
        this.arr.length = 0;
    }

    /**
     * Converts the stack to an array.
     * @returns The new array.
     */
    toArray(): T[] {
        return [...this.arr];
    }

    /**
     * Returns the current length of the stack.
     * @returns The current length of the stack.
     */
    get length(): number {
        return this.arr.length;
    }
}

/**
 * Create a stack.
 * @param setOptions - function to override the default stack options.
 * @returns - the stack.
 * @throws {TypeError} if the capacity option is not a positive whole number.
 */
export function createStack<T>(setOptions?: (options: SafeStackOptions<T>) => void): SafeStack<T> {
    return new SafeStack(setOptions);
}
