import { describe, it } from "node:test";
import { createStack } from "./safeStack";
import assert from "node:assert";

describe(createStack.name, () => {
    const initialArray = [1, 2];

    describe("capacity", () => {
        it("throws if value is negative", () => {
            assert.throws(() => {
                createStack<number>((o) => {
                    o.capacity = -2;
                });
            });
        });

        it("throws if value is not whole", () => {
            assert.throws(() => {
                createStack<number>((o) => {
                    o.capacity = 3.5;
                });
            });
        });
    });

    describe("peek", () => {
        it("returns last inserted value in the stack without removing it", () => {
            const stack = createStack<number>((o) => {
                o.initialValues = initialArray;
            });

            const res = stack.peek();
            const pop = stack.pop();

            assert.equal(res, initialArray[initialArray.length - 1]);
            assert.equal(pop, initialArray[initialArray.length - 1]);
        });

        it("returns undefined if stack is empty", () => {
            const stack = createStack<number>();

            const res = stack.peek();

            assert.equal(res, undefined);
        });
    });

    describe("push", () => {
        it("pushes  value correctly", () => {
            const stack = createStack<number>();

            stack.push(1);
            stack.push(2);

            assert.equal(stack.length, 2);
            assert.equal(stack.peek(), 2);
        });

        it("throws if capacity has been reached", () => {
            const stack = createStack<number>((o) => {
                o.capacity = 1;
            });

            stack.push(1);

            assert.throws(() => {
                stack.push(1);
            });
        });
    });

    describe("includes", () => {
        it("returns true if the value exists in the stack", () => {
            const stack = createStack<number>((o) => {
                o.initialValues = initialArray;
            });

            const res = stack.includes(initialArray[0]!);

            assert.equal(res, true);
        });

        it("returns false if the value does not exist in the stack", () => {
            const stack = createStack<number>((o) => {
                o.initialValues = initialArray;
            });

            const res = stack.includes(47);

            assert.equal(res, false);
        });
    });

    describe("pop", () => {
        it("pops the last value correctly", () => {
            const stack = createStack<number>((o) => {
                o.initialValues = initialArray;
            });

            const res = stack.pop();

            assert.equal(res, initialArray[initialArray.length - 1]);
        });

        it("returns undefined if the stack is empty", () => {
            const stack = createStack<number>();

            const res = stack.pop();

            assert.equal(res, undefined);
        });
    });

    describe("clear", () => {
        it("clears the array correctly", () => {
            const stack = createStack<number>((o) => {
                o.initialValues = initialArray;
            });

            stack.clear();

            assert.equal(stack.peek(), undefined);
            assert.deepEqual(stack.toArray(), []);
        });

        it("doesnt throw if the array is empty", () => {
            const stack = createStack<number>();

            assert.doesNotThrow(() => {
                stack.clear();
            });
        });
    });

    describe("toArray", () => {
        it("converts stack to new array", () => {
            const stack = createStack<number>((o) => {
                o.initialValues = initialArray;
            });

            const array = stack.toArray();

            assert.deepEqual(array, initialArray);
            assert.notEqual(array, initialArray);
        });

        it("works with empty array", () => {
            const stack = createStack<number>();
            const array = stack.toArray();

            assert.deepEqual(array, []);
        });
    });
    
    describe("length", () => {
        it ("returns the length correctly for filled stack", () => {
            const stack = createStack<number>((o) => {
                o.initialValues = initialArray;
            });

            assert.equal(stack.length, initialArray.length);
        });

        it ("returns the length correctly for empty stack", () => {
            const stack = createStack<number>();
            assert.equal(stack.length, 0);
        });
    });
});
